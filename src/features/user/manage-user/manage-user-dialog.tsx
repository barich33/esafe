import { Form, Modal, notification } from "antd"
import React,{ useEffect, useState } from "react";
import { userEndPoint } from "../../../api/primecareApi.endpoint";
import CountryCodes from "../../../components/resources/country-codes";
import { httpService } from "../../../service/http.service";
import UserManageForm from "./manage-user-form";

const  ManageUserDialog =({modalConfig,isModalVisible,onOk,onCancel})=>{
       console.log(modalConfig);
  const [form] =Form.useForm()
  const isEditMode  ='userId' in modalConfig.data;  
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [userToSave, setUserToSave] = useState(null);
  const [initialFormData, setInitialFormData] = useState({});    
  useEffect(()=>{   
    if (isEditMode) {   
      
      const phoneNumber$ = modalConfig.data?.phoneNumber;

      const country = CountryCodes.find((c) =>
        phoneNumber$?.startsWith(c.dial_code)
      );
      const phoneNumber = phoneNumber$
        ?.substring(phoneNumber$.indexOf(country?.dial_code) + country?.dial_code?.length)
        ?.replace('-', '');

      const formData = {
        firstName: modalConfig.data?.firstName,
        lastName: modalConfig.data?.lastName,
        userName: modalConfig.data?.userName,
        email: modalConfig.data?.email,
       phone: { countryCode: country?.code, phoneNumber },
      };
      
      form.setFieldsValue(formData);
      setInitialFormData(formData);
    } else {      
      // default phone country to Ethiopia
      form.setFieldsValue({phone: { countryCode: 'ET'}});      
    }
  }
  ,[modalConfig])

  useEffect(()=>{
    if (!userToSave) {
      return;
    }
    createOrUpdateUser();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  },[userToSave])

  const handleModalOk =()=>{
    form
    .validateFields()
    .then(values => {
      const dialCode = CountryCodes.find(f => f.code === values.phone.countryCode)?.dial_code;
      const user = {
        ...values,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        userName:values.userName,
        phoneNumber:
        (!dialCode || !values.phone.phoneNumber) ? null :
        `${dialCode}-${values.phone.phoneNumber}`,
      };
      if (isEditMode) {
        prepareFormDataForUpdate(user);
      }
      setUserToSave(user);

    })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .catch(() => {
    });
  }
  
  const prepareFormDataForUpdate = (user) => {
    user.userId = modalConfig.data?.userId;
  };

  const handleModalCancel = () => {
    if (!isFormSaving) {
      setIsFormSaving(false);
      form.resetFields();
      onCancel();
    }
  };  
  const createOrUpdateUser =()=>{
  
    setIsFormSaving(true);
    const url = { add: 'addUser', update: 'updateUser' };
    
    httpService
    .post((userEndPoint[isEditMode ? url.update: url.add]), userToSave) 
   .then(response=>{
    if(response.status===200 && response.data.success){
      showSuccess();
      onOk(response)
    }
    else{
      showError(response.data.message);
    }
   })
   .catch(() => showError());
  }
  
  const showSuccess = () => {
    setIsFormSaving(false);
    form.resetFields();
    notification.success({
      message: `${isEditMode ? 'Update' : 'Add'} User`,
      description: `User ${isEditMode ? 'Updated' : 'Added'} Successfully.`,
    });
  };

  const showError = (message = null) => {
    console.log(message);
    setIsFormSaving(false);
    notification.error({
      message: `${isEditMode ? 'Update' : 'Add'} User`,
      description: message ? message : `unable to ${isEditMode ? 'update' : 'add'} User`,
    });
  };

  return <Modal
  width={600}
  title={modalConfig.title}
  visible={isModalVisible}
  onOk={handleModalOk}
  onCancel={handleModalCancel}
  closable={false}
  maskClosable={false}
  okText={'Save'}
  confirmLoading={isFormSaving}
  destroyOnClose={true}
  >
    <div>
      <UserManageForm
       form={form}
       isEditMode={isEditMode}
       modalConfig={modalConfig}
      />
    </div>
  </Modal>
}

export default ManageUserDialog