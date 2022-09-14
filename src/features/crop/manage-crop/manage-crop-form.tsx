import {
  DatePicker,
  Checkbox,
  Form,
  Input,
  Select,
  Typography,
  Tabs,
  Row,
  Col,
  PageHeader,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import PhoneNumberPrefix from "../../../shared/user-phone-number-prefix";
import { httpService } from "../../../service/http.service";
import { lookupEndPoint } from "../../../api/primecareApi.endpoint";
import "./manage-crop.css";
const CropManageForm = ({ form, isEditMode, modalConfig }) => {
  const { TabPane } = Tabs;
  const [isCountryCodeRequired, setIsCountryCodeRequired] = useState(false);
  const gender = ["Male", "Female"];
  const [cropTypes, setCropTypes] = useState([]);
  const [cropTypes$, setCropTypes$] = useState([]);

  const [varieties, setVarieties] = useState([]);
  const [varieties$, setVarieties$] = useState([]);

  const [organizations, setOrganizations] = useState([]);
  const [organizations$, setOrganizations$] = useState([]);

  const [highlands, setHighlands] = useState([]);
  const [highlands$, setHighlands$] = useState([]);

  const [soileTypes, setSoilTypes] = useState([]);
  const [soileTypes$, setSoilTypes$] = useState([]);

  const [insects, setInsects] = useState([]);
  const [insects$, setInsects$] = useState([]);

  const [diseases, setDiseases] = useState([]);
  const [diseases$, setDiseases$] = useState([]);

  const [growthHabits, setGrowthHabits] = useState([]);
  const [growthHabits$, setGrowthHabits$] = useState([]);

  const [rowTypes, setRowTypes] = useState([]);
  const [rowTypes$, setRowTypes$] = useState([]);

  const [panicleForms, setPanicleForms] = useState([]);
  const [panicleForms$, setPanicleForms$] = useState([]);

  const [maturityGroups, setMaturityGroups] = useState([]);
  const [maturityGroups$, setMaturityGroups$] = useState([]);

  const [colors, setColors] = useState([]);
  const [colors$, setColors$] = useState([]);
  
  const [isCropTypeFetched, setIsCropTypeFetched] = useState(false);
  const [isVarietyFetched, setIsVarietyFetched] = useState(false);
  const [isOrganizationFetched, setIsOrganizationFetched] = useState(false);
  const [isHighlandFetched, setIsHighlandFetched] = useState(false);
  const [isSoilTypeFetched, setIsSoilTypeFetched] = useState(false);

  useEffect(() => {
    getCropTypes();
    getOrganizations();
    getVarieties();
    getHighlands();
    getSoilTypes();
    getInsects();
    getDiseases();
    getGrowthHabits();
    getPanicleForms();
    getRowTypes();
    getMaturityGroups();
    getColors();
  }, []);

  const getColors = () => {
    httpService
      .get(lookupEndPoint.getColors)
      .then((response) => {
        console.log(response.data);
        setColors(response.data);
        setColors$(response.data);
      })
      .catch(() => {
     
      });
  };
  const getMaturityGroups = () => {
    httpService
      .get(lookupEndPoint.getMaturityGroups)
      .then((response) => {
        console.log(response.data);
        setMaturityGroups(response.data);
        setMaturityGroups$(response.data);
      })
      .catch(() => {
     
      });
  };

  const getRowTypes = () => {
    httpService
      .get(lookupEndPoint.getRowTypes)
      .then((response) => {
        console.log(response.data);
        setRowTypes(response.data);
        setRowTypes$(response.data);
      })
      .catch(() => {
     
      });
  };

  const getPanicleForms = () => {
    httpService
      .get(lookupEndPoint.getPanicleForms)
      .then((response) => {
        console.log(response.data);
        setPanicleForms(response.data);
        setPanicleForms$(response.data);
      })
      .catch(() => {
     
      });
  };
  const getGrowthHabits = () => {
    httpService
      .get(lookupEndPoint.getGrowthHabits)
      .then((response) => {
        console.log(response.data);
        setGrowthHabits(response.data);
        setGrowthHabits$(response.data);
      })
      .catch(() => {
     
      });
  };

  const getDiseases = () => {
    httpService
      .get(lookupEndPoint.getDiseases)
      .then((response) => {
        console.log(response.data);
        setDiseases(response.data);
        setDiseases$(response.data);
      })
      .catch(() => {
     
      });
  };
  const getInsects = () => {
    httpService
      .get(lookupEndPoint.getInsects)
      .then((response) => {
        console.log(response.data);
        setInsects(response.data);
        setInsects$(response.data);
        
      })
      .catch(() => {
       
      });
  };

  const getSoilTypes = () => {
    httpService
      .get(lookupEndPoint.getSoilTypes)
      .then((response) => {
        console.log(response.data);
        setSoilTypes(response.data);
        setSoilTypes$(response.data);
        setIsSoilTypeFetched(true);
      })
      .catch(() => {
        setIsSoilTypeFetched(false);
      });
  };
  const getVarieties = () => {
    httpService
      .get(lookupEndPoint.getVarieties)
      .then((response) => {
        console.log(response.data);
        setVarieties(response.data);
        setVarieties$(response.data);
        setIsVarietyFetched(true);
      })
      .catch(() => {
        setIsVarietyFetched(false);
      });
  };
  const getHighlands = () => {
    httpService
      .get(lookupEndPoint.getHighlands)
      .then((response) => {
        console.log(response.data);
        setHighlands(response.data);
        setHighlands$(response.data);
        setIsHighlandFetched(true);
      })
      .catch(() => {
        setIsHighlandFetched(false);
      });
  };

  const getCropTypes = () => {
    httpService
      .get(lookupEndPoint.getCropTypes)
      .then((response) => {
        console.log(response.data);
        setCropTypes(response.data);
        setCropTypes$(response.data);
        setIsCropTypeFetched(true);
        console.log(cropTypes);
      })
      .catch(() => {
        setIsCropTypeFetched(false);
        setIsOrganizationFetched(false);
      });
  };
  const getOrganizations = () => {
    httpService
      .get(lookupEndPoint.getOrganizations)
      .then((response) => {
        setOrganizations(response.data);
        setOrganizations$(response.data);
        setIsOrganizationFetched(true);
      })
      .catch(() => {
        setIsCropTypeFetched(false);
        setIsOrganizationFetched(false);
      });
  };

  const diseaseInputs = diseases.map((item:any) => {
    return {
      name: item.name,
      diseaseId: item.diseaseId,
      value: ""
    };
  });
  const insectInputs = insects.map((item:any) => {
    return {
      name: item.name,
      insectId: item.insectId,
      value: ""
    };
  });


  return (
    <Form
      form={form}
      layout={"horizontal"}
      preserve={false}
      size="small"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 30 }}
    >
      <Tabs defaultActiveKey="1" className="p-3">
        <TabPane tab="Crop Details" key={"1"}>
          <div className="grid md:grid-cols-2">
            <div className={"md:border-r-2 md:pr-8 lg:pr-6"}>
              <Form.Item
                name={["cropTypeId"]}
                label={"Crop"}
                rules={[{ required: true, message: "select Crop" }]}
                //  hidden={!isCropTypeFetched}
              >
                <Select
                  disabled={!isEditMode && cropTypes.length === 1}
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
                rules={[{ required: true, message: "select Variety" }]}
                //  hidden={!isCropTypeFetched}
              >
                <Select
                  disabled={!isEditMode && varieties.length === 1}
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

              <Form.Item
                label="Release Year"
                name="releaseYear"
                rules={[
                  { required: true, message: "Please select release Year" },
                ]}
              >
                <DatePicker
                 
                 className={'w-full'}
                 popupStyle={{width:'31%'}}
                 dropdownClassName={'w-auto'}                         
                 picker={'year'}
                 suffixIcon={<Icon fontSize={25} icon="bx:chevron-down" />}                 
                  name={"releaseYear"}
                />
              </Form.Item>

              <Form.Item
                name={["sourceOfBreederSeedIds"]}
                label={"Source of Breeder Seeds"}
                rules={[
                  { required: true, message: "select Source of breeder seeds" },
                ]}
                hidden={isEditMode && organizations.length === 0}
              >
                <Select
                  mode="multiple"
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  options={organizations?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.organizationId,
                      title: _.name,
                      label: _.name,
                    };
                  })}
                ></Select>
              </Form.Item>

              <Form.Item
                name={["sourceOfPreBasicSeedIds"]}
                label={"Source of Pre-Basic Seed"}
                rules={[
                  { required: true, message: "Source of Pre-Basic Seed" },
                ]}
                hidden={isEditMode && organizations.length === 0}
              >
                <Select
                  mode="multiple"
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  options={organizations?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.organizationId,
                      title: _.name,
                      label: _.name,
                    };
                  })}
                ></Select>
              </Form.Item>
              <Form.Item
                name={["sourceOfBasicSeedIds"]}
                label={"Source of Basic Seeds"}
                rules={[{ required: true, message: "Source of Basic Seeds" }]}
                hidden={isEditMode && organizations.length === 0}
              >
                <Select
                  mode="multiple"
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  options={organizations?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.organizationId,
                      title: _.name,
                      label: _.name,
                    };
                  })}
                ></Select>
              </Form.Item>
            </div>
            <div className={" md:pl-8 lg:pl-16"}>
              <Form.Item
                name={["growthHabitId"]}
                label={"Growth Habit"}
                // rules={[{ required: true, message: 'select CropType' }]}
                //  hidden={!isCropTypeFetched}
              >
                <Select
                  disabled={!isEditMode && cropTypes.length === 1}
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  options={growthHabits?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.growthHabitId,
                      label: _.name,
                      title: _.name,
                    };
                  })}
                />
              </Form.Item>

              <Form.Item
                name={["panicleFormId"]}
                label={"Panicle Form"}
                // rules={[{ required: true, message: 'select CropType' }]}
                //  hidden={!isCropTypeFetched}
              >
                <Select
                  disabled={!isEditMode && cropTypes.length === 1}
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  options={panicleForms?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.panicleFormId,
                      label: _.name,
                      title: _.name,
                    };
                  })}
                />
              </Form.Item>
              <Form.Item
                name={["rowTypeId"]}
                label={"Row Types"}
                // rules={[{ required: true, message: 'select CropType' }]}
                //  hidden={!isCropTypeFetched}
              >
                <Select
                  disabled={!isEditMode && cropTypes.length === 1}
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  options={rowTypes?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.rowTypeId,
                      label: _.name,
                      title: _.name,
                    };
                  })}
                />
              </Form.Item>
              <Form.Item
                name={["maturityGroupId"]}
                label={"Maturity Groups"}
                // rules={[{ required: true, message: 'select CropType' }]}
                //  hidden={!isCropTypeFetched}
              >
                <Select
                  disabled={!isEditMode && cropTypes.length === 1}
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  options={maturityGroups?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.maturityGroupId,
                      label: _.name,
                      title: _.name,
                    };
                  })}
                />
              </Form.Item>

              <Form.Item
                name={["flowerColor"]}
                label={"Flower Color"}
                // rules={[{ required: true, message: 'select CropType' }]}
                //  hidden={!isCropTypeFetched}
              >
                <Select
                  disabled={!isEditMode && cropTypes.length === 1}
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  options={colors?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.colorName,
                      label: _.name,
                      title: _.name,
                    };
                  })}
                />
              </Form.Item>

              <Form.Item
                name={["seedColor"]}
                label={"Seed Color"}
                // rules={[{ required: true, message: 'select CropType' }]}
                //  hidden={!isCropTypeFetched}
              >
                <Select
                  disabled={!isEditMode && cropTypes.length === 1}
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  options={colors?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.colorName,
                      label: _.name,
                      title: _.name,
                    };
                  })}
                />
              </Form.Item>

              <Form.Item
                name={["seedCoatColor"]}
                label={"Seed Coat Color"}
                // rules={[{ required: true, message: 'select CropType' }]}
                //  hidden={!isCropTypeFetched}
              >
                <Select
                  disabled={!isEditMode && cropTypes.length === 1}
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  options={colors?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.colorName,
                      label: _.name,
                      title: _.name,
                    };
                  })}
                />
              </Form.Item>

            </div>
          </div>
        </TabPane>
        <TabPane tab="Adaptation and Seed Rate" key={"2"}>
          <div className="grid md:grid-cols-2">
            <div className={"md:border-r-2 md:pr-8 lg:pr-6"}>
              <PageHeader subTitle="Adaptation" />

              <Form.Item label="Altitude" name="adtAltitude">
                <Input placeholder="" />
              </Form.Item>

              <Form.Item label="Rainfall" name="adtRainfall">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                label="Moisture Stress Area"
                name="adtMoistureStressArea"
              >
                <Input placeholder="" />
              </Form.Item>

              <Form.Item label="Suitable to Irrigation" name="AdtSuitableToIrrigation">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                label="Suitable to Inter Cropping"
                name="AdtSuitableToInterCropping"
              >
                <Input placeholder="" />
              </Form.Item>
              <Form.Item
                label="Suitable to Sole Cropping"
                name="AdtSuitableToSoleCropping"
              >
                <Input placeholder="" />
              </Form.Item>
              
              <Form.Item
                name={["highlandId"]}
                label={"Highland"}
                rules={[{ required: true, message: "select Highland" }]}
                //  hidden={!isCropTypeFetched}
              >
                <Select
                  disabled={!isEditMode && highlands.length === 1}
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  options={highlands?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.highlandId,
                      label: _.name,
                      title: _.name,
                    };
                  })}
                />
              </Form.Item>
              <Form.Item
                name={["soilTypeId"]}
                label={"Soil"}
                rules={[{ required: true, message: "select Soil" }]}
                //  hidden={!isCropTypeFetched}
              >
                <Select
                  disabled={!isEditMode && soileTypes.length === 1}
                  showSearch={true}
                  placeholder=""
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option?.title?.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  options={soileTypes?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.soilTypeId,
                      label: _.name,
                      title: _.name,
                    };
                  })}
                />
              </Form.Item>
            </div>
            <div className={"md:border-r-2 md:pr-8 lg:pr-6"}>
            <PageHeader subTitle="Seed Rate(kg/ha)" />
            <Form.Item label="Broadcast" name="srBroadcast">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="Drill" name="srDrill">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="Row" name="srRow">
                <Input placeholder="" />
              </Form.Item>

              <PageHeader subTitle="Agronomic Requirements(Fertilizer)" />

              <Form.Item label="Spacing Between Row" name="AgrSpacingBetweenRow">
                <Input placeholder="" />
              </Form.Item>

              <Form.Item label="Spcing Between Plant" name="AgrSpcingBetweenPlant">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="Planting Date Range of Month" name="AgrPlantingDateRangeOfMonth">
                <Input placeholder="" />
              </Form.Item>

              <Form.Item label="Nitrogen/Urea" name="AgrFertilizerNitrogenOrUrea">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="P2O5" name="AgrFertilizerP2O5">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="NPS" name="AgrFertilizerNPS">
                <Input placeholder="" />
              </Form.Item>

              <Form.Item label="Sulfer" name="AgrFertilizerSulfer">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="Copper" name="AgrFertilizerCopper">
                <Input placeholder="" />
              </Form.Item>
