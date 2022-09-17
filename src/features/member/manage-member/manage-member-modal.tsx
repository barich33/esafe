import { Form, Modal, notification } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { memberEndPoint } from "../../../api/primecareApi.endpoint";
import CountryCodes from "../../../components/resources/country-codes";
import { httpService } from "../../../service/http.service";
import { prepareDateUsingLocalFormat,  format } from "../../patient/manage-patient/date-service";
import MemberManageForm from "./manage-member-form";
import "./manage-member.css";
import ManageMemberForm from "./manage-member-form";
const ManageMemberModal = ({ modalConfig, isModalVisible, onOk, onCancel }) => {
  console.log(modalConfig);
  const [form] = Form.useForm();
  const isEditMode = "organizationId" in modalConfig.data;
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [memberToSave, setMemberToSave] = useState(null);
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
        name: modalConfig.data?.name,
        code: modalConfig.data?.code,
        regionId: modalConfig.data?.regionId,
        email: modalConfig.data?.email,
         phone: { countryCode: country?.code, phoneNumber },
         zone: modalConfig.data?.zone,
         woreda: modalConfig.data?.woreda,
         town: modalConfig.data?.town,
         isMember: modalConfig.data?.isMember||false,
      };
      
      form.setFieldsValue(formData);
      setInitialFormData(formData);
    } else {      
      // default phone country to Ethiopia
      form.setFieldsValue({phone: { countryCode: 'ET'}});      
    }
  }
  ,[modalConfig])

  useEffect(() => {
    if (!memberToSave) {
      return;
    }
    createOrUpdateMember();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  }, [memberToSave]);

  const handleModalOk =()=>{
    form
    .validateFields()
    .then(values => {
      const dialCode = CountryCodes.find(f => f.code === values.phone.countryCode)?.dial_code;
      const user = {
        ...values,
        name: values.name,
        regionId: values.regionId,
        email: values.email,
        code:values.code,
        isMember:values.isMember,
        phoneNumber:
        (!dialCode || !values.phone.phoneNumber) ? null :
        `${dialCode}-${values.phone.phoneNumber}`,
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
  const prepareFormDataForUpdate = (member) => {
    member.organizationId = modalConfig.data?.organizationId;
  };

  const handleModalCancel = () => {
    if (!isFormSaving) {
      setIsFormSaving(false);
      form.resetFields();
      onCancel();
    }
  };
  const createOrUpdateMember = () => {
    setIsFormSaving(true);
    const url = { add: "addMember", update: "updateMember" };

    httpService
      .post(memberEndPoint[isEditMode ? url.update : url.add], memberToSave)
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
      width={450}
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
        <ManageMemberForm
          form={form}
          isEditMode={isEditMode}
          modalConfig={modalConfig}
        />
      </div>
    </Modal>
  );
};

export default ManageMemberModal;
