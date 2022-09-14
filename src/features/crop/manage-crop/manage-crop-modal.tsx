import { Form, Modal, notification } from "antd"
import moment from "moment";
import React,{ useEffect, useState } from "react";
import { cropEndPoint } from "../../../api/primecareApi.endpoint";
import CountryCodes from "../../../components/resources/country-codes";
import { httpService } from "../../../service/http.service";
import { prepareDateUsingLocalFormat } from "../../patient/manage-patient/date-service";
import CropManageForm from "./manage-crop-form";
import './manage-crop.css'
const  ManageCropModal =({modalConfig,isModalVisible,onOk,onCancel})=>{
       console.log(modalConfig);
  const [form] =Form.useForm()
  const isEditMode  ='cropId' in modalConfig.data;  
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [cropToSave, setCropToSave] = useState(null);
  const [initialFormData, setInitialFormData] = useState({});    
  const [birthDate,setbirthDate] = useState(null)
  useEffect(()=>{   
    if (isEditMode) {   
      
    
      const formData = {
        ...modalConfig,
        cropTypeId: modalConfig.data?.cropTypeId, 
        diseases:modalConfig.data?.cropReactiontoDiseases,
        insects:modalConfig.data?.cropReactiontoInsects,
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
    if (!cropToSave) {
      return;
    }
    createOrUpdateCrop();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  },[cropToSave])

  const handleModalOk =()=>{
    form
    .validateFields()
    .then(values => {
    
      const crop = {
        ...values,      
        releaseYear:prepareDateUsingLocalFormat(values?.releaseYear?._d,true).toString(),
        diseases: values.diseases,
        cropReactiontoDiseases: values.diseases.map(m => {
          return { diseaseId: m.diseaseId, value: m.value };
        }),
        insects: values.insects,
        cropReactiontoInsects: values.insects.map(m => {
          return { insectId: m.insectId, value: m.value };
        }),

       /*  
        "cropReactiontoDiseases": [],
        "cropSourceOfBasicSeeds": [],
        "cropSourceOfBreederSeeds": [],
        "cropSourceOfPreBasicSeeds": [] */
       // subcityId:values.subcityId
      };
      if (isEditMode) {
        prepareFormDataForUpdate(crop);
      }
      setCropToSave(crop);

    })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .catch(() => {
    });
  }
  
  const prepareFormDataForUpdate = (crop) => {
    crop.cropId = modalConfig.data?.cropId;
  };

  const handleModalCancel = () => {
    if (!isFormSaving) {
      setIsFormSaving(false);
      form.resetFields();
      onCancel();
    }
  };  
  const createOrUpdateCrop =()=>{
  
    setIsFormSaving(true);
    const url = { add: 'addCrop', update: 'updateCrop' };
    
    httpService
    .post((cropEndPoint[isEditMode ? url.update: url.add]), cropToSave) 
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
      message: `${isEditMode ? 'Update' : 'Add'} Crop`,
      description: `Crop ${isEditMode ? 'Updated' : 'Added'} Successfully.`,
    });
  };

  const showError = (message = null) => {
    setIsFormSaving(false);
    notification.error({
      message: `${isEditMode ? 'Update' : 'Add'} Crop`,
      description: message ? message : `unable to ${isEditMode ? 'update' : 'add'} Crop`,
    });
  };

  return <Modal
  width={1000}
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
      <CropManageForm
       form={form}
       isEditMode={isEditMode}
       modalConfig={modalConfig}
      />
    </div>
  </Modal>
}

export default ManageCropModal