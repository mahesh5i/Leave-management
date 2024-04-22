'use client'
import React, { useState,useEffect } from 'react';
import { Space, Table, Tag,Button,Row,Col,Modal,Select,Form,Input,Tooltip,message,Spin } from 'antd';
import Link from 'next/link';
import bcrypt from 'bcryptjs';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';




const { Column, ColumnGroup } = Table;
const { Option } = Select;
const formatNumber = (value) => new Intl.NumberFormat().format(value);

const data = [
  {
    key: '1',
    name: 'John',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['developer'],
    emailid:'test@123',
    mobilenumber:'9798787987'
  },
  {
    key: '2',
    name: 'Jim',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['developer'],
    emailid:'test@123',
    mobilenumber:'9798787987'
  },
  {
    key: '3',
    name: 'Joe',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['developer'],
    emailid:'test@123',
    mobilenumber:'9798787987'
  },
];

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
const ManageUser = () => {

const [open, setOpen] = useState(false);
const [confirmLoading, setConfirmLoading] = useState(false);
const [isUserExist, setIsUserExist] = useState(false);
const [modalText, setModalText] = useState('Content of the modal');
const [value, setValue] = useState('');
const [form] = Form.useForm();
const [message, setMessage] = useState('');
const [tableData, setTableData] = useState([]);

const [isModalOpen, setIsModalOpen] = useState(false);
const router = useRouter();
const [showloader, setShowloader] = useState(false);






const showModal = () => {
    setOpen(true);
  };

  const showModalUserExist = (value) => {
    setMessage(value)
    setIsModalOpen(true);
  };
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
  };

  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        break;
      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        break;
      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
        });
        break;
      default:
    }
  };
  const onFinish =async (values) => {
    setShowloader(true)
    const hashpassword = await bcrypt.hash(values.password,10)
    values.password=hashpassword;
    values.role="2"
    try{
        const checkemailexist = await fetch('api/userExist',{
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify({email:values.email})
        })

        const {user} = await checkemailexist.json();
        if(user){
            handleCancel();
            showModalUserExist('User Already Exist');
            setShowloader(false)

        }else{
            const res = await fetch('api/register',{
                method:'POST',
                headers:{
                    "Content-Type":'application/json'
                },
                body: JSON.stringify(values)
            })
            if(res.ok){
                onReset();
                handleCancel();
                getAllUsers();
                showModalUserExist('Successfully User added');
            }
            setShowloader(false)

        }
       
    }catch(error){
        showModalUserExist('Something went wrong');
        onReset();
        setShowloader(false)

    }
  };
  const onReset = () => {
    form.resetFields();
  };

  useEffect(()=>{
getAllUsers();
  },[])
  const getAllUsers=async()=>{
    setShowloader(true)
    try{
      const getusers = await fetch('api/getalluser',{
        method:'GET',
        headers:{
            "Content-Type":'application/json'
        },
    })
    const {user} = await getusers.json();
    setShowloader(false)
    setTableData(user)
    }catch(e){
      setShowloader(false)
    }
   
  }

  const Updateuser=async(userdata,status)=>{
    let statusupdate;
    if(status === 'Activate'){
      statusupdate = 'active'
    }else{
      statusupdate = 'inactive'
    }

    const getusers = await fetch('api/updateuser',{
      method:'POST',
      headers:{
          "Content-Type":'application/json'
      },
      body: JSON.stringify({email:userdata.email,statusdata:statusupdate})
  })
    const {user} = await getusers.json();
    if(user){
      getAllUsers();
    }
  }
 

    return(
<>
<Spin spinning={showloader} fullscreen={showloader}/>

      <Row>
      <Col span={3}>
      <Button onClick={showModal}>Add Employee</Button>      </Col>
      <Col span={3}>
      <Button><Link href="/dashboard">Back to home</Link></Button>
      </Col>
      <Col span={1}>
      <Button onClick={() => {
    signOut({ redirect: false }).then(() => {
        router.push("/");});
}}>Log Out</Button>
      </Col>
    </Row>
   
  <Table dataSource={tableData} >
    <ColumnGroup >
      <Column title="Name" dataIndex="name" key="name" />
    </ColumnGroup>
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />

        <Column title="Email Id" dataIndex="email" key="email" />
        <Column title="Mobile Number" dataIndex="mobilenumber" key="mobilenumber" />
        <Column title="Status" dataIndex="status" key="status" />
    <Column
      title="Action"
      key="action"
      dataIndex="actiom"
      render={(_, record) => (
        <>
         <Row>
      <Col span={12}>
      <Button onClick={()=>Updateuser(record,record?.status == 'active' ? "Deactivate" : "Activate" )}>{record?.status == 'active' ? "Deactivate" : "Activate" }</Button>
      </Col>
    </Row>
        </>
      )}
    />
  </Table>

  <Modal
        title="Add New Employee"
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
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="age"
        label="Age"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="desigination"
        label="Desigination"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type=''/>
      </Form.Item>
      <Form.Item
    name="email"
    label="E-mail"
    rules={[
      {
        type: 'email',
        message: 'The input is not valid E-mail!',
      },
      {
        required: true,
        message: 'Please input your E-mail!',
      },
    ]}
  >
    <Input />
  </Form.Item>
  <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="mobilenumber"
        label="Mobile Number"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <NumericInput
      style={{
        width: 120,
      }}
      value={value}
      onChange={setValue}
    />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
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

const NumericInput = (props) => {
    const { value, onChange } = props;
    const handleChange = (e) => {
      const { value: inputValue } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;
      if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
        onChange(inputValue);
      }
    };
  
    const handleBlur = () => {
      let valueTemp = value;
      if (value.charAt(value.length - 1) === '.' || value === '-') {
        valueTemp = value.slice(0, -1);
      }
      onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    };
    const title = value ? (
      <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
    ) : (
      'Input a number'
    );
    return (
      <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
        <Input
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Input a number"
          maxLength={10}
        />
      </Tooltip>
    );
  };
  

export default ManageUser;