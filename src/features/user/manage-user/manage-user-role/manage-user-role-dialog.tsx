import { Form, Modal, notification } from "antd"
import React,{ useEffect, useState } from "react";
import { userEndPoint } from "../../../../api/primecareApi.endpoint";
import { httpService } from "../../../../service/http.service";
import UserRoleManageForm from "./manage-user-role-form";
import UserManageForm from "./manage-user-role-form";

const  ManageUserRoleDialog =({modalConfig,isModalVisible,onOk,onCancel})=>{
       console.log("modalConfig",modalConfig);
  const [form] =Form.useForm()
  const isEditMode  ='userId' in modalConfig.data;  
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [userToSave, setUserToSave] = useState(null);
  const [initialFormData, setInitialFormData] = useState({});    
  useEffect(()=>{   
    
      const formData = {
        roleIds: modalConfig.data?.userRoles?.map((c) => c.roleId),       
      };
      
      form.setFieldsValue(formData);
      setInitialFormData(formData);   
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
    
      const user = {
        ...values,          
      };
      if (isEditMode) {
        console.log(user)
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
    const url = { add: 'addUserRole', update: 'updateUserRole' };
    
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
      message: `${isEditMode ? 'Update' : 'Add'} User Role`,
      description: `User ${isEditMode ? 'Updated' : 'Added'} Successfully.`,
    });
  };

  const showError = (message = null) => {
    console.log(message);
    setIsFormSaving(false);
    notification.error({
      message: `${isEditMode ? 'Update' : 'Add'} User Role`,
      description: message ? message : `unable to ${isEditMode ? 'update' : 'add'} User Role`,
    });
  };

  return <Modal
  width={500}
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
      <UserRoleManageForm
       form={form}
       isEditMode={isEditMode}
       modalConfig={modalConfig}
      />
    </div>
  </Modal>
}

export default ManageUserRoleDialog