import { Form, Modal, notification } from "antd";
import moment from "moment";
import React, { useDebugValue, useEffect, useState } from "react";
import { memberEndPoint } from "../../../api/primecareApi.endpoint";
import CountryCodes from "../../../components/resources/country-codes";
import { httpService } from "../../../service/http.service";
import { prepareDateUsingLocalFormat,  format } from "../../patient/manage-patient/date-service";
import MemberManageForm from "./manage-member-form";
import "./manage-member.css";
import ManageMemberForm from "./manage-member-form";
import { FullscreenExitOutlined } from "@ant-design/icons";
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
        const  cropVarieties=modalConfig.data?.cropVarietyPortfolios;     
    
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
         contactPerson:modalConfig.data?.contactPerson ,
         yearOfEstablishment: modalConfig.data?.yearOfEstablishment,
         landArea: modalConfig.data?.landArea,
         volume:modalConfig.data?.volume ,
         gpsposition:modalConfig.data?.gpsposition ,
         boardMembers: modalConfig.data?.boardMembers,
         manager:modalConfig.data?.manager ,
         technicalStaff: modalConfig.data?.technicalStaff,
         administrativeStaff: modalConfig.data?.administrativeStaff,
         altitude:modalConfig.data?.altitude ,
         rainfall: modalConfig.data?.rainfall,
         temperature:modalConfig.data?.temperature,
         irrigationPotential: modalConfig.data?.irrigationPotential,
         soilTypeId: modalConfig.data?.soilTypeId,
         ph: modalConfig.data?.ph,
         majorActivity: modalConfig.data?.majorActivity,
         diversification: modalConfig.data?.diversification,
         vision: modalConfig.data?.vision,
         customerIds: modalConfig.data?.customerToOrganizations?.map((c) => c.customerId),
         supplierIds: modalConfig.data?.orgBasicSeedSupplierOrganizations?.map((c) => c.supplierId),
         cOCReferenceNo: modalConfig.data?.cocreferenceNo,
         tradeLicenseReferenceNo: modalConfig.data?.tradeLicenseReferenceNo,
         storageAvailable:modalConfig.data?.storageAvailable,
         storageCapacity:modalConfig.data?.storageCapacity,         
         landContracted:modalConfig.data?.landContracted,
         landRented:modalConfig.data?.landRented,
         landSelfOwned:modalConfig.data?.landSelfOwned,
         tractor:modalConfig.data?.tractor,
         combiner:modalConfig.data?.combiner,
         accessory:modalConfig.data?.accessory,
         farmImplementsOther:modalConfig.data?.farmImplementsOther,
         seedLab:modalConfig.data?.seedLab,
         processingPlant:modalConfig.data?.processingPlant
      };
      if(cropVarieties?.length>0){
        formData['cropVarieties']=cropVarieties
       }
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
     console.log('values',values)
      const member = {
        ...values,

        cropVarieties: values.cropVarieties,
        cropVarietyPortfolios: values.cropVarieties?.map((m) => {
              return { organizationId: m.organizationId, cropTypeId: m.cropTypeId,varietyId:m.varietyId,price:m.price,volumeOfProduction:m.volumeOfProduction,
                distributionLocation:m.distributionLocation,
                packSize:m.packSize,
                volumeEstimated:m.volumeEstimated,
                volumeRaw:m.volumeRaw,
                volumeClean:m.volumeClean,
                volumeCertified:m.volumeCertified,
                volumeSold:m.volumeSold,               

              };
            }),

        name: values.name,
        code: values.code,
        phoneNumber:
        (!dialCode || !values.phone.phoneNumber) ? null :
        `${dialCode}-${values.phone.phoneNumber}`,
        regionId: values.regionId,
        email: values.email,        
         zone: values.zone,
         woreda: values.woreda,
         town: values.town,
         isMember: values.isMember||false,
         contactPerson:values.contactPerson ,
         yearOfEstablishment: values.yearOfEstablishment,
         landArea: values.landArea,
         volume:values.volume ,
         gpsposition:values.gpsposition ,
         boardMembers: values.boardMembers,
         manager:values.manager ,
         technicalStaff: values.technicalStaff,
         administrativeStaff: values.administrativeStaff,
         altitude:values.altitude ,
         rainfall: values.rainfall,
         temperature:values.temperature,
         irrigationPotential: values.irrigationPotential,
         soilTypeId: values.soilTypeId,
         ph: values.ph,
         majorActivity: values.majorActivity,
         diversification: values.diversification,
         vision: values.vision,
         cOCReferenceNo:values?.cOCReferenceNo,
         tradeLicenseReferenceNo:values?.tradeLicenseReferenceNo,
         storageAvailable:values?.storageAvailable,
         storageCapacity:values?.storageCapacity,         
         landContracted:values?.landContracted,
         landRented:values?.landRented,
         landSelfOwned:values?.landSelfOwned,
         tractor:values?.tractor,
         combiner:values?.combiner,
         accessory:values?.accessory,
         farmImplementsOther:values?.farmImplementsOther,
         seedLab:values?.seedLab,
         processingPlant:values?.processingPlant

         //customerIds: values.customerToOrganizations?.map((c) => c.customerId),
         //supplierIds: values.orgBasicSeedSupplierOrganizations?.map((c) => c.supplierId),       

      };
      if (isEditMode) {
        prepareFormDataForUpdate(member);
      }
      setMemberToSave(member);

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
      width={1300}
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
          modalConfig={modalConfig?.data}
        />
      </div>
    </Modal>
  );
};

export default ManageMemberModal;
