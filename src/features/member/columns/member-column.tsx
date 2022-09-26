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

    const actionMenu = (record) => {
      return  <Menu mode='horizontal'>
        <Menu.Item key="0" className={'border-b'}>
          <Button type="text" className={'font-bold'}
                  onClick={(event) => {event.stopPropagation(); OnEditMember(record);}}
          >Edit</Button>
        </Menu.Item>
        <Menu.Item key="1" className={'border-b'}>
          <Button type="text" className={'font-bold text-left p-0 w-full'}
                  onClick={(event) => {event.stopPropagation(); OnEditSeedBusiness(record);}}
          >Business Crops</Button>
        </Menu.Item>
      </Menu>
    };

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
        title: 'Region',
        dataIndex: 'region',
        render: (region, record, index) => {
          return region?.name
        },
    },
    /* {
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
}, */
    
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <Dropdown overlay={actionMenu(record)} >
            <EllipsisOutlined rotate={90}/>
          </Dropdown>
        );
      },
  },
  
  ];
}