import { useEffect, useState } from 'react';
import CropLoading from './crop_loading';
import { httpService } from '../../service/http.service';
import { cropEndPoint} from '../../api/primecareApi.endpoint';
import { Button, Input, Menu, notification, Table } from 'antd';
import { Icon } from '@iconify/react';
import ManageCropModal from './manage-crop/manage-crop-modal';
import { columns } from './columns/crop-column';
import  "../admin.css";
import Croploading from './crop_loading';
export interface ParamTypes {
  crops: any;
}
   const CropList=()=>{
  const [crops, setCrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(10);
  const [current, setCurrent] = useState(1);
  const [isCropModalVisible,setIsCropModalVisible] = useState(false)
  const [searchValue, setSearchValue] = useState();
  const [searchFilterDataHolder, setSearchFilterDataHolder] = useState([]);

  const [modalConfig,setModalConfig] = useState({
    title:'Add New Crop',
    data:{}
  })
  useEffect(() => {
    getCropList();
   // setLoading(false)
  }, []);

  
  const getCropList = () => {
    httpService
      .get(`${cropEndPoint.getCrops}?page=${1}&size=100`)
      .then((response) => {
        console.log(response.data);
        const crops=response.data?.crops;
        setCrops(crops);
        setSearchFilterDataHolder(crops);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setCrops([]);
        setSearchFilterDataHolder([]);
        console.error(error);
      });
};

const onShowCropModal =()=>{
  setModalConfig({ title: 'Add New Crop', data: {} });
  setIsCropModalVisible(true)
 
}

const handleCropModalOk =()=>{
  setIsCropModalVisible(false)
  getCropList();
}

const onModalCancel =()=>{
  setIsCropModalVisible(false)

}

 const OnEditCrop = (data)=>{

  setIsCropModalVisible(true);
  setModalConfig({
    title:'Edit Crop',
    data:data
  })
 }

 const clearSearch = (event) => {
  setCrops(searchFilterDataHolder);
  event.target.value = '';
};
 
 const onCropSearch = (value) => {
  value !== ''?setCropSearch(value):setCrops(searchFilterDataHolder);

};

const setCropSearch =(value)=>{
  const filteredCrops = crops.filter((crop)=>
    crop.releaseYear?.toLowerCase().includes(value.toLowerCase())
   /*  user.LastName?.toLowerCase().includes(value.toLowerCase())||
    user.Email?.toLowerCase().includes(value.toLowerCase())||
    user.PhoneNumber?.includes(value.toLowerCase() */
    )
  setCrops(filteredCrops);
}

if (!loading) {
return (

  <div className="pt-3 pb-3 pl-3">
  <div className="bg-white" style={{ height: '90vh' }}>
           <div className="flex justify-between items-center mb-5">
          <div className="flex items-center justify-center">
            <Input
                  value={searchValue}
                  onChange={(event) => {
                    onCropSearch(event.target.value);
                    setCropSearch(event.target.value)
                  }}
                  placeholder="Search crops"
                  suffix={<Icon icon="ci:search-small" fontSize={22}/>}
            />
          </div>
          <Button
            id="submit"
            type="primary"
            htmlType="submit"
            className="app-btn-container-btn pl-10 pr-10"
           onClick={onShowCropModal}
          >
            Add
          </Button>
        </div>
           <Table size='small'
             className="mt-1 w-full cursor-pointer"
           dataSource={crops} 
           columns={ columns(OnEditCrop)}        
           rowKey={'cropId'}
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
      {isCropModalVisible&&
       <ManageCropModal
         modalConfig={modalConfig}
         isModalVisible={isCropModalVisible}
         onOk={handleCropModalOk}
         onCancel={onModalCancel}
        />
      }
       </div>
    )
      }
    else{
      return <Croploading />;
    }
}
export default CropList