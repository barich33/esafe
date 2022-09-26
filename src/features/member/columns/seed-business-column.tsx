import { EllipsisOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Button, Dropdown, Menu } from 'antd';
// Sample Columns data

export const seedBusinessColumns=(
  OnEditSeedBusiness, 
  )=>{
console.log('colm',OnEditSeedBusiness);
    const actionMenu = (record) => {
      console.log('recorddata',record)
      return  <Menu>
        <Menu.Item key="0" className={'border-b'}>
          <Button type="text" className={'font-bold text-left p-0 w-full'}
                  onClick={(event) => {event.stopPropagation(); OnEditSeedBusiness(record);}}
          >Edit</Button>
        </Menu.Item>      
      </Menu>
    };

  return [
    
    {
    title:'Crop Type',
    dataIndex:'cropType',
    render: (cropType, record, index) => {
      return cropType?.name
    },
    },
      
      {
        title: 'Type of Seed Businesses',
        dataIndex: 'typesOfSeedBusinesses',
        render: (typesOfSeedBusinesses, record, index) => {
          return typesOfSeedBusinesses?.name
        },
        
    },
     
    
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record, index) => {
        return (
          <Button
           // onClick={() => onDeleteSeedBusiness(record)}
            type="link"
            className="edit-btn flex items-center justify-left"
          >
            <Icon icon="ant-design:delete-outlined" fontSize={30} color="red" />
          </Button>
        );
      },
  },
  
  ];
}