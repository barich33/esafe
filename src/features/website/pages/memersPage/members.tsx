import React, { useEffect, useState } from 'react'

import { Card, PageHeader, RadioChangeEvent, Space } from 'antd';
import { Radio, Tabs } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import MemberDetails from './member_details';

import { httpService } from '../../../../service/http.service';
import { memberEndPoint } from '../../../../api/primecareApi.endpoint';

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

const MembersPage=()=> {
  

    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      getMemberList();
     // setLoading(false)
    }, []);
  
    
    const getMemberList = () => {
      httpService
        .get(`${memberEndPoint.getMembers}`)
        .then((response) => {
          console.log(response.data);
          const members=response.data?.members;
          setMembers(members);         
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setMembers([]);
          console.error(error);
        });
  };
  return (
 <div style={{ backgroundColor: "#fff",height:'auto' }}>
     <PageHeader title="List of Members"></PageHeader>
      <Tabs size='small' tabBarGutter={6} tabBarStyle={{width:'auto'}} type={'card'}
        tabPosition={'left'}
      //  style={{height:'600px'}}
        items={members.filter(x=>x.isMember===true).map((member, i) => {
          const id = String(i + 1);
          return {
            label: member?.name,
            key: id,
            children: <MemberDetails member={member}></MemberDetails>,
          };
        })}
      />
    </div>
);
};
export default MembersPage