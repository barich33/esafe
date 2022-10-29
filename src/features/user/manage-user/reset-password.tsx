import { Icon } from '@iconify/react';
import { Button, Form, Input, Modal, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { userEndPoint } from '../../../api/primecareApi.endpoint';
import { httpService } from '../../../service/http.service';
import ResetPasswordForm from './reset-password-form';

const ManageResetPasswordDialog=({modalConfig,isModalVisible,onOk,onCancel})=>{
  console.log("modalConfig",modalConfig);
  const [form] =Form.useForm()
  const isEditMode  ='userId' in modalConfig.data;  
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [userToSave, setUserToSave] = useState(null);
  const [initialFormData, setInitialFormData] = useState({});    


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
        password:values?.password        
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
    const url = { resetPassword: 'changePassword'};
    
    httpService
    .post((userEndPoint[url.resetPassword]), userToSave) 
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
      message: `Reset Password`,
      description: `User Password Reset Successfully.`,
    });
  };

  const showError = (message = null) => {
    console.log(message);
    setIsFormSaving(false);
    notification.error({
      message: `Reset Password`,
      description: message ? message : `unable to Reset User Password`,
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
        <ResetPasswordForm
         form={form}
         isEditMode={isEditMode}
         modalConfig={modalConfig}
        />
      </div>
    </Modal>
  }

export default ManageResetPasswordDialog