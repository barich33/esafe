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
   const CropList=()=>{
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(10);
  const [current, setCurrent] = useState(1);
  const [showCropModal,setShowCropModal] = useState(false)

  const [modalConfig,setModalConfig] = useState({
    title:'Add New Crop',
    data:{}
  })
  useEffect(() => {
    getUserList();
   // setLoading(false)
  }, []);

  
  const getUserList = () => {
    httpService
      .get(`${cropEndPoint.getCrops}?page=${1}&size=100`)
      .then((response) => {
        console.log(response.data);
        setCrops(response.data.crops);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setCrops([]);
        console.error(error);
      });
};

const onShowCropModal =()=>{
  setModalConfig({ title: 'Add New Crop', data: {} });
  setShowCropModal(true)
 
}

const onModalOk =()=>{
  setShowCropModal(false)
}

const onModalCancel =()=>{
  setShowCropModal(false)

}

 const OnEditCrop = (data)=>{

  setShowCropModal(true);
  setModalConfig({
    title:'Edit Crop',
    data:data
  })
 }

if (!loading) {
return (

  <div className="pt-3 pb-3 pl-3">
  <div className="bg-white" style={{ height: '90vh' }}>
           <div className="flex justify-between items-center mb-5">
          <div className="flex items-center justify-center">
            <Input
              // onChange={onBrandSearch}
              // onKeyDown={clearSearch}
              placeholder="Search"
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
           <Table
             className="mt-1 w-full cursor-pointer"
           dataSource={crops} 
           columns={ columns(OnEditCrop)}
        
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
      {showCropModal&&
       <ManageCropModal
         modalConfig={modalConfig}
         isModalVisible={showCropModal}
         onOk={onModalOk}
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