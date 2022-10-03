import { Button, Form, PageHeader, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { cropEndPoint, lookupEndPoint } from '../../../../api/primecareApi.endpoint';
import { httpService } from '../../../../service/http.service';
import MarketingDetail from './marketingDetail';
import Marketingloading from './marketing_loading';

const MarketingPage=()=> {
  const [form] = Form.useForm();
  const [cropTypes, setCropTypes] = useState([]); 
  const [varieties, setVarieties] = useState([]); 
  const [crops, setCrops] = useState([]); 
  const[isSearching,setIsSearching]=useState(true);
  useEffect(() => {
    getCropTypes();
    getVarieties();   
  }, []);

  const getCropTypes = () => {
    httpService
      .get(lookupEndPoint.getCropTypes)
      .then((response) => {
        
        setCropTypes(response.data);
      })
      .catch((error) => {
       console.log(error)
      });
  };
  const getVarieties = () => {
    httpService
      .get(lookupEndPoint.getVarieties)
      .then((response) => {
        setVarieties(response.data);
      })
      .catch((error) => {
       console.log(error)
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFilterMarketing = (values: any) => {

    const filterParam = {
      ...values,
      cropTypeId: values.cropTypeId,
      varietyId: values.varietyId,
    };   
    console.log(filterParam);
      searchCrops(filterParam);    
  };
  const searchCrops = (filterParam) => {
    setIsSearching(true);
    const url = { search: "searchCrop" };
    httpService
      .post(
        cropEndPoint[url.search],
        filterParam
      )
      .then((response) => {
        setCrops(response.data);
        console.log("filter",response.data);
        setIsSearching(false);
      })
      .catch((error) => {
        setIsSearching(false);
        setCrops([]);
        console.error(error);
      });
  };

  function LoadMarketingDetailPage(searching) {
  
    if (searching) {
      return <MarketingDetail crops={crops} />;
    }
    else{
    return <Marketingloading />;
    }
  }

  return (
   <>
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
                style={{ display: 'inline-block', width: 'calc(25% - 8px)', margin: '0 8px' }}
              >
                <Select
                  disabled={cropTypes.length === 1}
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
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
                style={{ display: 'inline-block', width: 'calc(25% - 8px)', margin: '0 8px' }}
               // rules={[{ required: true, message: "select Variety" }]}
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
              <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>       
    </Form>
  
     <LoadMarketingDetailPage isSearching={isSearching}/>
 </>
  )
}

export default MarketingPage