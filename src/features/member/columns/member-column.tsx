import { EllipsisOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Button, Dropdown, Menu } from 'antd';
// Sample Columns data

export const columns=(
  OnEditMember,
  OnEditSeedBusiness,
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
    title:'Code',
    dataIndex:'code'
    },
      {
          title: 'Name',
          dataIndex: 'name',
          
      },
      {
        title: 'Member',
        dataIndex: 'isMember',
        render: (isMember, record, index) => {
          return isMember?'yes':'No'
        },
        
    },
      {
        title: 'Location',
        dataIndex: 'region',
        render: (region, record, index) => {
          return ((record?.town===null || record?.town===undefined ? '': record?.town +',')+(region?.name===null || region?.name===undefined?'': region?.name))
        },
    },
     {
      title: 'Contact Person',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber'   
}, 
    
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <Button
            onClick={() => OnEditMember(record)}
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