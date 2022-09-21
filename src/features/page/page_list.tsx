import { useEffect, useState } from 'react';
import PageLoading from './page_loading';
import { httpService } from '../../service/http.service';
import { pageEndPoint} from '../../api/primecareApi.endpoint';
import { Button, Input, Menu, notification, Table } from 'antd';
import { Icon } from '@iconify/react';
import ManagePageDialog from './manage-page/manage-page-dialog';
import { columns } from './columns/page-column';

   const PageList=()=>{
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(10);
  const [current, setCurrent] = useState(1);
  const [showPageModal,setShowPageModal] = useState(false)

  const [modalConfig,setModalConfig] = useState({
    title:'Add New Page',
    data:{}
  })
  useEffect(() => {
    getPageList();
    setLoading(false)
  }, []);

  
  const getPageList = () => {
    httpService
      .get(`${pageEndPoint.getPages}`)
      .then((response) => {
        console.log(response.data);
        setPages(response.data?.pages?.filter(x=>x.isParent===true));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setPages([]);
        console.error(error);
      });
};

const onShowPageModal =()=>{
  setModalConfig({ title: 'Add New Page', data: {} });
  setShowPageModal(true)
 
}

const handlePageModalOk =()=>{
  setShowPageModal(false);
  getPageList();
}

const handlePageModalCancel =()=>{
  setShowPageModal(false)

}

 const OnEditPage = (data)=>{

  setShowPageModal(true);
  setModalConfig({
    title:'Edit Page',
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
           onClick={onShowPageModal}
          >
            Add
          </Button>
        </div>
           <Table size='small'
             className="mt-1 w-full cursor-pointer"
           dataSource={pages} 
           columns={ columns(OnEditPage)}
        

           rowKey={'pageId'}
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
      {showPageModal&&
       <ManagePageDialog
         modalConfig={modalConfig}
         isModalVisible={showPageModal}
         onOk={handlePageModalOk}
         onCancel={handlePageModalCancel}
        />
      }
       </div>
    )
      }
    else{
      return <PageLoading />;
    }
}
export default PageList