</div>

          </div>
        </TabPane>
        <TabPane tab="Reaction to Diseases and Insects" key={"3"}>
            <div className="grid md:grid-cols-2">
            <div className={"md:border-r-2 md:pr-8 lg:pr-6"}>
          <PageHeader subTitle="Reaction to Diseases" />

          <Form.List name="diseases" initialValue={diseaseInputs}>
          {(fields) => ( 
            
            <>
              {fields.map((field,index) => (
               
               <div key={field.key}>
             
                  <Form.Item
                    {...field}
                    name={[field.name, "diseaseId"]}                   
                    hidden
                  >
                    <Input placeholder="" />
                  </Form.Item> 

                  <Form.Item
                    {...field} 
                    label={diseaseInputs[index].name}
                    name={[field.name, "value"]}                   
                  >
                    <Input placeholder="Value" />
                  </Form.Item>  
                              
             </div>
              ))}            
            </>
          )}
        </Form.List>

        <PageHeader subTitle="Reaction to Insects" />
         
          <Form.List name="insects" initialValue={insectInputs}>
          {(fields) => ( 
            
            <>
              {fields.map((field,index) => (
               
               <div key={field.key}>    
                  <Form.Item
                    {...field}
                    name={[field.name, "insectId"]}                   
                    hidden
                  >
                    <Input placeholder="" />
                  </Form.Item> 

                  <Form.Item
                    {...field} 
                    label={insectInputs[index].name}
                    name={[field.name, "value"]}                   
                  >
                    <Input placeholder="Value" />
                  </Form.Item>  
                              
             </div>
              ))}            
            </>
          )}
        </Form.List>
          

          </div>
          < div className={"md:border-r-2 md:pr-8 lg:pr-6"}>
        
          <PageHeader subTitle="Morphological characteristics" />
          <Form.Item label="Plant Height(cm)" name="mrphoPlantHeight">
             <Input placeholder="" />
              </Form.Item>    
              <Form.Item label="Stem Pigmentation" name="mrphoStemPigmentation">
             <Input placeholder="" />
              </Form.Item>    
              <Form.Item label="Days to Heading" name="mrphoDaystoHeading">
             <Input placeholder="" />
              </Form.Item>    
              <Form.Item label="Days to Maturity" name="mrphoDaystoMaturity">
             <Input placeholder="" />
              </Form.Item>    
              <Form.Item label="Panicle Length" name="mrphoPanicleLength">
             <Input placeholder="" />
              </Form.Item>    
              <Form.Item label="Spike Length" name="mrphoSpikeLength">
             <Input placeholder="" />
              </Form.Item>    
              <Form.Item label="Ear/CobLength" name="mrphoEarOrCobLength">
             <Input placeholder="" />
              </Form.Item>    
            </div>
          </div>
        </TabPane>
        <TabPane tab=" Quality Attributes and Yields" key={"4"}>
        <div className="grid md:grid-cols-2">
            <div className={"md:border-r-2 md:pr-8 lg:pr-6"}>
         
            <PageHeader subTitle="Quality attributes" />
          <Form.Item label="Oil content(%)" name="qualityOilcontent">
             <Input placeholder="" />
              </Form.Item>    
              <Form.Item label="Protein Content(%)" name="qualityProteinContent">
             <Input placeholder="" />
              </Form.Item>    
              <Form.Item label="Glutien Content(%)" name="qualityGlutienContent">
             <Input placeholder="" />
              </Form.Item>    
              <Form.Item label="Extract(%)" name="qualityExtract">
             <Input placeholder="" />
              </Form.Item>    
              <Form.Item label="HLW()kg/hl" name="QualityHLW">
             <Input placeholder="" />
              </Form.Item>    
              <Form.Item label="Grain Seed Size(mm)" name="qualityGrainSeedSize">
             <Input placeholder="" />
              </Form.Item>    
              <Form.Item label="Thousand Seed Weight(g)" name="QualityThousandSeedWeight">
             <Input placeholder="" />
              </Form.Item>    
              <Form.Item label="Sokability(%)" name="QualitySokability">
             <Input placeholder="" />
              </Form.Item>  
          </div>
          < div className={"md:border-r-2 md:pr-8 lg:pr-6"}>
          <PageHeader subTitle="Yield (quintal/ha" />
          <Form.Item label="Grain" name="yieldGrain">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="Marketable Tuber" name="yieldMarketableTuber">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="Forage" name="yieldForage">
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="Fodder" name="yieldFodder">
                <Input placeholder="" />
              </Form.Item>
            
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Form>
  );
};

export default CropManageForm;