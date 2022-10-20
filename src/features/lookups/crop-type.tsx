import { Button, Col, Form, Input, notification, PageHeader, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { lookupEndPoint, memberEndPoint } from "../../api/primecareApi.endpoint";
import { httpService } from "../../service/http.service";
import { cropTypeColumns } from "./columns/crop-type-column";


const CropTypes = () => {
  
  const [cropTypes, setCropTypes] = useState([]);
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [cropTypeToSave, setSeedBusinessToSave] = useState(null);
   const[cropTypeId,setCropTypeId]=useState();
  useEffect(() => {
    getCropTypes();
  }, []);


  const getCropTypes = () => {
    httpService
      .get(lookupEndPoint.getCropTypes)
      .then((response) => {
        console.log(response.data);
        setCropTypes(response.data);
      })
      .catch(() => {});
  };


  useEffect(() => {
    if (!cropTypeToSave) {
      return;
    }
    createOrUpdateSeedBusinessToSave();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  }, [cropTypeToSave]);

  const prepareFormDataForUpdate = (seedBusiness) => {
    debugger;
    seedBusiness.cropTypeId = cropTypeId;
  };
  const createOrUpdateSeedBusinessToSave = () => {
    setIsFormSaving(true);
    const url = { add: "addSeedBusiness", update: "updateSeedBusiness" };

    httpService
      .post(
        memberEndPoint[isEditMode ? url.update : url.add],
        cropTypeToSave
      )
      .then((response) => {
        if (response.status === 200) {
          showSuccess();
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
      message: `${isEditMode ? "Update" : "Add"} Seed Business`,
      description: message
        ? message
        : `unable to ${isEditMode ? "update" : "add"} Seed Business`,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const submitSB = (values: any) => {
    debugger;
    const user = {
      ...values,
      cropTypeId: values.cropTypeId,
      name: values.name,
    };
    if (isEditMode) {
      prepareFormDataForUpdate(user);
    }
    setSeedBusinessToSave(user);
    //createOrUpdateSeedBusinessToSave();
  };
 
  
  return (
    <>
      <PageHeader
        title='Crop Type'
      />
      <Row gutter={[16, 16]}>
  <Col span={6}>
  <Table
          size="small"
          className="mt-1 w-full cursor-pointer"
          dataSource={cropTypes}
          columns={cropTypeColumns(cropTypes)}
          rowKey={"Id"}
          bordered
        />
  </Col>
  <Col span={6}>

  <Form
         form={form}
             
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ cropTypeToSave: true }}
          onFinish={submitSB}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          size="small"
        >
           <PageHeader
        title={`Add New Crop Type`}
      />
         
          <Form.Item
            name={["name"]}
            label={"Crop"}
            rules={[{ required: true, message: "Required" }]}
            //  hidden={!isRegionFetched}
          >

            <Input
             
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            htmlType="submit"
            type="primary"
            className="edit-btn flex items-center justify-left"
          >
            Save
          </Button>
      </Form.Item>
         
        </Form>
  </Col>
 
</Row>
     
    </>
  );
};

export default CropTypes;
