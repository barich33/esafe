import { Button, Form, notification, PageHeader, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  lookupEndPoint,
  memberEndPoint,
} from "../../../api/primecareApi.endpoint";
import { httpService } from "../../../service/http.service";

import { seedBusinessColumns } from "../columns/seed-business-column";

const ManageSeedBusinessForm = ({ seedbusiness}) => {
  //const seedBusinesses = seedbusiness?.data?.seedBusinesses;
  const [seedBusinesses,setSeedBusinesses]=useState<any[]>([]);
  const organizationId = seedbusiness?.data?.organizationId;
  const isSBFormDisabled = "organizationId" in seedbusiness?.data;
  console.log("isSBFormDisabled", isSBFormDisabled);
  const [typesOfSeedBusinesses, setTypesOfSeedBusinesses] = useState([]);
  const [cropTypes, setCropTypes] = useState([]);
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [seedBusinessToSave, setSeedBusinessToSave] = useState(null);

  useEffect(() => {
    getTypesOfSeedBusinesses();
    getCropTypes();
  }, []);

  useEffect(() => {   
    getMemberById();
  }, [organizationId]);

  const getMemberById = () => {
    httpService
    .get(`${memberEndPoint.getMemberById}?id=${organizationId}`)
      .then((response) => {   
        console.log("memberdata",response.data?.member?.seedBusinesses);    
        setSeedBusinesses(response.data?.member?.seedBusinesses);
      })
      .catch(() => {});
  };

  const getCropTypes = () => {
    httpService
      .get(lookupEndPoint.getCropTypes)
      .then((response) => {
        console.log(response.data);
        setCropTypes(response.data);
      })
      .catch(() => {});
  };
  const getTypesOfSeedBusinesses = () => {
    httpService
      .get(lookupEndPoint.getTypesOfSeedBusinesses)
      .then((response) => {
        console.log(response.data);
        setTypesOfSeedBusinesses(response.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (!seedBusinessToSave) {
      return;
    }
    createOrUpdateSeedBusinessToSave();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  }, [seedBusinessToSave]);

  const prepareFormDataForUpdate = (seedBusiness) => {
    debugger;
    seedBusiness.organizationId = organizationId;
  };
  const createOrUpdateSeedBusinessToSave = () => {
    setIsFormSaving(true);
    const url = { add: "addSeedBusiness", update: "updateSeedBusiness" };

    httpService
      .post(
        memberEndPoint[isEditMode ? url.update : url.add],
        seedBusinessToSave
      )
      .then((response) => {
        if (response.status === 200) {
          showSuccess();
         getMemberById();
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
      organizationId: organizationId,
      cropTypeId: values.cropTypeId,
      typesOfSeedBusinessId: values.typesOfSeedBusinessId,
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
        title={`Members Crop Business (${seedbusiness?.data?.name})`}
      />
      <div className="grid md:grid-cols-1">
        <Table
          size="small"
          className="mt-1 w-full cursor-pointer"
          dataSource={seedBusinesses}
          columns={seedBusinessColumns(seedBusinesses)}
          rowKey={"Id"}
          bordered
        />

        <Form
         form={form}
          disabled={!isSBFormDisabled}        
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ seedBusinessToSave: true }}
          onFinish={submitSB}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          size="small"
        >
           <PageHeader
        title={`Add New Members Crop Business`}
      />
          <Form.Item
            name={["cropTypeId"]}
            label={"Crop"}
            rules={[{ required: true, message: "select Crop" }]}
            //  hidden={!isRegionFetched}
          >
            <Select
              disabled={cropTypes.length === 1}
              showSearch={true}
              placeholder=""
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              options={cropTypes?.map((_: any, index) => {
                return {
                  key: index,
                  value: _.cropTypeId,
                  label: _.name,
                  title: _.name,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            name={["typesOfSeedBusinessId"]}
            label={"Seed Business"}
            rules={[{ required: true, message: "select Seed Business" }]}
            //  hidden={!isRegionFetched}
          >

            <Select
              disabled={typesOfSeedBusinesses.length === 1}
              showSearch={true}
              placeholder=""
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              options={typesOfSeedBusinesses?.map((_: any, index) => {
                return {
                  key: index,
                  value: _.typesOfSeedBusinessId,
                  label: _.name,
                  title: _.name,
                };
              })}
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
    </>
  );
};

export default ManageSeedBusinessForm;
