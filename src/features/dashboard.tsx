import React, { useEffect, useState } from "react";
import { cropEndPoint, memberEndPoint } from "../api/primecareApi.endpoint";
import PCLogo from '../features/icons/pc_logo.png';
import { httpService } from "../service/http.service";
const Dashboard = ({message = ''}) => {

    const [crops, setCrops] = useState<any[]>([]);
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMemberList();
        getCropList();
       // setLoading(false)
      }, []);
    
      
      const getMemberList = () => {
        httpService
          .get(`${memberEndPoint.getMembers}`)
          .then((response) => {
            console.log(response.data);
            const members=response.data?.members.filter(x=>x.isMember===true);
            setMembers(members);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            setMembers([]);
            console.error(error);
          });
    };
    const getCropList = () => {
        httpService
          .get(`${cropEndPoint.getCrops}`)
          .then((response) => {
            console.log(response.data);
            const crops=response.data?.crops;
            setCrops(crops);           
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            setCrops([]);
         
          });
    };
    
  return (
  <>
  
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
            <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                <h5  className="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
                
            </div>
        </div>
    
        <div className="px-6 pt-6 2xl:container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="md:col-span-2 lg:col-span-1" >
                    <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                       Total Crops
                        <div>
                            <h5 className="text-xl text-gray-600 text-center">{crops.length}</h5>
                           
                           
                        </div>
                       
                    </div>
                </div>
                <div className="md:col-span-2 lg:col-span-1" >
                    <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                       Total Members
                        <div>
                            <h5 className="text-xl text-gray-600 text-center">{members.length}</h5>
                           
                           
                        </div>
                       
                    </div>
                </div>
               
              
            </div>
        </div>
    </div> 
    </>
  );
};

export default Dashboard;