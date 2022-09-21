import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { pageEndPoint } from "../../../api/primecareApi.endpoint";
import { httpService } from "../../../service/http.service";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Item from "antd/lib/list/Item";
import TextEditor from "../../helpers/textEditor";
const { Option } = Select;
const PageManageForm =({form, isEditMode, modalConfig})=>{
  const[pages,setPages]=useState([]);
  const[pageContent,setPageContent]= useState<any>('');

  useEffect(() => {
    getPages();
  }, []);

  const getPages = () => {
    httpService
      .get(pageEndPoint.getPages)
      .then((response) => {
        console.log(response.data);
        setPages(response.data?.pages?.filter(x=>x.isParent===true));
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
             name={['parentId']}
             label={'Parent'}
            // rules={[{ required: true, message: 'select Region' }]}
           //  hidden={!isRegionFetched}
           >
             <Select
               disabled={!isEditMode && pages.length === 1}
               showSearch={true}
               placeholder="Parent Page"
               optionFilterProp="children"
               filterOption={(input, option) =>
                 option?.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0
               }
               options={pages?.map((_:any, index) => {
                 return {
                   key: index,
                   value: _.pageId,
                   label: _.name,
                   title: _.name,
                 };
               })}                
             />
           </Form.Item>

        <Form.Item
              label="Page"
              name="name"
              rules={[{ required: true, message: 'Please enter Page' }]}
            >
              <Input placeholder="Enter Page" />
         </Form.Item>
         <Form.Item
              label="Page Title"
              name="title"
              rules={[{ required: true, message: 'Please enter Page title' }]}
            >
              <Input placeholder="Enter Page Title" />
         </Form.Item>
      
         <Form.Item
          name="pageContent"
          rules={[
            {
              required: true,
              message: 'Please enter Page Content',
            },
          ]}
        >
          {/* @ts-ignore */}
          <TextEditor />
        </Form.Item>
                
    </Form>
}

export default PageManageForm