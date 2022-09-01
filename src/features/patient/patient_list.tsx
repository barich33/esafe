import { useEffect, useState } from 'react';
import PatientLoading from './patient_loading';
import { httpService } from '../../service/http.service';
import { patientEndPoint} from '../../api/primecareApi.endpoint';
import { Button, Input, Menu, notification, Table } from 'antd';
import { Icon } from '@iconify/react';
import ManagePatientDialog from './manage-patient/manage-patient-dialog';
import { columns } from './columns/patient-column';
import  "../admin.css";
   const PatientList=()=>{
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(10);
  const [current, setCurrent] = useState(1);
  const [showPatientModal,setShowPatientModal] = useState(false)

  const [modalConfig,setModalConfig] = useState({
    title:'Add New Patient',
    data:{}
  })
  useEffect(() => {
    getUserList();
   // setLoading(false)
  }, []);

  
  const getUserList = () => {
    httpService
      .get(`${patientEndPoint.getPatients}?page=${1}&size=100`)
      .then((response) => {
        console.log(response.data);
        setPatients(response.data.patients);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setPatients([]);
        console.error(error);
      });
};

const onShowPatientModal =()=>{
  setModalConfig({ title: 'Add New Patient', data: {} });
  setShowPatientModal(true)
 
}

const onModalOk =()=>{
  setShowPatientModal(false)
}

const onModalCancel =()=>{
  setShowPatientModal(false)

}

 const OnEditPatient = (data)=>{

  setShowPatientModal(true);
  setModalConfig({
    title:'Edit Patient',
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
           onClick={onShowPatientModal}
          >
            Add
          </Button>
        </div>
           <Table
             className="mt-1 w-full cursor-pointer"
           dataSource={patients} 
           columns={ columns(OnEditPatient)}
        
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
      {showPatientModal&&
       <ManagePatientDialog
         modalConfig={modalConfig}
         isModalVisible={showPatientModal}
         onOk={onModalOk}
         onCancel={onModalCancel}
        />
      }
       </div>
    )
      }
    else{
      return <PatientLoading />;
    }
}
export default PatientList