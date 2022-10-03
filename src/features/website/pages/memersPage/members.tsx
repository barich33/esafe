import React, { useEffect, useState } from 'react'

import { PageHeader, RadioChangeEvent, Space } from 'antd';
import { Radio, Tabs } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import MemberDetails from './member_details';
import './member.css'
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
    <>
     <PageHeader title="List of Members"></PageHeader>
      <Tabs size='small' className='p-0'
        tabPosition={'left'}
        style={{ marginBottom: 10 }}
        items={members.map((member, i) => {
          const id = String(i + 1);
          return {
            label: member?.name,
            key: id,
            children: <MemberDetails member={member}></MemberDetails>,
          };
        })}
      />
    </>
);
};
export default MembersPage