import { useEffect, useState } from 'react';
import { Button, Input, Menu, notification, PageHeader, Table } from 'antd';
import { Icon } from '@iconify/react';
import { httpService } from '../../../../../service/http.service';
import { memberEndPoint } from '../../../../../api/primecareApi.endpoint';
import { MarketingColumns } from './columns';
import Marketingloading from '../marketing_loading';
import MarketingDetail from '../marketingDetail';

   const MarketingList=({data})=>{
    const [marketingData, setMarketingData] = useState<any[]>([]);
  const [searchFilterDataHolder, setSearchFilterDataHolder] = useState([]);
  const [rowToUpdate, setRowToUpdate] = useState(false);
  const [updatedIndex, setUpdatedIndex] = useState(-1);
  const [page, setPage] = useState(10);
  const [current, setCurrent] = useState(1);  
  const [isViewCropModalVisible,setIsViewCropModalVisible] = useState(false)
  const [modalConfig,setModalConfig] = useState({
    title:'Crop Details',
    data:{}
  })
  useEffect(()=>{
      setMarketingData(data);
      console.log("data",data);
  },[data])

  const onViewCrop = (data)=>{

    setIsViewCropModalVisible(true);
    setModalConfig({
      title:'Crop Details',
      data:data
    })
   }
   const onModalCancel =()=>{
   setIsViewCropModalVisible(false);  
  }

return (
        
        <div className="pt-3 pb-3 pl-3">
             <div className="bg-white" style={{ height: '90vh' }}>
           <div className="flex justify-between items-center mb-5">              
        
        </div>
           <Table size='small'
           className="mt-1 w-full cursor-pointer"
           dataSource={marketingData} 
           columns={ MarketingColumns(         
            onViewCrop,
            rowToUpdate,
            updatedIndex,
            current,
            page
           )}        
        
           rowKey={'Id'}
           bordered
           pagination={{
            pageSize: page,
            current: current,
            onChange(newPage, newPageSize) {
              setPage(newPageSize);
              setCurrent(page !== newPageSize ? 1 : newPage);
            },
            position: ['bottomLeft'],
            style: {
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            },
          }}
          />
       </div>
     
              
       {isViewCropModalVisible&&
      
      <MarketingDetail
        modalConfig={modalConfig}
        isModalVisible={isViewCropModalVisible}      
        onCancel={onModalCancel}
       />
     }
       </div>

    )      
}
export default MarketingList