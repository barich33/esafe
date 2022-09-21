import { Modal,Form } from 'antd';
import React, { useState } from 'react'
import ManageSeedBusinessForm from './manage-seed-business-form';

const ManageSeedBusinessModal= ({ modalConfig, isModalVisible, onOk, onCancel }) => {
  console.log(modalConfig);
  const [form] = Form.useForm();
  const isEditMode = "organizationId" in modalConfig.data;
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [memberToSave, setMemberToSave] = useState(null);
  const [initialFormData, setInitialFormData] = useState({});

  const handleModalCancel = () => {
    if (!isFormSaving) {
      setIsFormSaving(false);
      form.resetFields();
      onCancel();
    }
  };
    const handleModalOk =()=>{
    form
    .validateFields()
    .then(values => {
       const user = {
        ...values,
        name: values.name,
        regionId: values.regionId,
        email: values.email,
        code:values.code,
        isMember:values.isMember,
     
      };
      if (isEditMode) {
        prepareFormDataForUpdate(user);
      }
      setMemberToSave(user);

    })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .catch(() => {
    });
  }
  const prepareFormDataForUpdate = (seedBusiness) => {
    seedBusiness.organizationId = modalConfig.data?.organizationId;
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
          members={modalConfig}
          isEditMode={isEditMode}
        />
      </div>
    </Modal>
  );
};

export default ManageSeedBusinessModal