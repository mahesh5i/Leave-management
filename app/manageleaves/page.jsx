'use client'
import React,{useEffect,useState} from 'react';
import { Space, Table, Tag,Button,Col, Row,Spin } from 'antd';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const { Column, ColumnGroup } = Table;
const data = [
  {
    key: '1',
    name: 'John',
    reason: 'New York No. 1 Lake Park',
    leavedate:'12/10/10',
    emailid:'test@gmail.com'
  },
  {
    key: '2',
    name: 'John',
    reason: 'New York No. 1 Lake Park',
    leavedate:'12/10/10',
    emailid:'test@gmail.com'
  },
  {
    key: '2',
    name: 'John',
    reason: 'New York No. 1 Lake Park',
    leavedate:'12/10/10',
    emailid:'test@gmail.com'
  },
];
const ManageLeaves = () => {
  const router = useRouter();
  const [leaveData, setLeaveData] = useState([]);
  const [showloader, setShowloader] = useState(false);



  useEffect(()=>{
    getAllLeaves();
  },[])
  const getAllLeaves=async()=>{
    setShowloader(true)
    try{
      const getusers = await fetch('api/getallleaves',{
        method:'GET',
        headers:{
            "Content-Type":'application/json'
        },
    })
    const {user} = await getusers.json();
    setShowloader(false)

    setLeaveData(user)
    }catch(e){
      setShowloader(false)

    }
    
}

const UpdateLeave=async(userdata,status)=>{

  const getusers = await fetch('api/updateleave',{
    method:'POST',
    headers:{
        "Content-Type":'application/json'
    },
    body: JSON.stringify({email:userdata.email,statusdata:status})
})
  const {user} = await getusers.json();
  if(user){
    getAllLeaves();
  }
}



  return(
    <>
          <Spin spinning={showloader} fullscreen={showloader}/>

    <Row>
     <Col span={3}>
     <Button><Link href="/dashboard">Back to home</Link></Button>
     </Col>
     <Col span={3}>
     <Button onClick={() => {
    signOut({ redirect: false }).then(() => {
        router.push("/");});
}}>Log Out</Button>
     </Col>
   </Row>

 <Table dataSource={leaveData}>
   <ColumnGroup >
     <Column title="Name" dataIndex="name" key="name" />
     <Column title="Reason for Leave" dataIndex="reason" key="reason" />
   </ColumnGroup>
   <Column title="From date" dataIndex="fromdate" key="fromdate" />
   <Column title="To date" dataIndex="todate" key="todate" />
   <Column title="Email ID" dataIndex="email" key="email" />
   <Column title="Status" dataIndex="status" key="status" />

   <Column
     title="Action"
     key="action"
     render={(_, record) => (
       <>
        <Row>
     <Col span={12}>
     <Button onClick={()=>UpdateLeave(record,'approve')}>Approve</Button>
     </Col>
     <Col span={12}>
     <Button onClick={()=>UpdateLeave(record,'reject')}>Reject</Button>
     </Col>
   </Row>
       </>
     
       
     )}
   />

   
 </Table>
 </>
  )
}

   

export default ManageLeaves;