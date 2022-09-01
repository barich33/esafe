import { Form, Modal, notification } from "antd"
import moment from "moment";
import React,{ useEffect, useState } from "react";
import { patientEndPoint } from "../../../api/primecareApi.endpoint";
import CountryCodes from "../../../components/resources/country-codes";
import { httpService } from "../../../service/http.service";
import PatientManageForm from "./manage-patient-form";
import {
  format,
  prepareDateUsingLocalFormat
} from './date-service';
const  ManagePatientDialog =({modalConfig,isModalVisible,onOk,onCancel})=>{
       console.log(modalConfig);
  const [form] =Form.useForm()
  const isEditMode  ='patientId' in modalConfig.data;  
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [patientToSave, setPatientToSave] = useState(null);
  const [initialFormData, setInitialFormData] = useState({});    
  const [birthDate,setbirthDate] = useState(null)
  useEffect(()=>{   
    if (isEditMode) {   
      
      const mobilePhone$ = modalConfig.data?.mobilePhone;

      const country = CountryCodes.find((c) =>
        mobilePhone$?.startsWith(c.dial_code)
      );
      const mobilePhone = mobilePhone$
        ?.substring(mobilePhone$.indexOf(country?.dial_code) + country?.dial_code?.length)
        ?.replace('-', '');

        const birthDate = moment(moment(modalConfig.data?.birthDate),format);
  
      const formData = {
        firstName: modalConfig.data?.firstName,
        lastName: modalConfig.data?.lastName,
        middleName: modalConfig.data?.middleName,
        email: modalConfig.data?.email,
        phone: { countryCode: country?.code, mobilePhone },
        sex:modalConfig.data?.sex,
        birthDate:birthDate,
        regionId:modalConfig.data?.region.regionId,
        subCityId:modalConfig.data?.subcity.subCityId,
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
    if (!patientToSave) {
      return;
    }
    createOrUpdatePatient();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  },[patientToSave])

  const handleModalOk =()=>{
    form
    .validateFields()
    .then(values => {
      const dialCode = CountryCodes.find(f => f.code === values.phone.countryCode)?.dial_code;
      const patient = {
        ...values,
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        email: values.email,
        mobilePhone:
        (!dialCode || !values.phone.mobilePhone) ? null :
        `${dialCode}-${values.phone.mobilePhone}`,
        sex:values.sex,
        regionId:values.regionId,
        subCityId:values.subCityId
      };
      if (isEditMode) {
        prepareFormDataForUpdate(patient);
      }
      setPatientToSave(patient);

    })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .catch(() => {
    });
  }
  
  const prepareFormDataForUpdate = (patient) => {
    patient.patientId = modalConfig.data?.patientId;
  };

  const handleModalCancel = () => {
    if (!isFormSaving) {
      setIsFormSaving(false);
      form.resetFields();
      onCancel();
    }
  };  
  const createOrUpdatePatient =()=>{
  
    setIsFormSaving(true);
    const url = { add: 'addPatient', update: 'updatePatient' };
    
    httpService
    .post((patientEndPoint[isEditMode ? url.update: url.add]), patientToSave) 
   .then(response=>{
    if(response.status===200){
      showSuccess();
      onOk(response)
    }
    else{
      showError(response.data);
    }
   })
   .catch(() => showError());
  }
  
  const showSuccess = () => {
    setIsFormSaving(false);
    form.resetFields();
    notification.success({
      message: `${isEditMode ? 'Update' : 'Add'} Patient`,
      description: `Patient ${isEditMode ? 'Updated' : 'Added'} Successfully.`,
    });
  };

  const showError = (message = null) => {
    setIsFormSaving(false);
    notification.error({
      message: `${isEditMode ? 'Update' : 'Add'} Patient`,
      description: message ? message : `unable to ${isEditMode ? 'update' : 'add'} Patient`,
    });
  };

  return <Modal
  width={900}
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
      <PatientManageForm
       form={form}
       isEditMode={isEditMode}
       modalConfig={modalConfig}
      />
    </div>
  </Modal>
}

export default ManagePatientDialog