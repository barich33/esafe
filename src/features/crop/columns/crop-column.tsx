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
          title: 'Crop',
          dataIndex: 'cropType',
          key: 'cropTypeId',
          render: (cropType, record, index) => {
            return cropType?.name;
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
    title: 'Variety',
    dataIndex: 'variety',
    key: 'varietyId',
    render:(variety,record,index)=>{
   return variety?.name;
    },
  },
  {
    title: 'Flower Color',
    dataIndex: 'flowerColor',
    key: 'flowerColor',
  },
  {
    title: 'Growth Habits',
    dataIndex: 'growthHabit',
    key: 'growthHabitId',
    render:(growthHabit,record,index)=>{
   return growthHabit?.name;
    },
  },
  {
    title: 'Highland',
    dataIndex: 'highland',
    key: 'highlandId',
    render:(highland,record,index)=>{
      return highland?.name;
       },
  },
  {
        title: 'Soil Type',
        dataIndex: 'soilType',
        key: 'soilTypeId',
        render:(soilType,record,index)=>{
          return soilType?.name;
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
            <Icon icon="ant-design:edit-outlined" fontSize={30} color="grey" />
          </Button>
        );
      },
  },
  ];
}