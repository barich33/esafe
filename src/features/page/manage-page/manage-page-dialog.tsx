import { Form, Modal, notification } from "antd"
import React,{ useEffect, useState } from "react";
import { pageEndPoint } from "../../../api/primecareApi.endpoint";
import CountryCodes from "../../../components/resources/country-codes";
import { httpService } from "../../../service/http.service";
import PageManageForm from "./manage-page-form";

const  ManagePageDialog =({modalConfig,isModalVisible,onOk,onCancel})=>{
       console.log(modalConfig);
  const [form] =Form.useForm()
  const isEditMode  ='pageId' in modalConfig.data;  
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [pageToSave, setPageToSave] = useState(null);
  const [initialFormData, setInitialFormData] = useState({});    
  useEffect(()=>{   
    if (isEditMode) {   
    
      const formData = {
        name: modalConfig.data?.name,
        pageContent: modalConfig.data?.pageContent,
        title: modalConfig.data?.title,
        parentId: modalConfig.data?.parentId,
      
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
    if (!pageToSave) {
      return;
    }
    createOrUpdatePage();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  },[pageToSave])

  const handleModalOk =()=>{
    form
    .validateFields()
    .then(values => {
    
      const page = {
        ...values,
        name: values.name,
        parentId: values.parentId,
        title: values.title,
        pageContent:values.pageContent,       
      };
      if (isEditMode) {
        prepareFormDataForUpdate(page);
      }
      setPageToSave(page);

    })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .catch(() => {
    });
  }
  
  const prepareFormDataForUpdate = (page) => {
    page.pageId = modalConfig.data?.pageId;
  };

  const handleModalCancel = () => {
    if (!isFormSaving) {
      setIsFormSaving(false);
      form.resetFields();
      onCancel();
    }
  };  
  const createOrUpdatePage =()=>{
  
    setIsFormSaving(true);
    const url = { add: 'addPage', update: 'updatePage' };
    
    httpService
    .post((pageEndPoint[isEditMode ? url.update: url.add]), pageToSave) 
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
      message: `${isEditMode ? 'Update' : 'Add'} Page`,
      description: `Page ${isEditMode ? 'Updated' : 'Added'} Successfully.`,
    });
  };

  const showError = (message = null) => {
    console.log(message);
    setIsFormSaving(false);
    notification.error({
      message: `${isEditMode ? 'Update' : 'Add'} Page`,
      description: message ? message : `unable to ${isEditMode ? 'update' : 'add'} Page`,
    });
  };

  return <Modal
  width={800}
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
      <PageManageForm
       form={form}
       isEditMode={isEditMode}
       modalConfig={modalConfig}
      />
    </div>
  </Modal>
}

export default ManagePageDialog