import { Icon } from '@iconify/react';
import { Button } from 'antd';
// Sample Columns data
export const columns=(onEditUser)=>{
  return [
    {
      title: '#',
      dataIndex: 'userId',
    },
     
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
  },
 
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'UserName',
    dataIndex: 'userName',
    key: 'userName',
  },
  
  

    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    
    {
      title: 'Action',
      dataIndex: 'action',
        render: (text:any, record:any) => {
          return (
            <Button
              onClick={(event) => {
                event.stopPropagation();
                onEditUser(record);
              }}
              type="link"
              className="edit-btn flex items-center justify-left"
            >
              <Icon icon="ant-design:edit-outlined" fontSize={30} color="grey" />
            </Button>
          );
        },
  },
  ];
}