import { useEffect, useState } from 'react';
import UserLoading from './user_loading';
import { httpService } from '../../service/http.service';
import { userEndPoint} from '../../api/primecareApi.endpoint';
import { Button, Input, Menu, notification, Table } from 'antd';
import { Icon } from '@iconify/react';
import ManageUserDialog from './manage-user/manage-user-dialog';
import { columns } from './columns/user-column';
import ManageUserRoleDialog from './manage-user/manage-user-role/manage-user-role-dialog';
import ManageResetPasswordDialog from './manage-user/reset-password';

   const UserList=()=>{
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(10);
  const [current, setCurrent] = useState(1);

  const [showUserRoleModal,setShowUserRoleModal] = useState(false);
  const [showUserModal,setShowUserModal] = useState(false)
  const [userRoleModalConfig,setUserRoleModalConfig] = useState({
    title:'Add New User',
    data:{}
  })
  const [modalConfig,setModalConfig] = useState({
    title:'Add New User',
    data:{}
  })
  const [showResetPassword,setShowResetPasswordModal] = useState(false);

  useEffect(() => {
    getUserList();
    setLoading(false)
  }, []);

  const [resetPasswordModalConfig,setResetPasswordModalConfig] = useState({
    title:'Add New User',
    data:{}
  })
  
  const getUserList = () => {
    httpService
      .get(`${userEndPoint.getUsers}?page=${1}&size=2000000`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setUsers([]);
        console.error(error);
      });
};

const onShowUserModal =()=>{
  setModalConfig({ title: 'Add New User', data: {} });
  setShowUserModal(true)
 
}

const onModalOk =()=>{
  setShowUserModal(false)
  getUserList();
}

const onModalCancel =()=>{
  setShowUserModal(false)

}

const onUserRoleModalOk =()=>{
  setShowUserRoleModal(false)
  getUserList();
}

const onUserRoleModalCancel =()=>{
  setShowUserRoleModal(false)
}


 const OnEditUser = (data)=>{

  setShowUserModal(true);
  setModalConfig({
    title:'Edit User',
    data:data
  })
 }

 const OnEditUserRoles = (data)=>{

  setShowUserRoleModal(true);
  setUserRoleModalConfig({
    title:'Edit User Role',
    data:data
  })
 }

 const OnResetPassword = (data)=>{

  setShowResetPasswordModal(true);
  setResetPasswordModalConfig({
    title:'Reset Password',
    data:data
  })
 }
 const onResetPasswordModalCancel =()=>{
  setShowResetPasswordModal(false)
}

const onResetPasswordModalOk =()=>{
  setShowResetPasswordModal(false)
  getUserList();
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
           onClick={onShowUserModal}
          >
            Add
          </Button>
        </div>
           <Table size='small'
             className="mt-1 w-full cursor-pointer"
           dataSource={users} 
           columns={ columns(OnEditUser,OnEditUserRoles,OnResetPassword)}
        
           rowKey={'userId'}
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
      {showUserModal&&
       <ManageUserDialog
         modalConfig={modalConfig}
         isModalVisible={showUserModal}
         onOk={onModalOk}
         onCancel={onModalCancel}
        />
      }
      {showUserRoleModal&&
       <ManageUserRoleDialog
         modalConfig={userRoleModalConfig}
         isModalVisible={showUserRoleModal}
         onOk={onUserRoleModalOk}
         onCancel={onUserRoleModalCancel}
        />
      }

          {showResetPassword&&
       <ManageResetPasswordDialog
         modalConfig={resetPasswordModalConfig}
         isModalVisible={showResetPassword}
         onOk={onUserRoleModalOk}
         onCancel={onResetPasswordModalCancel}
        />
      }

       </div>
    )
      }
    else{
      return <UserLoading />;
    }
}
export default UserList