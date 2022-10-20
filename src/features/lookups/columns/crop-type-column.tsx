import { EllipsisOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Button, Dropdown, Menu } from 'antd';
// Sample Columns data

export const cropTypeColumns=(
  OnEditSeedBusiness, 
  )=>{
console.log('colm',OnEditSeedBusiness);
    

  return [
    
    {
    title:'Crop Type',
    dataIndex:'name',
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
           Edit
          </Button>
        );
      },
  },
  
  ];
}