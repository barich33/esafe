import React from "react";
import { Col, Divider, PageHeader, Row, Typography } from "antd";

const style: React.CSSProperties = { background: "", padding: "8px 0" };

const Tiles = (props) => {
  return (
    <div className={"mt-4"}>
      <div
        style={{ height: "auto" }}
        className={
          "flex flex-col w-full bg-white border-2 border-blue-200 rounded-lg p-8 shadow-lg hover:border-green-600 active:border-green-700"
        }
      >
        <div className={"flex justify-between w-full"}>
          <div>
            <div className={"font-bold text-lg"}>{props.title}</div>
            <div>{props.subtitle}</div>
          </div>
        </div>
        {/*Content*/}
        <div>{props.children}</div>
      </div>
    </div>
  );
};

const MemberDetails = (memberDetail) => {
const {Title}=Typography;
  return ( 
      <div className={"flex flex-col"}>
         <Divider orientation="left" style={{margin:'2px'}}>
              {" "}
              <h5 className="text-xl font-bold" style={{color:'#4bc714'}}>
               {memberDetail?.member.name}
              </h5>
            </Divider>
           <Title style={{fontWeight: 'bold'}} level={5}>Vision</Title>
          <p>{memberDetail?.member?.vision}</p>        

        {/*Tiles*/}
        <div className={"mt-0 p-0"}>
          <div className={"grid grid-cols-1 gap-4 md:grid-cols-5"}>
            <div className={"col-span-2"}>
              <Tiles
                title={"Contact details"}
                children={
                  <table className="mt-6 -mb-2 w-full text-gray-600" style={{border:'ipx'}}>
                    <tr className="text-gray-500">
                      <td className="text-gray-500">ContactName:</td>
                      <td>{memberDetail?.member?.contactPerson}</td>
                    </tr>
                    <tr className="text-gray-500">
                      <td className="mt-1 text-xs font-medium text-gray-500">
                        Phone:
                      </td>
                      <td>{memberDetail?.member?.phoneNumber}</td>
                    </tr>
                    <tr className="text-gray-500">
                      <td className="mt-1 text-xs font-medium text-gray-500">
                        Email:
                      </td>
                      <td>{memberDetail?.member?.email}</td>
                    </tr>
                    <tr className="text-gray-500">
                      <td className="mt-1 text-xs font-medium text-gray-500">
                        Location:
                      </td>
                      <td>
                        {memberDetail?.member?.town +
                          "," +
                          memberDetail?.member.region?.name}
                      </td>
                    </tr>
                  </table>
                }
              />
            </div>
            <div className={"col-span-2"}>
              <Tiles title={"Key Facts"} children={
                    <table className="mt-6 -mb-2 w-full text-gray-600">
                 <tr className="text-gray-500">
                   <td className="mt-1 text-xs font-medium text-gray-500">
                     Year of establishment::
                   </td>
                   <td>{memberDetail?.member?.yearOfEstablishment}</td>
                 </tr>
                 <tr className="text-gray-500">
                   <td className="mt-1 text-xs font-medium text-gray-500">
                     Land area:
                   </td>
                   <td>{memberDetail?.member?.landArea}</td>
                 </tr>
                 <tr className="text-gray-500">
                   <td className="mt-1 text-xs font-medium text-gray-500">
                     Main Seed Crops:
                   </td>
                   <td>
                     {memberDetail?.member?.cropVarietyPortfolios
                       ?.map((m) => m.cropType?.name)
                       .join(",")}
                   </td>
                 </tr>
                 <tr className="text-gray-500">
                   <td className="mt-1 text-xs font-medium text-gray-500">
                     Volume (quintals):
                   </td>
                   <td>{memberDetail?.member?.volume}</td>
                 </tr>
                 <tr className="text-gray-500">
                   <td className="mt-1 text-xs font-medium text-gray-500">
                     GPS position::
                   </td>
                   <td>{memberDetail?.member?.gpsposition}</td>
                 </tr>
               </table>
              } />
            </div>
            <div className={"col-span-2"}>
              <Tiles title={"Structure and Size of company"}  children={
                    <table className="text-sm text-left">
                    <tr className="text-gray-500">
                      <td className="mt-1 text-xs font-medium text-gray-500">
                        Board members:{" "}
                      </td>
                      <td>{memberDetail?.member?.boardMembers}</td>
                    </tr>
                    <tr className="text-gray-500">
                      <td className="mt-1 text-xs font-medium text-gray-500">
                        Manager:
                      </td>
                      <td>{memberDetail?.member?.manager}</td>
                    </tr>
                    <tr className="text-gray-500">
                      <td className="mt-1 text-xs font-medium text-gray-500">
                        Technical staff:{" "}
                      </td>
                      <td>{memberDetail?.member?.technicalStaff}</td>
                    </tr>
                    <tr className="text-gray-500">
                      <td className="mt-1 text-xs font-medium text-gray-500">
                        Administrative staff:
                      </td>
                      <td>{memberDetail?.member?.administrativeStaff}</td>
                    </tr>
                  </table>
              }/>
            </div>
            <div className={"col-span-2"}>
              <Tiles title={"Agro-ecology and climate"} children={
                 <table className="text-sm text-left">
                 <tr className="text-gray-500">
                   <td className="mt-1 text-xs font-medium text-gray-500">
                     Altitude:{" "}
                   </td>
                   <td>{memberDetail?.member?.altitude}</td>
                 </tr>
                 <tr className="text-gray-500">
                   <td className="mt-1 text-xs font-medium text-gray-500">
                     Rainfall:
                   </td>
                   <td>{memberDetail?.member?.rainfall}</td>
                 </tr>
                 <tr className="text-gray-500">
                   <td className="mt-1 text-xs font-medium text-gray-500">
                     Temperature:{" "}
                   </td>
                   <td>{memberDetail?.member?.temperature}</td>
                 </tr>
                 <tr className="text-gray-500">
                   <td className="mt-1 text-xs font-medium text-gray-500">
                     Irrigation potential:
                   </td>
                   <td>{memberDetail?.member?.irrigationPotential}</td>
                 </tr>
                 <tr className="text-gray-500">
                   <td className="mt-1 text-xs font-medium text-gray-500">
                     Soil type and pH:
                   </td>
                   <td>
                     {memberDetail?.member?.soltype?.name +
                       "," +
                       memberDetail?.member?.ph}
                   </td>
                 </tr>
               </table>
              }/>
            </div>
            <div className={"col-span-2"}>
              <Tiles title={"Crop and variety portfolio"} children={
                  <table className="text-sm text-left">
                  {memberDetail?.member?.cropVarietyPortfolios.map(
                    (crop: any, index) => (
                      <tr className="text-gray-500" key={index}>
                        <td className="mt-1 text-xs font-medium text-gray-500">
                          {crop?.cropType?.name}
                        </td>
                        <td>{crop?.variety?.name}</td>
                      </tr>
                    )
                  )}
                </table>
              } />
            </div>
            <div className={"col-span-2"}>
              <Tiles title={"Suppliers and Customers"} children={  <table className="text-sm text-left">
                    <tr className="text-gray-500">
                      <td className="mt-1 text-xs font-medium text-gray-500">
                        Basic Seed Suppliers:{" "}
                      </td>
                      <td>
                        {memberDetail?.member?.orgBasicSeedSupplierOrganizations
                          ?.map((m) => m.organization?.name)
                          .join(",")}
                      </td>
                    </tr>
                    <tr className="text-gray-500">
                      <td className="mt-1 text-xs font-medium text-gray-500">
                        Customers :
                      </td>
                      <td>
                        {memberDetail?.member?.customerToOrganizations
                          ?.map((m) => m.customer?.name)
                          .join(",")}
                      </td>
                    </tr>
                  </table>} />
            </div>
          </div>
        </div>
      </div>
 
  );
};

export default MemberDetails;
