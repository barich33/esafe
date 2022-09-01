import { Form, Select } from 'antd';
import React from 'react';
import CountryCodes from '../components/resources/country-codes';

const PhoneNumberPrefix = ({ isRequired = true }) => {
  return (
    <Form.Item name={['phone', 'countryCode']} noStyle
               rules={[{ required: isRequired, message: 'select country code' }]}>
      <Select
        className={'country-code'}
        dropdownMatchSelectWidth={false}
        showSearch
        placeholder="Code"
        optionFilterProp="children"
        optionLabelProp="label"
      >
        {CountryCodes.map((code, index) => <Select.Option key={index} label={code.dial_code}
                                                          value={code.code}>{code.name}</Select.Option>)}
      </Select>
    </Form.Item>
  );
};

export default PhoneNumberPrefix;
