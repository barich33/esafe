import { Icon } from '@iconify/react';
import { Button } from 'antd';
// Sample Columns data

export const columns=(onEditPatient)=>{

  return [
    {
      title: '#',
      dataIndex: 'patientId',
    },
      {
          title: 'MRN',
          dataIndex: 'cardNumber',
          key: 'cardNumber',
      },
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
  },
  {
    title: 'Father Name',
    dataIndex: 'middleName',
    key: 'middleName',
  },
  {
    title: 'G.Fathers(Sir) Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Registration Date',
    dataIndex: 'createdDate',
    key: 'createdDate',
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
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
        title: 'Sex',
        dataIndex: 'sex',
        key: 'sex',

    },
    {
      title: 'Mobile Phone',
      dataIndex: 'mobilePhone',
      key: 'mobilePhone',
    },
    {
        title: 'Res.Phone',
        dataIndex: 'residencePhone',
        key: 'residencePhone',
    }
    ,
    {
        title: 'Region',
        dataIndex: 'region',        
        key: 'regionId',
        render: (region, record, index) => {
          return region?.name;
        },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record, index) => {
        return (
          <Button
            onClick={() => onEditPatient(record)}
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