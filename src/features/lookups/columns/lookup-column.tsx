import { EllipsisOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Button, Dropdown, Menu } from 'antd';
// Sample Columns data

export const LookUpColumns=(
  onEditForm, 
  )=>{
console.log('colm',onEditForm);    

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
            onClick={() => onEditForm(record)}
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