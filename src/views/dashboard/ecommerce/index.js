// ** React Imports
import { useContext, useEffect, useState } from 'react'
import ApexDonutChart from '../../charts/apex/ApexDonutChart'
// ** Icons Imports
import { AlertCircle, ArrowRight, Award, DollarSign, Eye, Heart, Home, List, MessageSquare, Monitor, Settings, ShoppingBag, Truck, User, UserCheck, UserPlus, Users } from 'react-feather'

// ** Custom Components

// ** Utils

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Reactstrap Imports
import { Row, Col, Button, Nav, NavItem, NavLink } from 'reactstrap'

// ** Demo Components
import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'
import CardEmployeesTasks from '@src/views/ui-elements/cards/advance/CardEmployeesTask'
import StatsVertical from '@components/widgets/stats/StatsVertical'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import Sales2 from '../../ui-elements/cards/analytics/Sales2'
import CardTransactions from '../../ui-elements/cards/advance/CardTransactions'
import Sales3 from '../../ui-elements/cards/analytics/Sales3'
// ** Styles
import '@styles/base/pages/dashboard-ecommerce.scss'
import { useTranslation } from 'react-i18next'

const EcommerceDashboard = () => {
  const { colors } = useContext(ThemeColors)
  const trackBgColor = '#e9ecef'
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const { t } = useTranslation()
  useEffect(() => {
    getUsers();
    getAdmins();
    getEmployees();
    getTenants();
    getFloors();

  }, [])
  const [users, setUsers] = useState([]);
  const [admins, setAdmin] = useState([]);
  const [employees, setEmp] = useState([]);
  const [tenants, setTenant] = useState([]);
  const [floors, setFloor] = useState([]);


  async function getUsers() {
    let result = await fetch(`${API_ENDPOINT}/api/countUsers`);
    result = await result.json();
    setUsers(result)
  }
  async function getAdmins() {
    let result = await fetch(`${API_ENDPOINT}/api/countAdmin`);
    result = await result.json();
    setAdmin(result)
  }

  async function getEmployees() {
    let result = await fetch(`${API_ENDPOINT}/api/countEmployees`);
    result = await result.json();
    setEmp(result)
  }
  async function getTenants() {
    let result = await fetch(`${API_ENDPOINT}/api/countTenants`);
    result = await result.json();
    setTenant(result)

  }
  async function getFloors() {
    let result = await fetch(`${API_ENDPOINT}/api/countFloors`);
    result = await result.json();
    setFloor(result)
  }
  return (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        <Col lg='12' sm='12'>
          <CardCongratulations />
        </Col>
      </Row>
      <Row>
        {/* Stats With Icons */}
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Home size={24} color='red' />} color='info' stats={floors}
            statTitle={t('Total Floor')}  link='/floor/listFloors'>
          </StatsVertical>
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Monitor size={24} />} color='warning' stats="60"
            statTitle={t('Total Units')} link='/units/listUnits'/>
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<User size={24} />} color='danger' stats={users} statTitle={t('Total Users')}link='/user/list' >

          </StatsVertical>

        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Users size={24} />} color='primary' stats={tenants} statTitle={t('Total Tenant')}link='/' />
        </Col>

        {/* Stats With Icons */}
      </Row>
      <Row>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Users size={24} />} color='success' stats={employees} statTitle={t('Total Employees')} link='/employee/list' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Users size={24} />} color='danger' stats={admins} statTitle={t('Total Admins')} link='/'/>
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<DollarSign size={24} />} color='success' stats='689' statTitle={t('Total Rent')} link='/'/>
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Settings size={24} />} color='danger' stats='2.1k' statTitle={t('Total Maintenance')} link='/'/>
        </Col>
      </Row>
      <Row>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Users size={24} />} color='success' stats='689' statTitle={t('Total Fund')} link='/'/>
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<DollarSign size={24} />} color='danger' stats='2.1k' statTitle={t('Owner Utility')} link='/'/>
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<DollarSign size={24} />} color='success' stats='689' statTitle={t('Employee Salary')}link='/' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<AlertCircle size={24} />} color='danger' stats='2.1k' statTitle={t('Total Complain')} link='/complain/list'/>
        </Col>
      </Row>
      <Row>
        <Col xl='6' lg='12'>
          <ApexDonutChart />
        </Col>
      </Row>
      <Row>

        <Col lg="6" xs="12">
          <Sales2 />
        </Col>
        <Col lg="6" xs="12">
          <Sales3 />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='6' md='6' sm='12'>
          <CardTransactions />
        </Col>
        <Col lg='6' md='6' sm='12'>
          <CardEmployeesTasks colors={colors} trackBgColor={trackBgColor} />
        </Col>
      </Row>


    </div>
  )
}

export default EcommerceDashboard
