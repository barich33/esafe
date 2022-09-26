import { Modal,Form, notification } from 'antd';
import React, { useEffect, useState } from 'react'
import { memberEndPoint } from '../../../api/primecareApi.endpoint';
import { httpService } from '../../../service/http.service';
import ManageSeedBusinessForm from './manage-seed-business-form';

const ManageSeedBusinessModal= ({ modalConfig, isModalVisible, onOk, onCancel }) => {
 
  const [form] = Form.useForm();
  const isEditMode = "seedBusinessId" in modalConfig.data;
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [seedBusinessToSave, setSeedBusinessToSave] = useState(null);
  const [initialFormData, setInitialFormData] = useState({});  

  const handleModalCancel = () => {
    if (!isFormSaving) {
      setIsFormSaving(false);
      form.resetFields();
      onCancel();
    }
  };
 
  return (
    <Modal
      width={800}
      title={modalConfig.title}
      visible={isModalVisible}
     /*  onOk={handleModalOk} */
      onCancel={handleModalCancel}
      closable={false}
      maskClosable={false}
      //okText={"Save"}
      okButtonProps={{ style: { display: 'none' } }}
      confirmLoading={isFormSaving}
      destroyOnClose={true}
    >
      <div>
        <ManageSeedBusinessForm
          seedbusiness={modalConfig}
        /*   isEditMode={isEditMode} */
        />
      </div>
    </Modal>
  );
};

export default ManageSeedBusinessModal