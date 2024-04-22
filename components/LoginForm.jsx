'use client'

import React ,{useState}from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,Modal,Card, Col, Row ,Spin } from 'antd';
import styles from '../assets/CSS/loginForm.module.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const LoginForm = () => {

const [errormessage, setErrorMessage] = useState("");
const [showloader, setShowloader] = useState(false);


const router = useRouter();

  const onFinish = async(values) => {
    setShowloader(true)
    let email=values.email
    let password=values.password
    try{
        const res= await signIn('credentials',{
            email,
            password,
            redirect:false
        })
        if(res.error){
          setShowloader(false)
          setErrorMessage("Something went wrong please contact admin")
          showModal();
        }else{
          setShowloader(false)
            router.replace('dashboard')
        }
    }catch(e){
      setShowloader(false)

    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
    <Spin spinning={showloader} fullscreen={showloader}/>
    
    <Row
    style={{
      height: 500,
      background: "LightGrey",
      justifyContent: "center"
    }}
  >
    <Col
      style={{
        display: "flex",
        background: "yellow",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
      }}
    >
    <Card
    hoverable
    style={{
      width: 500,
    }}
  >
    <div className={styles.loginformcenter}>
    <Form
      name="normal_login"
      className={styles.loginform}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>

    <Modal title="Info" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{errormessage}</p>
      </Modal>
    </div>
    </Card>
    </Col>
  </Row>
  </>
  );
};
export default LoginForm;