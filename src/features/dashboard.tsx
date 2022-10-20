import React from "react";
import PCLogo from '../features/icons/pc_logo.png';
const Dashboard = ({message = ''}) => {
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
                     
                        <div>
                            <h5 className="text-xl text-gray-600 text-center">xx</h5>
                           
                           
                        </div>
                       
                    </div>
                </div>
                <div className="md:col-span-2 lg:col-span-1" >
                    <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                     
                        <div>
                            <h5 className="text-xl text-gray-600 text-center">xx</h5>
                           
                           
                        </div>
                       
                    </div>
                </div>
                <div className="md:col-span-2 lg:col-span-1" >
                    <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                     
                        <div>
                            <h5 className="text-xl text-gray-600 text-center">xx</h5>
                           
                           
                        </div>
                       
                    </div>
                </div>
                <div className="md:col-span-2 lg:col-span-1" >
                    <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                     
                        <div>
                            <h5 className="text-xl text-gray-600 text-center">xx</h5>
                           
                           
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