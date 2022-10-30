import { Col, Divider, Empty, Modal, PageHeader, Row } from "antd";
import React, { useEffect, useState } from "react";
import { cropEndPoint } from "../../../../api/primecareApi.endpoint";
import { httpService } from "../../../../service/http.service";
import Marketingloading from "./marketing_loading";
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

const MarketingDetail =  ({ modalConfig, isModalVisible, onCancel }) => {
    console.log("modalConfig",modalConfig);
    const [crop,setCrop]= useState<any>();
    const [isSearching, setIsSearching] = useState(false);
    const [searchparams, setSearchparams] = useState({
      cropTypeId:modalConfig?.data?.cropTypeId,
      varietyId:modalConfig?.data?.varietyId
    });
    useEffect(() => {          
      searchCrops();
    }, [modalConfig]);

    const searchCrops = () => {
     
      setIsSearching(true);     
      httpService
        .post(cropEndPoint.searchCrop, searchparams)
        .then((response) => {         
             console.log(response.data);
          setCrop(response.data?.crop);
          setIsSearching(false);
        })
        .catch((error) => {
          setIsSearching(false);
          setCrop([]);
          console.error(error);
        });
    };
    const handleModalCancel = () => {     
        onCancel();      
    };
    if (!isSearching) {
   return(
      <Modal
      width={1000}
      title={modalConfig.title}
      visible={isModalVisible}
     
      onCancel={handleModalCancel}
      closable={false}
      maskClosable={false}
     
     
      destroyOnClose={true}
    >
      <div></div>
            <div className={'flex flex-col'}>
          <div className={"mt-0 p-0"}>
            <Divider orientation="left" style={{margin:'2px'}}>
              {" "}
              <h5 className="text-xl font-bold" style={{color:'#4bc714'}}>
                Crop: {crop?.cropType?.name}
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
         </Modal>        
 )
}
else{
  return <Marketingloading />;
}
}             
export default MarketingDetail;
