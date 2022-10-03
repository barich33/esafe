import React from 'react'

const MemberDetails=(memberDetail)=> { 
  console.log(memberDetail); 
  return (
    <>  

    <section className="bg-white">
      
  <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 sm:py-10">
    <div className="max-w-xl mx-auto text-center">
      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-blue-600">
      {memberDetail?.member?.name}
      </h2>

      <p className="max-w-lg mx-auto mt-4 text-gring-offset-warm-gray-500">
       {memberDetail?.member?.vision}
       
      </p>
    </div>

    <div
      className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3 sm:gap-16"
    >
      <div>      

      <blockquote
          className="flex flex-col justify-between p-0 -mt-12 text-center rounded-lg shadow-xl"
        >
          <p className="text-lg font-bold text-gray-700">Contact details</p>
          <p className='flex gap-0.5 justify-center mt-0 text-green-500'>          
         
          <table className="mt-6 -mb-2 w-full text-gray-600">
         <tr className='text-gray-500'>
               <td className="text-gray-500">ContactName:</td>
               <td>{memberDetail?.member?.contactPerson}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Phone:</td>
               <td>{memberDetail?.member?.phoneNumber}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Email:</td>
               <td>{memberDetail?.member?.email}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Location:</td>
               <td>{memberDetail?.member?.town+','+ memberDetail?.member.region?.name}</td>
            </tr>
           </table>
          </p>
        </blockquote>
      </div>

      <div>
       

        <blockquote
          className="flex flex-col justify-between p-3 -mt-12 text-center rounded-lg shadow-xl"
        >
          <p className="text-lg font-bold text-gray-700">Key Facts</p>         
          <p className='flex gap-0.5 justify-center mt-0 text-green-500'>  
          <table className="text-sm text-left">
            <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Year of establishment::</td>
               <td>{memberDetail?.member?.yearOfEstablishment}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Land area:</td>
               <td>{memberDetail?.member?.landArea}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Main Seed Crops:</td>
               <td>{memberDetail?.member?.cropVarietyPortfolios?.map(m => m.cropType?.name).join(',')}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Volume (quintals):</td>
               <td>{memberDetail?.member?.volume}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">GPS position::</td>
               <td>{memberDetail?.member?.gpsposition}</td>
            </tr>
           </table>
          </p>

        </blockquote>
      </div>

      <div>
       

      <blockquote
          className="flex flex-col justify-between p-0 -mt-12 text-center rounded-lg shadow-xl"
        >
          <p className="text-lg font-bold text-gray-700">Structure and Size of company</p>         
          <p className='flex gap-0.5 justify-center mt-0 text-green-500'>  
          <table className="text-sm text-left">
            <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Board members: </td>
               <td>{memberDetail?.member?.boardMembers}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Manager:</td>
               <td>{memberDetail?.member?.manager}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Technical staff: </td>
               <td>{memberDetail?.member?.technicalStaff}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Administrative staff:</td>
               <td>{memberDetail?.member?.administrativeStaff}</td>
            </tr>
       
           </table>
          </p>

        </blockquote>
      </div>

      <div>
      <blockquote
          className="flex flex-col justify-between p-0 -mt-12 text-center rounded-lg shadow-xl "
        >
          <p className="text-lg font-bold text-blue-600">Agro-ecology and climate</p>         
          <p className='flex gap-0.5 justify-center mt-0 text-green-500'>  
          <table className="text-sm text-left">
            <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Altitude: </td>
               <td>{memberDetail?.member?.altitude}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Rainfall:</td>
               <td>{memberDetail?.member?.rainfall}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Temperature: </td>
               <td>{memberDetail?.member?.temperature}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Irrigation potential:</td>
               <td>{memberDetail?.member?.irrigationPotential}</td>
            </tr>
            <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Soil type and pH:</td>
               <td>{memberDetail?.member?.soltype?.name + ',' + memberDetail?.member?.ph}</td>
            </tr>
       
           </table>
          </p>

        </blockquote>
      </div>

      <div>
      <blockquote
          className="flex flex-col justify-between p-0 -mt-12 text-center rounded-lg shadow-xl"
        >
          <p className="text-lg font-bold text-gray-700">Crop and variety portfolio</p>         
          <p className='flex gap-0.5 justify-center mt-0 text-green-500'>  
          <table className="text-sm text-left">
            {memberDetail?.member?.cropVarietyPortfolios.map((crop: any, index) =>(
                 <tr className='text-gray-500' key={index}>
                      <td className="mt-1 text-xs font-medium text-gray-500">{crop?.cropType?.name}</td>
                      <td>{crop?.variety?.name}</td>
                   </tr>              
               
                  ))}
            
       
           </table>
          </p>

        </blockquote>
      </div>

      <div>
      <blockquote
          className="flex flex-col justify-between p-0 -mt-12 text-center rounded-lg shadow-xl"
        >
          <p className="text-lg font-bold text-gray-700">Suppliers and Customers</p>         
          <p className='flex gap-0.5 justify-center mt-0 text-green-500'>  
          <table className="text-sm text-left">
            <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Basic Seed Suppliers: </td>
               <td>{memberDetail?.member?.orgBasicSeedSupplierOrganizations?.map(m => m.organization?.name).join(',')}</td>
            </tr>
         <tr className='text-gray-500'>
               <td className="mt-1 text-xs font-medium text-gray-500">Customers :</td>
               <td>{memberDetail?.member?.customerToOrganizations?.map(m => m.customer?.name).join(',')}</td>
            </tr>      
       
           </table>
          </p>

        </blockquote>
      </div>
    </div>
  </div>
    </section>

    </>
  )
}

export default MemberDetails