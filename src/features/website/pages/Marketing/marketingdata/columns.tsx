import { EllipsisOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Button, Dropdown, Menu } from 'antd';
// Sample Columns data

export const MarketingColumns=(  
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
        title: 'Organization',
        dataIndex: 'organization',
        render: (organization, record, index) => {
          return organization?.name;
        },
        
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
    title: 'Price',
      dataIndex: 'price',
     
}, 
    
    {
      title: 'More Info',
      dataIndex: 'moreInfo',
      render: (text, record) => {
        return (
          <Button
           onClick={() => {}}
            type="link"
            className="info-btn flex items-center justify-left"
          >
            <Icon icon="ant-design:info-outlined" fontSize={20} color="green" />
          </Button>
        );
      },
  },
  
  ];
}