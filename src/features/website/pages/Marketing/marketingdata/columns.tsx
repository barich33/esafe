import { EllipsisOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Button, Drawer, Dropdown, Menu, Space } from 'antd';
import { useState } from 'react';
import MarketingDetail from '../marketingDetail';
// Sample Columns data

export const MarketingColumns=(  
  onViewCrop,
  rowToUpdate,
  updatedIndex,
  current,
  page
  )=>{

  
    
  return [
    {
      title: '#',
      dataIndex: 'organizationId',
      render: (text, record, rowIndex) => (current - 1) * page + rowIndex + 1,
    },  
      
    {
      title: 'Crop',
      dataIndex: 'cropType',
      render: (cropType, record, index) => {
        return cropType?.name;
      },
      
  },
      {
        title: 'Variety',
        dataIndex: 'variety',
        render: (variety, record, index) => {
          return variety.name;
        },
    },
   
    
  {
   title:'Update Date(mm/dd/yyyy)',
   dataIndex:'modifiedDate',
   render: (text, record, index) => {
    if (text === null || text === undefined) {
      return 'NA';
    } else {
      const dateResult = new Date(text);
      const date = dateResult.toLocaleDateString();
      return <span>{date}</span>;
    }
  },
  },
  {
    title: 'Price(per qt)',
      dataIndex: 'price',     
}, 
{
  title: 'Organization',
  dataIndex: 'organization',
  render: (organization, record, index) => {
    return organization?.name;
  },        
},
{
  title: 'Sells Center',
  dataIndex: 'distributionLocation',
        
},

   

  {
    title: '',
    dataIndex: 'action',
    render: (text, record) => {
      return (
        <Button type="text" className={'font-bold text-left p-0 w-full'}                 
        onClick={(event) => {event.stopPropagation();onViewCrop(record)}}
>More Detail</Button>  
       
      );
    },
  },
  
  ];
}