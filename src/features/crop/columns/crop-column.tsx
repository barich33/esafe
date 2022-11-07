import { Icon } from '@iconify/react';
import { Button } from 'antd';
// Sample Columns data

export const columns=(onEditcrop)=>{

  return [
    {
      title: '#',
      dataIndex: 'cropId',
    },
      {
          title: 'Plant',
          dataIndex: 'cropType',
          key: 'cropTypeId',
          render: (cropType, record, index) => {
            return cropType?.name;
          },
      },
      
  {
    title: 'Variety',
    dataIndex: 'variety',
    key: 'varietyId',
    render:(variety,record,index)=>{
   return variety?.name;
    },
  },
      {
        title: 'Release Year',
        dataIndex: 'releaseYear',
        key: 'releaseYear',
    },
    {
      title: 'Source of BRS',
      dataIndex: 'cropSourceOfBreederSeeds',
      key: 'cropSourceOfBreederSeedId',
      render: (organization, record, index) => {
        return organization?.map(m => m.organization?.name).join(' | ')
      },
  },
  {
    title: 'Maturity Period',
    dataIndex: 'maturityGroup',
    render: (maturityGroup, record, index) => {
      return maturityGroup?.name
    },
  },
 
  {
    title: 'Climate Zone',
    dataIndex: 'highland',
    key: 'highlandId',
    render:(highland,record,index)=>{
      return highland?.name;
       },
  },
        
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record, index) => {
        return (
          <Button
            onClick={() => onEditcrop(record)}
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