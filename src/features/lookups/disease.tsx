import { Button, Col, Form, Input, notification, PageHeader, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { lookupEndPoint } from "../../api/primecareApi.endpoint";
import { httpService } from "../../service/http.service";
import {LookUpColumns } from "./columns/lookup-column";


const Disease = () => {  
  const [lookupData, setLooupData] = useState([]);
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [lookupToSave, setCropTypeToSave] = useState(null);
   const[lookupId,setLookupId]=useState();
   const lookupTable='Disease';
  useEffect(() => {
    getLookups();
  }, []);


  const getLookups = () => {
    httpService
      .get(lookupEndPoint.getDiseases)
      .then((response) => {
        console.log(response.data);
        setLooupData(response.data);
      })
      .catch(() => {});
  };


  useEffect(() => {
    if (!lookupToSave) {
      return;
    }
    createOrUpdateCropTypeToSave();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  }, [lookupToSave]);

  const prepareFormDataForUpdate = (lookup) => {
    debugger;
    lookup.lookupId = lookupId;
  };
  const createOrUpdateCropTypeToSave = () => {
    setIsFormSaving(true);
    const url = { add: "addLookup", update: "updateLookup" };

    httpService
      .post(
        lookupEndPoint[isEditMode ? url.update : url.add],
        lookupToSave
      )
      .then((response) => {
        if (response.status === 200) {
          showSuccess();
          getLookups();
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
      message: `${isEditMode ? "Update" : "Add"} Disease`,
      description: `Disease ${isEditMode ? "Updated" : "Added"} Successfully.`,
    });
  };

  const showError = (message = null) => {
    setIsFormSaving(false);
    notification.error({
      message: `${isEditMode ? "Update" : "Add"} Disease`,
      description: message
        ? message
        : `unable to ${isEditMode ? "update" : "add"} Disease`,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const submitLookupForm = (values: any) => {
    debugger;
    const lookupModel = {
      ...values,
      lookupId: values.lookupId,
      name: values.name,
      lookupTable:lookupTable
    };
    if (isEditMode) {
      prepareFormDataForUpdate(lookupModel);
    }
    setCropTypeToSave(lookupModel);
  };
 
  const onEditForm = (data)=>{
    setIsEditMode(true);
    setIsEditMode(false);
    setLookupId(data?.diseaseId);  
    const formData={
      name:data?.name
    }
    form.setFieldsValue(formData); 
   }

  return (   
<section className="bg-gray-100">
  <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-4">
      <div className="lg:col-span-2 lg:py-0">    
      <PageHeader
        title='Variety'
      />    
  <Table
          size="small"
          className="mt-1 w-full cursor-pointer"
          dataSource={lookupData}
          columns={ LookUpColumns(           
            onEditForm           
           )}
          rowKey={"Id"}
          bordered
        />
      </div>

      <div className="rounded-lg bg-white  shadow-lg lg:col-span-2 lg:p-5">
      <Form
         form={form}            
         
          initialValues={{ lookupToSave: true }}
          onFinish={submitLookupForm}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          size="small"
        >
           <PageHeader
        title={`Add New ${lookupTable}`}
      />
         
          <Form.Item
            name={["name"]}
            label={lookupTable}
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
      </div>
    </div>
  </div>
</section>
  );
};

export default Disease;
