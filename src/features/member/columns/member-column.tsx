import { Icon } from '@iconify/react';
import { Button } from 'antd';
// Sample Columns data

export const columns=(
  OnEditMember,
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
        title: 'Region',
        dataIndex: 'region',
        render: (region, record, index) => {
          return region?.name
        },
    },
    {
      title: 'Crops',
      dataIndex: 'seedBusinesses',
      key: 'seedBusinesses',
      render: (seedBusiness, record, index) => {
        return seedBusiness?.map(m => m.cropType?.name).join(' | ')
      },
  },
  {
    title: 'Types Of Businesses',
    dataIndex: 'seedBusinesses',
    key: 'seedBusinesses',
    render: (seedBusinesses, record, index) => {
      return seedBusinesses?.map(m => m.typesOfSeedBusinesses?.name).join(' | ')
    },
},
    
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record, index) => {
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