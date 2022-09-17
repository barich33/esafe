import { Form, Modal, notification } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { cropEndPoint } from "../../../api/primecareApi.endpoint";
import CountryCodes from "../../../components/resources/country-codes";
import { httpService } from "../../../service/http.service";
import { prepareDateUsingLocalFormat,  format } from "../../patient/manage-patient/date-service";
import CropManageForm from "./manage-crop-form";
import "./manage-crop.css";
const ManageCropModal = ({ modalConfig, isModalVisible, onOk, onCancel }) => {
  console.log(modalConfig);
  const [form] = Form.useForm();
  const isEditMode = "cropId" in modalConfig.data;
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [cropToSave, setCropToSave] = useState(null);
  const [initialFormData, setInitialFormData] = useState({});
  const [birthDate, setbirthDate] = useState(null);
  useEffect(() => {
    if (isEditMode) {
      const releaseYear= moment(moment(modalConfig.data?.releaseYear),format)
      const  diseases=modalConfig.data?.cropReactiontoDiseases;
      const insects= modalConfig.data?.cropReactionToInsects;
  
      const formData = {       
         releaseYear: releaseYear,
        cropTypeId: modalConfig.data?.cropTypeId,
        varietyId: modalConfig.data?.varietyId,
        adtSuitableToSoleCropping: modalConfig.data?.adtSuitableToSoleCropping,
        adtSuitableToInterCropping:modalConfig.data?.adtSuitableToInterCropping,
        adtSuitableToIrrigation: modalConfig.data?.adtSuitableToIrrigation,
        adtAltitude: modalConfig.data?.adtAltitude,
        adtRainfall: modalConfig.data?.adtRainfall,
        highlandId: modalConfig.data?.highlandId,
        adtMoistureStressArea: modalConfig.data?.adtMoistureStressArea,
        srBroadcast: modalConfig.data?.srBroadcast,
        srDrill: modalConfig.data?.srDrill,
        srRow: modalConfig.data?.srRow,
        agrFertilizerNitrogenOrUrea:
          modalConfig.data?.agrFertilizerNitrogenOrUrea,
        agrFertilizerP2o5: modalConfig.data?.agrFertilizerP2o5,
        agrFertilizerNps: modalConfig.data?.agrFertilizerNps,
        agrFertilizerSulfer: modalConfig.data?.agrFertilizerSulfer,
        agrFertilizerCopper: modalConfig.data?.agrFertilizerCopper,

        agrPlantingDateRangeOfMonth:modalConfig?.data?.agrPlantingDateRangeOfMonth,
        agrSpacingBetweenRow:modalConfig?.data?.agrSpacingBetweenRow,
        agrSpcingBetweenPlant:modalConfig?.data?.agrSpcingBetweenPlant,

        mrphoPlantHeight: modalConfig.data?.mrphoPlantHeight,
        mrphoStemPigmentation: modalConfig.data?.mrphoStemPigmentation,
        mrphoDaystoHeading: modalConfig.data?.mrphoDaystoHeading,
        mrphoDaystoMaturity: modalConfig.data?.mrphoDaystoMaturity,
        mrphoPanicleLength: modalConfig.data?.mrphoPanicleLength,
        mrphoSpikeLength: modalConfig.data?.mrphoSpikeLength,
        mrphoEarOrCobLength: modalConfig.data?.mrphoEarOrCobLength,
        growthHabitId: modalConfig.data?.growthHabitId,
        panicleFormId: modalConfig.data?.panicleFormId,
        maturityGroupId: modalConfig.data?.maturityGroupId,
        flowerColor: modalConfig.data?.flowerColor,
        seedColor: modalConfig.data?.seedColor,
        seedCoatColor: modalConfig.data?.seedCoatColor,
        yieldGrain: modalConfig.data?.yieldGrain,
        yieldMarketableTuber: modalConfig.data?.yieldMarketableTuber,
        yieldForage: modalConfig.data?.yieldForage,
        yieldFodder: modalConfig.data?.yieldFodder,
        qualityOilcontent: modalConfig.data?.qualityOilcontent,
        qualityProteinContent: modalConfig.data?.qualityProteinContent,
        qualityGlutienContent: modalConfig.data?.qualityGlutienContent,
        qualityExtract: modalConfig.data?.qualityExtract,
        qualityHlw: modalConfig.data?.qualityHlw,
        qualityGrainSeedSize: modalConfig.data?.qualityGrainSeedSize,
        qualityThousandSeedWeight: modalConfig.data?.qualityThousandSeedWeight,
        qualitySokability: modalConfig.data?.qualitySokability,
        soilTypeId: modalConfig.data?.soilTypeId,
        rowTypeId: modalConfig.data?.rowTypeId, 
        sourceOfBasicSeedIds: modalConfig.data?.cropSourceOfBasicSeeds?.map((c) => c.organizationId),
        sourceOfBreederSeedIds: modalConfig.data?.cropSourceOfBreederSeeds?.map((c) => c.organizationId),
        sourceOfPreBasicSeedIds: modalConfig.data?.cropSourceOfPreBasicSeeds?.map((c) => c.organizationId),
      };

     if(diseases?.length>0){
      formData['diseases']=diseases
     }
  if(insects?.length>0){
   formData['insects']=insects;
  }
      form.setFieldsValue(formData);
      setInitialFormData(formData);
    } else {
      // default
    }
  }, [modalConfig]);

  useEffect(() => {
    if (!cropToSave) {
      return;
    }
    createOrUpdateCrop();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  }, [cropToSave]);

  const handleModalOk = () => {
        form
      .validateFields()
      .then((values) => {
        
        const crop = {
          ...values,
          releaseYear: prepareDateUsingLocalFormat(
            values?.releaseYear?._d,
            true
          ).toString(),
          diseases: values.diseases,
          cropReactiontoDiseases: values.diseases?.map((m) => {
            return { diseaseId: m.diseaseId, value: m.value };
          }),
          insects: values.insects,
          cropReactiontoInsects: values.insects?.map((m) => {
            return { insectId: m.insectId, value: m.value };
          }),     
        };
        if (isEditMode) {
          prepareFormDataForUpdate(crop);
        }
        setCropToSave(crop);
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch((error) => {console.log(error)});
  };

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
  const createOrUpdateCrop = () => {
    setIsFormSaving(true);
    const url = { add: "addCrop", update: "updateCrop" };

    httpService
      .post(cropEndPoint[isEditMode ? url.update : url.add], cropToSave)
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
      message: `${isEditMode ? "Update" : "Add"} Crop`,
      description: `Crop ${isEditMode ? "Updated" : "Added"} Successfully.`,
    });
  };

  const showError = (message = null) => {
    setIsFormSaving(false);
    notification.error({
      message: `${isEditMode ? "Update" : "Add"} Crop`,
      description: message
        ? message
        : `unable to ${isEditMode ? "update" : "add"} Crop`,
    });
  };

  return (
    <Modal
      width={1000}
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
        <CropManageForm
          form={form}
          isEditMode={isEditMode}
          modalConfig={modalConfig}
        />
      </div>
    </Modal>
  );
};

export default ManageCropModal;
