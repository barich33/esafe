import { Icon } from '@iconify/react';
import { Button, Checkbox } from 'antd';
// Sample Columns data
export const columns=(onEditPage)=>{

  const parentCk=(isParent:boolean)=>{
    return(
      <Checkbox checked={isParent}></Checkbox>
    )
  }
  return [
    
    {
      title: 'Page',
      dataIndex: 'name',
      key: 'name',
  },
 
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Route',
    dataIndex: 'route',
    key: 'route',
  },

  {
    title: 'Parent',
    dataIndex: 'isParent',
    key: 'isParent',
    render: (isParent, record, index) => {
      return(
        <Checkbox checked={isParent} disabled></Checkbox>
      )
    },
  },
  
    {
      title: 'Action',
      dataIndex: 'action',
        render: (text:any, record:any) => {
          return (
            <Button
              onClick={(event) => {
                event.stopPropagation();
                onEditPage(record);
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