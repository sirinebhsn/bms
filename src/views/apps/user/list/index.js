import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign, Users, UserCheck, Home } from 'react-feather'
import UsersList from './Table'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import { getUser } from '../store'
import { useEffect, useState } from 'react'

const StatsCard = ({ cols }) => {

  useEffect(() => {
    getUsers();
    getAdmins();
    getOwners();
    getEmployees();
    getTenants()

  }, [])
  const[users, setUsers]=useState([]);
  const[admins, setAdmin]=useState([]);
  const[owners, setOwner]=useState([]);
  const[employees, setEmp]=useState([]);
  const[tenants, setTenant]=useState([]);

  async function getUsers(){
      let result = await fetch("https://bms-back.start-now.fr/public/api/countUsers");
      result = await result.json();
      setUsers(result)
  }
  async function getAdmins(){
    let result = await fetch("https://bms-back.start-now.fr/public/api/countAdmin");
    result = await result.json();
    setAdmin(result)
}
async function getOwners(){
  let result = await fetch("https://bms-back.start-now.fr/public/api/countOwners");
  result = await result.json();
  setOwner(result)
}
async function getEmployees(){
  let result = await fetch("https://bms-back.start-now.fr/public/api/countEmployees");
  result = await result.json();
  setEmp(result)
}
async function getTenants(){
  let result = await fetch("https://bms-back.start-now.fr/public/api/countTenants");
  result = await result.json();
  setTenant(result)
}
  const data = [
    {
      title: users ,
      subtitle: 'Total Users',
      color: 'light-primary',
      icon: <TrendingUp size={24} />
    },
    {
      title: admins,
      subtitle: 'Total Admins',
      color: 'light-info',
      icon: <UserCheck size={24} />
    },
    {
      title: owners,
      subtitle: 'Total Owners',
      color: 'light-danger',
      icon: <Home size={24} />
    },
    {
      title: employees ,
      subtitle: 'Total Employees',
      color: 'light-success',
      icon: <User size={24} />
    },
    {
      title: tenants ,
      subtitle: 'Total Tenants',
      color: 'light-success',
      icon: <Users size={24} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
    
      return (
       <Col>
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Statistics</CardTitle>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
      <UsersList />

    </Card>

  )
}



export default StatsCard
