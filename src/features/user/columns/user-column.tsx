import { Icon } from '@iconify/react';
import { Button } from 'antd';
// Sample Columns data
export const columns=(onEditUser,OnEditUserRoles,OnResetPassword)=>{
  return [
    {
      title: '#',
      dataIndex: 'userId',
    },
     
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'      
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
      title: 'Organization',
      dataIndex: 'organization',
      render: (organization, record, index) => {
        return ((organization?.name))
      },   
    },   
    {
      title: 'User Roles',
      dataIndex: 'userRoles',
      render: (userRoles, record, index) => {
        return ((userRoles.map(m => m.role?.name).join(' | ')))
      }, 
    },
    {
      title: 'Action',
      dataIndex: 'action',
        render: (text:any, record:any) => {
          return (
            <>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                onEditUser(record);
              }}
              type="link"
              size='small'
              className="edit-btn flex items-center justify-left"
            >
             Edit
            </Button>

            <Button
              onClick={(event) => {
                event.stopPropagation();
                OnEditUserRoles(record);
              }}
              type="link"
              className="edit-btn flex items-center justify-left"
            >
            Roles
            </Button>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                OnResetPassword(record);
              }}
              type="link"
              className="edit-btn flex items-center justify-left"
            >
            Reset Password
            </Button>
            
            </>
          );
        },
  },
  ];
}