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
} from "antd";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import PhoneNumberPrefix from "../../../shared/user-phone-number-prefix";
import { httpService } from "../../../service/http.service";
import { lookupEndPoint } from "../../../api/primecareApi.endpoint";
import "./manage-member.css";
const ManageMemberForm = ({ form, isEditMode, modalConfig }) => {
  const { TabPane } = Tabs;
  const [isCountryCodeRequired, setIsCountryCodeRequired] = useState(false);
  const gender = ["Male", "Female"];
  const [typesOfSeedBusnesses, setTypesOfSeedBusnesses] = useState([]);
   const[regions,setRegions]=useState([]);
   const [isMember,setIsmember]=useState(false);
   const [isConfirmIsMemberModalVisible,setIsConfirmIsMemberModalVisible]=useState(false)
  useEffect(() => {
    getTypesOfSeedBusinesses();
    getRegions();
  }, []);

  const getTypesOfSeedBusinesses = () => {
    httpService
      .get(lookupEndPoint.getTypesOfSeedBusinesses)
      .then((response) => {
        console.log(response.data);
        setTypesOfSeedBusnesses(response.data);
      })
      .catch(() => {
     
      });
  };

  const getRegions = () => {
    httpService
      .get(lookupEndPoint.getRegions)
      .then((response) => {      
        setRegions(response.data);
      })
      .catch(() => {
     
      });
  };
  const handleIsMember=(isMember:boolean)=>{
    form.setFieldsValue({ isMember: isMember })
   console.log(isMember);
  }
 
  return (
    <Form
    form={form}
    layout={"horizontal"}
    preserve={false}
    size="small"
    labelCol={{ span: 5 }}
    wrapperCol={{ span: 30 }}
    onValuesChange={(changedValues, allValues) => {
      if (changedValues['phone']) {
        const phoneNumber = allValues['phone'].phoneNumber;
        const newValue = {
          ...allValues,
          phone: {
            ...allValues.phone,
            phoneNumber: phoneNumber?.replace(/\D/g, ''),
          },
        };
        form.setFieldsValue(newValue);
      }
    }}
   >
      <br></br>
       <Form.Item
             label="Name"
             name="name"
             rules={[{ required: true, message: 'Please enter name' }]}
           >
             <Input placeholder="" />
        </Form.Item>

        <Form.Item
             label="Code"
             name="code"
             rules={[{ required: true, message: 'Please enter code' }]}
           >
             <Input placeholder="" />
        </Form.Item>
        <Form.Item
             label="Email"
             name="email"
             rules={[{ required: true, message: 'Please enter email name' }]}
           >
             <Input placeholder="enter email" />
        </Form.Item>
        <Form.Item
              label="Phone Number"
              name={['phone', 'phoneNumber']}
              rules={[
                { min: 6, message: 'invalid phone number' },
                { max: 10, message: 'invalid phone number' },
              ]}
            >
              <Input
                onChange={(event) => {
                  setIsCountryCodeRequired(form.getFieldValue(['phone', 'phoneNumber'])?.trim().length > 0);
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  form.validateFields().then().catch(() => {});
                }}
                addonBefore={<PhoneNumberPrefix isRequired={isCountryCodeRequired}  />}
                required={false}
                placeholder="enter phone number"
              />
            </Form.Item>
        <Form.Item
             name={['regionId']}
             label={'Region'}
            // rules={[{ required: true, message: 'select Region' }]}
           //  hidden={!isRegionFetched}
           >
             <Select
               disabled={!isEditMode && regions.length === 1}
               showSearch={true}
               placeholder="Region"
               optionFilterProp="children"
               filterOption={(input, option) =>
                 option?.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
               }
               options={regions?.map((_:any, index) => {
                 return {
                   key: index,
                   value: _.regionId,
                   label: _.name,
                   title: _.name,
                 };
               })}                
             />
           </Form.Item>
           <Form.Item
             label="Woreda"
             name="woreda"
             
           >
             <Input placeholder="" />
        </Form.Item>
        <Form.Item
             label="Zone"
             name="zone"
             
           >
             <Input placeholder="" />
        </Form.Item>

        <Form.Item
             label="Town"
             name="town"
             
           >
             <Input placeholder="" />
        </Form.Item>
           <Form.Item name="isMember" valuePropName="checked">
                <Checkbox onChange={(e)=>handleIsMember(e.target.checked)} value={isMember} style={{ lineHeight: '32px' }}>
                 Is Member
                </Checkbox>
            </Form.Item>     
   </Form>
  );
};

export default ManageMemberForm