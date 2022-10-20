import {
  DatePicker,
  Checkbox,
  Form,
  Input,
  Select,
  Typography,
  Tabs,
  Row,
  Col,
  PageHeader,
  Space,
  InputNumber,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import PhoneNumberPrefix from "../../../shared/user-phone-number-prefix";
import { httpService } from "../../../service/http.service";
import { lookupEndPoint } from "../../../api/primecareApi.endpoint";
import "./manage-member.css";
import TextArea from "antd/lib/input/TextArea";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 30, offset: 0 },
    sm: { span: 16, offset: 0 },
  },
};

const ManageMemberForm = ({ form, isEditMode, modalConfig }) => {
  const { TabPane } = Tabs;
  const [isCountryCodeRequired, setIsCountryCodeRequired] = useState(false);
  const gender = ["Male", "Female"];
  const [typesOfSeedBusnesses, setTypesOfSeedBusnesses] = useState([]);
  const [regions, setRegions] = useState([]);
  const [isMember, setIsmember] = useState(false);
  const [isConfirmIsMemberModalVisible, setIsConfirmIsMemberModalVisible] =
    useState(false);
  const [cropTypes, setCropTypes] = useState([]);
  const [soileTypes, setSoilTypes] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [varieties, setVarieties] = useState([]);

  useEffect(() => {
    getTypesOfSeedBusinesses();
    getRegions();
    getCropTypes();
    getSoilTypes();
    getCustomers();
    getOrganizations();
    getVarieties();
  }, []);

  const getVarieties = () => {
    httpService
      .get(lookupEndPoint.getVarieties)
      .then((response) => {
        setVarieties(response.data);
      })
      .catch(() => {});
  };
  const getOrganizations = () => {
    httpService
      .get(lookupEndPoint.getOrganizations)
      .then((response) => {
        console.log(response.data);
        setOrganizations(response.data);
      })
      .catch(() => {});
  };
  const getCustomers = () => {
    httpService
      .get(lookupEndPoint.getCustomers)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch(() => {});
  };
  const getSoilTypes = () => {
    httpService
      .get(lookupEndPoint.getSoilTypes)
      .then((response) => {
        console.log(response.data);
        setSoilTypes(response.data);
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
      .catch((error) => {
        console.log(error);
      });
  };
  const getTypesOfSeedBusinesses = () => {
    httpService
      .get(lookupEndPoint.getTypesOfSeedBusinesses)
      .then((response) => {
        console.log(response.data);
        setTypesOfSeedBusnesses(response.data);
      })
      .catch(() => {});
  };

  const getRegions = () => {
    httpService
      .get(lookupEndPoint.getRegions)
      .then((response) => {
        setRegions(response.data);
      })
      .catch(() => {});
  };
  const handleIsMember = (isMember: boolean) => {
    form.setFieldsValue({ isMember: isMember });
    console.log(isMember);
  };

  return (
    <>
      <Form
        form={form}
        layout={"horizontal"}
        preserve={true}
        size="small"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 40 }}
        onValuesChange={(changedValues, allValues) => {
          if (changedValues["phone"]) {
            const phoneNumber = allValues["phone"].phoneNumber;
            const newValue = {
              ...allValues,
              phone: {
                ...allValues.phone,
                phoneNumber: phoneNumber?.replace(/\D/g, ""),
              },
            };
            form.setFieldsValue(newValue);
          }
        }}
      >
        <Tabs defaultActiveKey="1" className="p-3">
          <TabPane tab="Contact details and Key Facts" key={"1"} forceRender>
            <div className="grid md:grid-cols-2">
              <div className={"md:border-r-2 md:pr-0 lg:pr-2"}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter name" }]}
                >
                  <Input placeholder="" />
                </Form.Item>

                <Form.Item
                  label="Code"
                  name="code"
                  rules={[{ required: true, message: "Please enter code" }]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  label="Contact Person"
                  name="contactPerson"
                  rules={[
                    { required: true, message: "Please enter Contact Person" },
                  ]}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter email name" },
                  ]}
                >
                  <Input placeholder="enter email" />
                </Form.Item>
                <Form.Item
                  label="Phone Number"
                  name={["phone", "phoneNumber"]}
                  rules={[
                    { min: 6, message: "invalid phone number" },
                    { max: 10, message: "invalid phone number" },
                  ]}
                >
                  <Input
                    onChange={(event) => {
                      setIsCountryCodeRequired(
                        form.getFieldValue(["phone", "phoneNumber"])?.trim()
                          .length > 0
                      );
                      // eslint-disable-next-line @typescript-eslint/no-empty-function
                      form
                        .validateFields()
                        .then()
                        .catch(() => {});
                    }}
                    addonBefore={
                      <PhoneNumberPrefix isRequired={isCountryCodeRequired} />
                    }
                    required={false}
                    placeholder="enter phone number"
                  />
                </Form.Item>
                <Form.Item
                  name={["regionId"]}
                  label={"Region"}
                  // rules={[{ required: true, message: 'select Region' }]}
                  //  hidden={!isRegionFetched}
                >
                  <Select
                    disabled={!isEditMode && regions.length === 1}
                    showSearch={true}
                    placeholder="Region"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.title
                        ?.toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    options={regions?.map((_: any, index) => {
                      return {
                        key: index,
                        value: _.regionId,
                        label: _.name,
                        title: _.name,
                      };
                    })}
                  />
                </Form.Item>
                <Form.Item label="Woreda" name="woreda">
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item label="Zone" name="zone">
                  <Input placeholder="" />
                </Form.Item>

                <Form.Item label="Town" name="town">
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item name="isMember" valuePropName="checked">
                  <Checkbox
                    onChange={(e) => handleIsMember(e.target.checked)}
                    value={isMember}
                    style={{ lineHeight: "32px" }}
                  >
                    Is Member
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={" md:pl-4 lg:pl-8"}>
                <Form.Item
                  name="yearOfEstablishment"
                  label="Year of Establishment"
                >
                  <InputNumber placeholder="" />
                </Form.Item>
                <Form.Item label="Land Area" name="landArea">
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item label="Volume" name="volume">
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item label="GPSPosition" name="gpsposition">
                  <Input placeholder="" />
                </Form.Item>
                <PageHeader title="Structure and Size of Company" />
                <Form.Item label="Board Members" name="boardMembers">
                  <InputNumber placeholder="" />
                </Form.Item>
                <Form.Item label="Manager" name="manager">
                  <InputNumber placeholder="" />
                </Form.Item>
                <Form.Item label="Technical Staff" name="technicalStaff">
                  <InputNumber placeholder="" />
                </Form.Item>
                <Form.Item
                  label="Administrative Staff"
                  name="administrativeStaff"
                >
                  <InputNumber placeholder="" />
                </Form.Item>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Agro-Ecology and Climate" key={"2"} forceRender>
            <div className="grid md:grid-cols-2">
              <div className={"md:border-r-2 md:pr-2 lg:pr-2"}>
                <Form.Item label="Altitude" name="altitude">
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item label="Rainfall" name="rainfall">
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item label="Temperature" name="temperature">
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  label="IrrigationPotential"
                  name="irrigationPotential"
                >
                  <Input placeholder="" />
                </Form.Item>

                <Form.Item
                  name={["soilTypeId"]}
                  label={"Soil Type"}
                //  rules={[{ required: true, message: "select Soil" }]}
                  //  hidden={!isCropTypeFetched}
                >
                  <Select
                    disabled={!isEditMode && soileTypes.length === 1}
                    showSearch={true}
                    placeholder=""
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.title
                        ?.toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    options={soileTypes?.map((_: any, index) => {
                      return {
                        key: index,
                        value: _.soilTypeId,
                        label: _.name,
                        title: _.name,
                      };
                    })}
                  />
                </Form.Item>

                <Form.Item label="PH" name="ph">
                  <Input placeholder="" />
                </Form.Item>
              </div>

              <div className={" md:pl-4 lg:pl-8"}>
                <Form.Item label="MajorActivity" name="majorActivity">
                  <TextArea placeholder="" rows={3} />
                </Form.Item>
                <Form.Item label="Diversification" name="diversification">
                  <TextArea placeholder="" rows={3} />
                </Form.Item>
                <Form.Item label="Vision" name="vision">
                  <TextArea placeholder="" rows={4} />
                </Form.Item>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Seed Crop Details" key={"3"} forceRender>
            <Form.Item
              name={["customerIds"]}
              label={"Seed Customers"}
              /*  rules={[
                  { required: true, message: "select Customers" },
                ]}
                hidden={isEditMode && customers.length === 0} */
            >
              <Select
                mode="multiple"
                showSearch={true}
                placeholder=""
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                options={customers?.map((_: any, index) => {
                  return {
                    key: index,
                    value: _.customerId,
                    title: _.name,
                    label: _.name,
                  };
                })}
              ></Select>
            </Form.Item>
            <Form.Item
              name={["supplierIds"]}
              label={"Basic Seed suppliers "}
              /*  rules={[
                  { required: true, message: "select Customers" },
                ]}
                hidden={isEditMode && customers.length === 0} */
            >
              <Select
                mode="multiple"
                showSearch={true}
                placeholder=""
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                options={organizations?.map((_: any, index) => {
                  return {
                    key: index,
                    value: _.organizationId,
                    title: _.name,
                    label: _.name,
                  };
                })}
              ></Select>
            </Form.Item>
            <PageHeader title="Crop and variety portfolio"></PageHeader>
            <Form.List name="cropVarieties">
              {(fields, { add, remove }) => (
                <>
                          <table>
                            <tbody>
                           <th>Crop</th>
                           <th>Varieties</th>
                           <th>Volume of Production(per 100kg)</th>
                           <th>Price(per 100kg)</th>
                           <th> Pack Size</th>
                           <th> Distribution Location</th>
                           
                   
                  {fields.map((field) => (
                          <tr key={field.key}>
                  
                 
                          
                              <td>   <Form.Item
                        {...field}
                        name={[field.name, "cropTypeId"]}
                        rules={[{ required: true, message: "Missing Crop" }]}
                      >
                        <Select
                        size="small"
                        style={{ minWidth: 150 }}
                          showSearch={true}
                          placeholder="Select Crop Type"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option?.title
                              ?.toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
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
                       </td>
                              <td><Form.Item
                        {...field}
                        name={[field.name, "varietyId"]}
                        rules={[
                          { required: true, message: "Missing Varieties" },
                        ]}
                      >
                        <Select
                        size="small"
                        style={{ minWidth: 150 }}
                          showSearch={true}
                          placeholder="Select crop Varieties"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option?.title
                              ?.toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          options={varieties?.map((_: any, index) => {
                            return {
                              key: index,
                              value: _.varietyId,
                              label: _.name,
                              title: _.name,
                            };
                          })}
                        />
                      </Form.Item></td>
                              <td>  <Form.Item
                        {...field}
                        name={[field.name, "price"]}
                        
                      //  rules={[{ required: true, message: "Missing Price" }]}
                      >
                        <InputNumber
                          min={0}
                          defaultValue={0.00}
                          size="small"
                          style={{ minWidth: 150 }}
                        
                        />
                      </Form.Item></td>
                      <td>  <Form.Item
                        {...field}
                        name={[field.name, "volumeOfProduction"]}
                        
                      //  rules={[{ required: true, message: "Missing Price" }]}
                      >
                        <InputNumber
                          min={0}
                          defaultValue={0.00}
                          size="small"
                          style={{ minWidth: 150 }}
                        
                        />
                      </Form.Item></td>
                      <td>  <Form.Item
                        {...field}
                        name={[field.name, "packSize"]}
                        
                      //  rules={[{ required: true, message: "Missing Price" }]}
                      >
                        <InputNumber
                          min={0}
                       defaultValue={1}
                          size="small"
                          style={{ minWidth: 150 }}
                        
                        />
                      </Form.Item></td>

                      <td style={{paddingTop:'0px'}}>
                      <Form.Item
                        {...field}
                        name={[field.name, "distributionLocation"]}
                        
                      //  rules={[{ required: true, message: "Missing Price" }]}
                      >
                        <TextArea                         
                          rows={1}
                          size="small"
                          style={{ minWidth: 150 }}
                        
                        />
                      </Form.Item></td>
                     
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                      
                        
                    </tr>
                       
                  ))}
                    </tbody>
                    </table>
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Crop Varieties
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </TabPane>
        </Tabs>
      </Form>
    </>
  );
};

export default ManageMemberForm;
