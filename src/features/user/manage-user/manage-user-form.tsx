import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { lookupEndPoint } from "../../../api/primecareApi.endpoint";
import { httpService } from "../../../service/http.service";
import PhoneNumberPrefix from "../../../shared/user-phone-number-prefix";
const { Option } = Select;
const UserManageForm =({form, isEditMode, modalConfig})=>{

    const [isCountryCodeRequired, setIsCountryCodeRequired] = useState(true);
    const [organizations, setOrganizations] = useState([]);
    useEffect(() => {     
      getOrganizations();
    }, []);

    const getOrganizations = () => {
      httpService
        .get(lookupEndPoint.getOrganizations)
        .then((response) => {
          setOrganizations(response.data);
        })
        .catch(() => {
     
        });
    };
  
   return <Form
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
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input placeholder="enter first name" />
         </Form.Item>

      
         <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input placeholder="enter last name" />
         </Form.Item>

         <Form.Item
              label="Email"
              name="email"
              required={false}
            >
              <Input placeholder="enter email" />
         </Form.Item>

         <Form.Item
              label="UserName"
              name="userName"
              rules={[{ required: true, message: 'Please enter UserName' }]}
            >
              <Input placeholder="enter UserName" />
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
                name={["organizationId"]}
                label={"Organization"}
                rules={[
                  { required: true, message: "Select Organization" },
                ]}
                hidden={isEditMode && organizations.length === 0}
              >
                <Select
                 // mode="multiple"
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
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
      

    </Form>
}

export default UserManageForm