import { Col, Divider, Empty, PageHeader, Row } from "antd";
import React from "react";
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

const MarketingDetail = ({ crops }) => {
  //const cropsLength=crops?.crops.length
  console.log("cropssss",crops);
  return (
    <>
      {(crops?.length===0 || crops?.crops.length===0) &&
      <>
        <Empty/>
        </>
      }
      {crops.crops?.map((crop, index) => (
            <div className={'flex flex-col'}>
          <div className={"mt-0 p-0"}>
            <Divider orientation="left" style={{margin:'2px'}}>
              {" "}
              <h5 className="text-xl font-bold" style={{color:'#4bc714'}}>
                Crop: {crop?.cropType.name}
              </h5>
            </Divider>
            <div className={"grid grid-cols-1 gap-4 md:grid-cols-5"}>
              <div className={"col-span-2"}>
                <Tiles
                  title={"Crop Variety and Release Year"}
                  children={
                    <table className="text-sm text-left">
                    <tr className="text-gray-500">
                      <td className="text-sm font-bold"> Variety:</td>
                      <td className="text-xs text-indigo-500">
                       {crop?.variety?.name}
                      </td>
                    </tr>
                    <tr className="text-gray-500 text-xl">
                      <td className="text-sm font-bold">Release Year:</td>
                      <td className="text-xs text-indigo-500">
                      {crop?.releaseYear}
                      </td>
                    </tr>                
                  </table>
                  }
                />{" "}
              </div>
              <div className={"col-span-2"}>
                <Tiles
                  title={"Source of Organizations"}
                  children={
                    <table className="text-sm text-left">
                      <tr className="text-gray-500">
                        <td className="text-sm font-bold"> Breeder Seeds:</td>
                        <td className="text-xs text-indigo-500">
                          {crop?.cropSourceOfBasicSeeds
                            .map((m) => m.organization?.name)
                            .join(",")}
                        </td>
                      </tr>
                      <tr className="text-gray-500 text-xl">
                        <td className="text-sm font-bold">Basic Seeds:</td>
                        <td className="text-xs text-indigo-500">
                          {" "}
                          {crop?.cropSourceOfBasicSeeds
                            .map((m) => m.organization?.name)
                            .join(",")}
                        </td>
                      </tr>
                      <tr className="text-gray-500">
                        <td className="text-sm font-bold">Pre-Basic Seeds:</td>
                        <td className="text-xs text-indigo-500">
                          {" "}
                          {crop?.cropSourceOfPreBasicSeeds
                            .map((m) => m.organization?.name)
                            .join(",")}
                        </td>
                      </tr>
                      <tr className="text-gray-500">
                        <td className="text-sm font-bold">Certified Seeds:</td>
                        <td className="text-xs text-indigo-500">
                          {" "}
                          {crop?.cropSourceOfCertifiedSeeds
                            .map((m) => m.organization?.name)
                            .join(",")}
                        </td>
                      </tr>
                    </table>
                  }
                />
              </div>

              <div className={"col-span-2"}>
                <Tiles
                  title={"Other Information"}
                  children={
                    <>----</>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ))}      
    </>
  );
};

export default MarketingDetail;
