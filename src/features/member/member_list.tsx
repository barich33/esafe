import { useEffect, useState } from 'react';
import { Button, Input, Menu, notification, PageHeader, Table } from 'antd';
import { Icon } from '@iconify/react';
import ManageMemberModal from './manage-member/manage-member-modal';
import { columns } from './columns/member-column';

import Memberloading from './member_loading';
import ManageSeedBusinessModal from './manage_seed_business/manage_seed_business_modal';
import { httpService } from '../../service/http.service';
import { memberEndPoint } from '../../api/primecareApi.endpoint';
import ManageSeedBusinessForm from './manage_seed_business/manage-seed-business-form';

   const MemberList=()=>{
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isMemberModalVisible,setIsMemberModalVisible] = useState(false)
  const [searchValue, setSearchValue] = useState<any | null>(null);
  const [searchFilterDataHolder, setSearchFilterDataHolder] = useState([]);
  const [rowToUpdate, setRowToUpdate] = useState(false);
  const [updatedIndex, setUpdatedIndex] = useState(-1);
  const [page, setPage] = useState(10);
  const [current, setCurrent] = useState(1);  
  const[isSeedBModalVisible,setIsSeedBModalVisible]=useState(false);
  const [modalConfig,setModalConfig] = useState({
    title:'Add New Member',
    data:{}
  })
  useEffect(() => {
    getMemberList();
   // setLoading(false)
  }, []);

  
  const getMemberList = () => {
    setLoading(true)
    httpService
      .get(`${memberEndPoint.getMembers}`)
      .then((response) => {
        console.log(response.data);
        const members=response.data?.members;
        setMembers(members);
        setSearchFilterDataHolder(members);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setMembers([]);
        setSearchFilterDataHolder([]);
        console.error(error);
      });
};

const onShowMemberModal =()=>{
  setModalConfig({ title: 'Add New Member', data: {} });
  setIsMemberModalVisible(true)
 
}

const handleMemberModalOk =()=>{
  setIsMemberModalVisible(false)
  getMemberList();
}

const onModalCancel =()=>{
  setIsMemberModalVisible(false)

}

 const OnEditMember = (data)=>{

  setIsMemberModalVisible(true);
  setModalConfig({
    title:'Edit Member',
    data:data
  })
 }

 const OnEditSeedBusiness=(data)=>{
  setIsSeedBModalVisible(true);
  setModalConfig({
    title:'Members Seed Business',
    data:data
  })
 }
 
const handleSeedBModalOk =()=>{
  setIsSeedBModalVisible(false)
  getMemberList();
}

const onSeedBModalCancel =()=>{
  setIsSeedBModalVisible(false)

}

 const clearSearch = (event) => {
  setMembers(searchFilterDataHolder);
  event.target.value = '';
};
 
 const onMemberSearch = (value) => {
  value !== ''?setMemberSearch(value):setMembers(searchFilterDataHolder);

};

const setMemberSearch =(value)=>{
  const filteredMembers = members.filter((member)=>
    member.name?.toLowerCase().includes(value.toLowerCase())
   /*  user.LastName?.toLowerCase().includes(value.toLowerCase())||
    user.Email?.toLowerCase().includes(value.toLowerCase())||
    user.PhoneNumber?.includes(value.toLowerCase() */
    )
  setMembers(filteredMembers);
}

const clearAllFilterInput = () => {
  
  setSearchValue(null); 
  onClear();
};

const onClear = () => {
  setMembers(searchFilterDataHolder);
};

if (!loading) {
return (

            <div className="pt-3 pb-3 pl-3">
             <div className="bg-white" style={{ height: '90vh' }}>
           <div className="flex justify-between items-center mb-5">
          <div className="flex items-center justify-center">
            <Input
                  value={searchValue}
                  onChange={(event) => {
                    onMemberSearch(event.target.value);
                    setMemberSearch(event.target.value)
                  }}
                  placeholder="Search Users"
                  suffix={<Icon icon="ci:search-small" fontSize={22}/>}
            />
             <Button type="default" onClick={clearAllFilterInput}>
          Clear
        </Button>
          </div>
         
         <Button
            id="submit"
            type="primary"
            htmlType="submit"
            className="app-btn-container-btn pl-10 pr-10"
           onClick={onShowMemberModal}
          >
            Add
          </Button> 
        </div>
           <Table size='small'
             className="mt-1 w-full cursor-pointer"
           dataSource={members} 
           columns={ columns(           
            OnEditMember,
            OnEditSeedBusiness,
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
       
       
           
             
      {isMemberModalVisible&&
      
       <ManageMemberModal
         modalConfig={modalConfig}
         isModalVisible={isMemberModalVisible}
         onOk={handleMemberModalOk}
         onCancel={onModalCancel}
        />
      }   
       </div>
    )
      }
    else{
      return <Memberloading />;
    }
}
export default MemberList