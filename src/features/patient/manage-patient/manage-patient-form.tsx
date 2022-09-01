import { DatePicker, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import PhoneNumberPrefix from "../../../shared/user-phone-number-prefix";
import { httpService } from "../../../service/http.service";
import { lookupEndPoint } from "../../../api/primecareApi.endpoint";
const { Option } = Select;
const PatientManageForm =({form, isEditMode, modalConfig})=>{

    const [isCountryCodeRequired, setIsCountryCodeRequired] = useState(false);
    const gender = ["Male","Female"];
    const[regions,setRegions]=useState([]);
    const[regions$,setRegions$]=useState([]);
    const[subCities,setSubCities]=useState([]);
    const[subCities$,setSubCities$]=useState([]);
    const [isRegionFetched, setIsRegionFetched] = useState(false);
    const [isSubCityFetched, setIsSubCityFetched] = useState(false);

    useEffect(()=>{
    getRegions();
    getSubCities();
    },[]);

const getRegions=() => {
  httpService
    .get(lookupEndPoint.getRegions)
    .then((response) => {
      console.log(response.data);
      setRegions(response.data);
      setRegions$(response.data);
      setIsRegionFetched(true);
      console.log(regions);
    })
    .catch(() => {
      setIsRegionFetched(false);
      setIsSubCityFetched(false);
    });
};
const getSubCities=() => {
  httpService
    .get(lookupEndPoint.getSubCities)
    .then((response) => {
      setSubCities(response.data);
      setSubCities$(response.data);
      setIsSubCityFetched(true);
    })
    .catch(() => {
      setIsRegionFetched(false);
      setIsSubCityFetched(false);
    });
};
   return <Form
     form={form}
     layout={'vertical'}
     preserve={false}
    >
         <div className="grid md:grid-cols-2">
          <div className={'md:border-r-2 md:pr-8 lg:pr-16'}>
        
        <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input placeholder="enter first name" />
         </Form.Item>

         <Form.Item
              label="Father Name"
              name="middleName"
              rules={[{ required: true, message: 'Please enter middle name' }]}
            >
              <Input placeholder="enter middle name" />
         </Form.Item>

         <Form.Item
              label="G.Father's(Sir) Name"
              name="lastName"
              rules={[{ required: true, message: 'Please enter G.Fathers Name' }]}
            >
              <Input placeholder="enter last name" />
         </Form.Item>

         <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter email name' }]}
            >
              <Input placeholder="enter email" />
         </Form.Item>

         <Form.Item
              name={['sex']} 
              label={'Sex'}
              rules={[{ required: true, message: 'select sex' }]}
            >
              
              <Select
              defaultValue={modalConfig.data?.sex?modalConfig.data.sex:''}
               /*  showSearch={true}
                placeholder="Gender"
                optionFilterProp="children"
                options={gender.map((_, index) => {
                  return {
                    key: index,
                    value: _,
                    title: _,
                    label: _,
                  };
                })} */
              > {gender?.map((sex: any, index: number) => {

                return (
  
                  <Option key={index} value={sex}>  
                    {sex}  
                  </Option>
  
                )
  
              })}</Select>
            </Form.Item>  
            <Form.Item
      label="Birth Date"
      name="birthDate"
      rules={[{ required: true, message: 'Please select birth date' }]}
    >
      <DatePicker
        className={'w-full'}
        popupStyle={{width:'31%'}}
        dropdownClassName={'w-auto'}
       // onChange={(value,dateString)=>setFiscalYear(dateString)}
        name={'birthDate'}
       // picker={'year'}
        suffixIcon={<Icon fontSize={25} icon="bx:chevron-down" />}
      />
    </Form.Item>
          </div>
          <div className={' md:pl-8 lg:pl-16'}>
          <Form.Item
              label="Phone Number"
              name={['phone', 'mobilePhone']}
              rules={[
                { min: 6, message: 'invalid phone number' },
                { max: 10, message: 'invalid phone number' },
              ]}
            >
              <Input
                onChange={(event) => {
                  setIsCountryCodeRequired(form.getFieldValue(['phone', 'mobilePhone'])?.trim().length > 0);
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
              name={['subCityId']}
              label={'SubCity/Woreda'}
             // rules={[{ required: true, message: 'select SubCity' }]}
              hidden={!isSubCityFetched}
            >
              <Select
                disabled={!isEditMode && subCities.length === 1}
                showSearch={true}
                placeholder="SubCity"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                options={subCities?.map((_:any, index) => {
                  return {
                    key: index,
                    value: _.subCityId,
                    label: _.name,
                    title: _.name,
                  };
                })}                
              />
            </Form.Item>

          </div>
          </div>

    </Form>
}

export default PatientManageForm