import { Form, PageHeader, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { lookupEndPoint } from '../../../api/primecareApi.endpoint';
import { httpService } from '../../../service/http.service';

import { seedBusinessColumns } from '../columns/seed-business-column';

const ManageSeedBusinessForm = ({ members, isEditMode }) => {
  const seedBusinesses=members?.data?.seedBusinesses;
  const [typesOfSeedBusinesses,setTypesOfSeedBusinesses]=useState([]);
  const [cropTypes,setCropTypes]=useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    getTypesOfSeedBusinesses();
    getCropTypes();
  }, []);

  const getCropTypes = () => {
    httpService
      .get(lookupEndPoint.getCropTypes)
      .then((response) => {
        console.log(response.data);
        setCropTypes(response.data);
      })
      .catch(() => {
     
      });
  };
  const getTypesOfSeedBusinesses = () => {
    httpService
      .get(lookupEndPoint.getTypesOfSeedBusinesses)
      .then((response) => {
        console.log(response.data);
        setTypesOfSeedBusinesses(response.data);
      })
      .catch(() => {
     
      });
  };
  
  return (
    <>
       <div className="grid md:grid-cols-2">
            <div className={"md:border-r-2 md:pr-8 lg:pr-6"}>
          <Table size='small'
             className="mt-1 w-full cursor-pointer"
           dataSource={seedBusinesses} 
           columns={ seedBusinessColumns(           
            seedBusinesses
           )}
        
           rowKey={'Id'}
           bordered          
          />
           </div>
           <Form
    form={form}
    layout={"horizontal"}
    preserve={false}
    size="small"
    labelCol={{ span: 0 }}
    wrapperCol={{ span: 20 }}
    
   >
            <div className={" md:pl-8 lg:pl-16"}>
              <PageHeader>New Crop Business</PageHeader>
              <Form.Item
             name={['cropTypeId']}
             label={'Crop'}
             rules={[{ required: true, message: 'select Crop' }]}
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
               options={cropTypes?.map((_:any, index) => {
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
             name={['typesOfSeedBusinessId']}
             label={'Seed Business'}
            rules={[{ required: true, message: 'select Seed Business' }]}
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
               options={typesOfSeedBusinesses?.map((_:any, index) => {
                 return {
                   key: index,
                   value: _.typesOfSeedBusinessId,
                   label: _.name,
                   title: _.name,
                 };
               })}                
             />
           </Form.Item>
            </div>
</Form>
            </div>
    </>
  )
}

export default ManageSeedBusinessForm