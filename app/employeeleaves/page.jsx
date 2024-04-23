'use client'
import React,{useState,useEffect} from 'react';
import { Space, Table, Tag,Button,Col, Row,Modal,Form,Input,DatePicker ,Spin} from 'antd';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { getSession } from 'next-auth/react';




const { Column, ColumnGroup } = Table;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
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
const EmployeeLeave = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [showloader, setShowloader] = useState(false);





  const showModal = () => {
    setOpen(true);
  };

  useEffect(()=>{
    getAllLeaves();
  },[])
 
  const UserExisthandleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    onReset();
  };

  const onFinish =async(values) => {
    setShowloader(true)

    let tdate =moment(values.todate).format('MM/DD/YYYY');
    let fdate =moment(values.fromdate).format('MM/DD/YYYY');
    const session = await getSession()

    const checkemailexist = await fetch('api/applyleave',{
      method:'POST',
      headers:{
          "Content-Type":'application/json'
      },
      cache: 'no-store', 
      body: JSON.stringify({email:session?.user?.email,name:session?.user?.name,fromdate:fdate,todate:tdate,status:'not approved',reason:values.reason,role:'2'})
  })

  if(checkemailexist.ok){
    onReset();
    getAllLeaves();
    handleCancel();
    setIsModalOpen(true)
    setMessage("SuccessFully Applyied")
    setShowloader(false)

  }else{
    onReset()
    handleCancel();
    setIsModalOpen(true)
    setMessage("Something Went Wrong")
    setShowloader(false)
  }

  }
  const onReset = () => {
    form.resetFields();
  };

  const getAllLeaves=async()=>{
    setShowloader(true)
    try{
      const session = await getSession();
      const getusers = await fetch('api/getleaves',{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        cache: 'no-store', 
        body: JSON.stringify({email:session?.user?.email})
    })
    const {user} = await getusers.json();
    setShowloader(false)

    setLeaveData(user)
    }catch(e){
      setShowloader(false)

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
       <Button onClick={()=>showModal()}>Apply For Leaves</Button>
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
       <Column title="Reason for Leave" dataIndex="reason" key="reason" />
     </ColumnGroup>
     <Column title="From date" dataIndex="fromdate" key="fromdate" />
     <Column title="To date" dataIndex="todate" key="todate" />
     <Column title="Email ID" dataIndex="email" key="email" />
     <Column title="Status" dataIndex="status" key="status" />
   </Table>

   <Modal
        title="Apply For Leave"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="reason"
        label="Reason"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="fromdate"
        label="Fromdate"
        rules={[
          {
            required: true,
          },
        ]}
      >
         <DatePicker format={'DD/MM/YYYY'}/>
      </Form.Item>

      <Form.Item
        name="todate"
        label="Todate"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker format={'DD/MM/YYYY'}/>
      </Form.Item>

     
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
      </Modal>

      <Modal title="Info" open={isModalOpen} onOk={UserExisthandleCancel} onCancel={UserExisthandleCancel}>
        <p>{message}</p>
      </Modal>
 
   </>

    )


}

 


   
export default EmployeeLeave;