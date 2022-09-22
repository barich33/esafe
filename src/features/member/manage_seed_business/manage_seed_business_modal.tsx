import { Modal,Form, notification } from 'antd';
import React, { useEffect, useState } from 'react'
import { memberEndPoint } from '../../../api/primecareApi.endpoint';
import { httpService } from '../../../service/http.service';
import ManageSeedBusinessForm from './manage-seed-business-form';

const ManageSeedBusinessModal= ({ modalConfig, isModalVisible, onOk, onCancel }) => {
  console.log(modalConfig);
  const [form] = Form.useForm();
  const isEditMode = "seedBusinessId" in modalConfig.data;
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [seedBusinessToSave, setSeedBusinessToSave] = useState(null);
  const [initialFormData, setInitialFormData] = useState({});
  
  useEffect(()=>{ 
 
      const formData = {
        name: modalConfig.data?.name,
        organizationId: modalConfig.data?.organizationId,
        cropTypeId: modalConfig.data?.cropTypeId,
        typesOfSeedBusinessId: modalConfig.data?.typesOfSeedBusinessId, 
      };
      
      form.setFieldsValue(formData);
      setInitialFormData(formData);
    
  }
  ,[modalConfig])

  useEffect(() => {
    if (!seedBusinessToSave) {
      return;
    }
    createOrUpdateSeedBusinessToSave();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  }, [seedBusinessToSave]);
  const handleModalCancel = () => {
    if (!isFormSaving) {
      setIsFormSaving(false);
      form.resetFields();
      onCancel();
    }
  };
    const handleModalOk =()=>{
      debugger
    form
    .validateFields()
    .then(values => {
       const user = {
        ...values,
        organizationId: values.organizationId,
        cropTypeId: values.cropTypeId,
        typesOfSeedBusinessId: values.typesOfSeedBusinessId,        
      };
      if (isEditMode) {
        prepareFormDataForUpdate(user);
      }
      setSeedBusinessToSave(user);

    })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .catch(() => {
    });
  }
  const prepareFormDataForUpdate = (seedBusiness) => {
    seedBusiness.organizationId = modalConfig.data?.organizationId;
  };
  const createOrUpdateSeedBusinessToSave = () => {
    setIsFormSaving(true);
    const url = { add: "addSeedBusiness", update: "updateSeedBusiness" };

    httpService
      .post(memberEndPoint[isEditMode ? url.update : url.add], seedBusinessToSave)
      .then((response) => {
        
        if (response.status === 200) {
          showSuccess();
          onOk(response);
        } else {
          showError(response.data);
          setIsFormSaving(false);
        }
      })
      .catch(() => showError());
  };
  const showSuccess = () => {
    setIsFormSaving(false);
    form.resetFields();
    notification.success({
      message: `${isEditMode ? "Update" : "Add"} Member`,
      description: `Member ${isEditMode ? "Updated" : "Added"} Successfully.`,
    });
  };

  const showError = (message = null) => {
    setIsFormSaving(false);
    notification.error({
      message: `${isEditMode ? "Update" : "Add"} Member`,
      description: message
        ? message
        : `unable to ${isEditMode ? "update" : "add"} Member`,
    });
  };
  return (
    <Modal
      width={800}
      title={modalConfig.title}
      visible={isModalVisible}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
      closable={false}
      maskClosable={false}
      okText={"Save"}
      confirmLoading={isFormSaving}
      destroyOnClose={true}
    >
      <div>
        <ManageSeedBusinessForm
          seedbusiness={modalConfig}
          isEditMode={isEditMode}
        />
      </div>
    </Modal>
  );
};

export default ManageSeedBusinessModal