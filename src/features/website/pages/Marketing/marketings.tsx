import {
  Button,
  Form,
  Input,
  InputNumber,
  PageHeader,
  Select,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  cropEndPoint,
  lookupEndPoint,
} from "../../../../api/primecareApi.endpoint";
import { httpService } from "../../../../service/http.service";
import MarketingDetail from "./marketingDetail";
import Marketingloading from "./marketing_loading";

const MarketingPage = () => {
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [cropTypes, setCropTypes] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [crops, setCrops] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(true);
  const IntialfilterParam = {
   
    cropTypeId: 0,
    varietyId: 0,
    releaseYear: 0,
  };
  useEffect(() => {
    getCropTypes();
    getVarieties(); 
    setIsSearching(true);  
    setCrops([]);
    setIsSearching(false);  

  }, []);

  const getCropTypes = () => {
    httpService
      .get(lookupEndPoint.getCropTypes)
      .then((response) => {
        setCropTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getVarieties = () => {
    httpService
      .get(lookupEndPoint.getVarieties)
      .then((response) => {
        setVarieties(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFilterMarketing = (values: any) => {
    const year = values.releaseYear === null ? 0 : values.releaseYear;
    
    const filterParam = {
      ...values,
      cropTypeId: values.cropTypeId,
      varietyId: values.varietyId,
      releaseYear: year,
    };
   
    searchCrops(filterParam);
  };
  const searchCrops = (filterParam) => {
    setIsSearching(true);
    const url = { search: "searchCrop" };
    httpService
      .post(cropEndPoint[url.search], filterParam)
      .then((response) => {
        setCrops(response.data);       
        setIsSearching(false);
      })
      .catch((error) => {
        setIsSearching(false);
        setCrops([]);
        console.error(error);
      });
  };

  function LoadMarketingDetailPage() {
    if (!isSearching) {
      return <MarketingDetail crops={crops} />;
    } else {
      return <Marketingloading />;
    }
  }
  const seedSources = [
    { seedSourceId: 1, name: "Breeder Seeds" },
    { seedSourceId: 2, name: "Pre-Basic Seed" },
    { seedSourceId: 3, name: "Basic Seeds" },
    { seedSourceId: 4, name: "Certified Seeds" },
  ];

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <Title style={{ fontWeight: "bold" }} level={3}>
        Crop Marketing Information
      </Title>
      <div style={{ backgroundColor: "#E8E8E8" }}>
        <Form
          form={form}
          onFinish={onFilterMarketing}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="inline"
          size="small"
        >
          <Form.Item
            name={["cropTypeId"]}
            label={"Crop"}
            rules={[{ required: true, message: "select Crop" }]}
            //  hidden={!isCropTypeFetched}
            style={{
              display: "inline-block",
              width: "calc(25% - 8px)",
              margin: "0 8px",
            }}
          >
            <Select
              disabled={cropTypes.length === 1}
              showSearch={true}
              placeholder=""
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              options={cropTypes?.map((_: any, index) => {
                return {
                  key: index,
                  value: _.cropTypeId,
                  label: _.name,
                  title: _.name,
                };
              })}
            />
          </Form.Item>

          <Form.Item
            name={["varietyId"]}
            label={"Variety"}
            style={{
              display: "inline-block",
              width: "calc(25% - 8px)",
              margin: "0 8px",
            }}
            // rules={[{ required: true, message: "select Variety" }]}
            //  hidden={!isCropTypeFetched}
          >
            <Select
              disabled={varieties.length === 1}
              showSearch={true}
              placeholder=""
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              options={varieties?.map((_: any, index) => {
                return {
                  key: index,
                  value: _.varietyId,
                  label: _.name,
                  title: _.name,
                };
              })}
            />
          </Form.Item>
          <Form.Item name="releaseYear" label="Release Year">
            <InputNumber></InputNumber>
          </Form.Item>
                      {/*   <Form.Item
                name={["seedSourceId"]}
                label={"Seed Source"}
                style={{ display: 'inline-block', width: 'calc(25% - 8px)', margin: '0 8px' }}
              //  rules={[{ required: true, message: "select Variety" }]}
                //  hidden={!isCropTypeFetched}
              >
                <Select
                  disabled={varieties.length === 1}
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  options={seedSources?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.seedSourceId,
                      label: _.name,
                      title: _.name,
                    };
                  })}
                />
              
              </Form.Item>  */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>
      <LoadMarketingDetailPage/>
    </div>
  );
};

export default MarketingPage;
