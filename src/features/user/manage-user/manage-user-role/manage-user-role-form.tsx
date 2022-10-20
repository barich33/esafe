import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { lookupEndPoint } from "../../../../api/primecareApi.endpoint";
import { httpService } from "../../../../service/http.service";

const { Option } = Select;
const UserRoleManageForm =({form, isEditMode, modalConfig})=>{

    const [roles, setRoles] = useState([]);
    useEffect(() => {     
      getRoles();
    }, []);

    const getRoles = () => {
      httpService
        .get(lookupEndPoint.getRoles)
        .then((response) => {
          setRoles(response.data);
        })
        .catch(() => {
     
        });
    };
  
   return <Form
   form={form}
   layout={"horizontal"}
   preserve={false}
   size="small"
   labelCol={{ span: 5 }}
   wrapperCol={{ span: 30 }}
    

    >
        
      <br></br>
      
            <Form.Item
                name={["roleIds"]}
                label={"Roles"}
                rules={[
                  { required: true, message: "Select Role" },
                ]}
               // hidden={isEditMode && roles.length === 0}
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
                  options={roles?.map((_: any, index) => {
                    return {
                      key: index,
                      value: _.roleId,
                      title: _.name,
                      label: _.name,
                    };
                  })}
                ></Select>
              </Form.Item>      

    </Form>
}

export default UserRoleManageForm