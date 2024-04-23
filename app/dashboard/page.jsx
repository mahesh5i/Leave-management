'use client'
import React,{useState,useEffect} from 'react';
import { Card } from 'antd';
import { Col, Row ,Spin} from 'antd';
import { Divider, Flex, Tag ,Button,Typography} from 'antd';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession,getSession,getProviders } from 'next-auth/react';



const { Meta } = Card;
const {Title} = Typography

const Dashboard = () => {

const [dashboardData, setDashboardData] = useState([]);
const [username, setUsername] = useState('');
const [role, setRole] = useState('');
const [showloader, setShowloader] = useState(false);


const router = useRouter();


const userRole="1"

const data=[{
    imagelink:'https://www.wellable.co/blog/wp-content/uploads/2022/08/Employee%20Engagement%200811-1200x675.png',
    description:'To help businesses in keeping track of employee data',
    tooltip:'success',
    title:'Manage Employee',
    navigateTo:'/manageuser',
    role:'1'
},
{
    imagelink:'https://blog.vantagecircle.com/content/images/2021/01/Employee-Management-Meaning-Importance-Tips-Tools---More.png',
    description:'To help businesses in keeping track of employee data',
    tooltip:'success',
    title:'Manage Employee Leaves',
    navigateTo:'/manageleaves',
    role:'1'

},
{
    imagelink:'https://blog.vantagecircle.com/content/images/2021/01/Employee-Management-Meaning-Importance-Tips-Tools---More.png',
    description:'Track Your Leave Status',
    tooltip:'success',
    title:'Track Your Leave',
    navigateTo:'/employeeleaves',
    role:'2'

}
]

useEffect(()=>{
    getUserdata();
},[])

const getUserdata=async()=>{
  setShowloader(true)

    try{
      const session = await getSession()
      const checkrole = await fetch('api/userExist',{
          method:'POST',
          headers:{
              "Content-Type":'application/json'
          },
          cache: 'no-store', 
          body: JSON.stringify({email:session?.user?.email})
      })
  
      const {user} = await checkrole.json();
      setShowloader(false)
      setUsername(user?.name)
      let filteredUser = data.filter(userdata => userdata.role === user?.role)
      setDashboardData(filteredUser)
    }catch(e){
      setShowloader(false)

    }
    
}

    return (
      <div >
          <Spin spinning={showloader} fullscreen={showloader} />
        <Title level={3}>Hi {username} Welcome to Employee Management Portal</Title>
        <Button onClick={() => {
    signOut({ redirect: false }).then(() => {
        router.push("/");});
}}>Log Out</Button>
        <Divider orientation="left"></Divider>

         <Row>
         {dashboardData.map((item) => {
          return(
            <Col span={6}>
            <Card
            hoverable
            style={{
              width: 300,
            }}
            cover={<img alt="example" src={item.imagelink} />}
          >
            <Meta title={item.title} description={item.description} />
            <Divider orientation="left"></Divider>
            <Button><Link href={item.navigateTo}>{item.title}</Link></Button>
          </Card>
         
            </Col>
          )  
        })}
   
  </Row>
      </div>
    );
  };

export default Dashboard;

