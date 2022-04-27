// ** React Imports
import { useContext, useEffect, useState } from 'react'
import ApexDonutChart from '../../charts/apex/ApexDonutChart'
// ** Icons Imports
import { AlertCircle, ArrowRight, Award, DollarSign, Eye, Heart, Home, List, MessageSquare, Monitor, Settings, ShoppingBag, Truck, User, UserCheck, UserPlus, Users } from 'react-feather'
import { isUserLoggedIn } from '@utils'

// ** Custom Components

// ** Utils

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Reactstrap Imports
import { Row, Col} from 'reactstrap'

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
  const [users, setUsers] = useState(null);
  const [units, setUnits] = useState(null);

  const [admins, setAdmin] = useState(null);
  const [employees, setEmp] = useState(null);
  const [tenants, setTenant] = useState(null);
  const [floors, setFloor] = useState(null);
  const [floor, setFloors] = useState(null);
  const [a, setA] = useState(null);
  const [emp, setEmployee] = useState(null);
  const [ten, setTen] = useState(null);
  const [u, setU] = useState(null);
  const building_id = window.localStorage.getItem('building_id')


  const [Owner, setOwner] = useState(null);
  const item=window.localStorage.getItem('user_type')

  useEffect(() => {
    getUsers();
    getAdmins();
    getEmployees();
    getTenants();
    getFloors();
    getAdminsById();
    getEmplById();
    getTenById();
    getOwnerById();
    getUnitById();
    getUnits();
    getFloorById()
  }, [])



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
  async function getUnits() {
    let result = await fetch(`${API_ENDPOINT}/api/countUnit`);
    result = await result.json();
    setU(result)
  }
 

  async function getAdminsById() {
    let result = await fetch(`${API_ENDPOINT}/api/countAdminById/` + building_id);
    result = await result.json();
    setA(result)

  }
  async function getEmplById() {
    let result = await fetch(`${API_ENDPOINT}/api/countEmpById/` + building_id);
    result = await result.json();
    setEmployee(result)

  }
  async function getUnitById() {
    let result = await fetch(`${API_ENDPOINT}/api/countUnitById/` + building_id);
    result = await result.json();
    setUnits(result)

  }
  async function getTenById() {
    let result = await fetch(`${API_ENDPOINT}/api/countTenantById/` + building_id);
    result = await result.json();
    setTen(result)

  }
  async function getOwnerById() {
    let result = await fetch(`${API_ENDPOINT}/api/countOwnerById/` + building_id);
    result = await result.json();
    setOwner(result)

  }
  async function getFloorById() {
    let result = await fetch(`${API_ENDPOINT}/api/countFloorById/` + building_id);
    result = await result.json();
    setFloors(result)

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
          {((item == 'a') ||(item=='S' && building_id!='null'))  &&
            <>
              <StatsVertical icon={<Home size={24} color='red' />} color='info' stats={floor}
                statTitle={t('Total Floor')} link='/floor/listFloors'>
              </StatsVertical>
            </>
          }
          {(item == 'S' && building_id=='null') &&
            <>
              <StatsVertical icon={<Home size={24} color='red' />} color='info' stats={floors}
                statTitle={t('Total Floor')} link='/floor/listFloors'>
              </StatsVertical>
            </>}
        </Col>
        <Col xl='3' md='4' sm='6'>
        {((item == 'a') ||(item=='S' && building_id!='null'))  &&
            <>
              <StatsVertical icon={<Monitor size={24} />} color='warning' stats={units}
                statTitle={t('Total Units')} link='/units/listUnits' />
            </>}
          {(item == 'S' && building_id=='null') &&
            <>
              <StatsVertical icon={<Monitor size={24} />} color='warning' stats={u}
                statTitle={t('Total Units')} link='/units/listUnits' />
            </>}
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<User size={24} />} color='danger' stats={users} statTitle={t('Total Users')} link='/user/list' >

          </StatsVertical>

        </Col>

        <Col xl='3' md='4' sm='6'>
        {((item == 'a') ||(item=='S' && building_id!='null'))  &&
            <>
              <StatsVertical icon={<Users size={24} />} color='primary' stats={ten} statTitle={t('Total Tenant')} link='/' />
            </>
          }
          {(item == 'S' && building_id=='null') &&
            <>

              <StatsVertical icon={<Users size={24} />} color='primary' stats={tenants} statTitle={t('Total Tenant')} link='/' />
            </>
          }

        </Col>

        {/* Stats With Icons */}
      </Row>
      <Row>
        <Col xl='3' md='4' sm='6'>
        {((item == 'a') ||(item=='S' && building_id!='null'))  &&
            <>

              <StatsVertical icon={<Users size={24} />} color='danger' stats={emp} statTitle={t('Total Employees')} link='/' />
            </>}
          {(item== 'S' && building_id=='null') &&
            <>

              <StatsVertical icon={<Users size={24} />} color='success' stats={employees} statTitle={t('Total Employees')} link='/employee/list' />
            </>
          }
        </Col>
        <Col xl='3' md='4' sm='6'>
        {((item == 'a') ||(item=='S' && building_id!='null'))  &&
            <>

              <StatsVertical icon={<Users size={24} />} color='danger' stats={a} statTitle={t('Total Admins')} link='/' />
            </>}
          {(item == 'S' && building_id=='null') &&
            <>

              <StatsVertical icon={<Users size={24} />} color='danger' stats={admins} statTitle={t('Total Admins')} link='/' />
            </>}
        </Col>

        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<DollarSign size={24} />} color='success' stats='689' statTitle={t('Total Rent')} link='/' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Settings size={24} />} color='danger' stats='2.1k' statTitle={t('Total Maintenance')} link='/' />
        </Col>
      </Row>
      <Row>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Users size={24} />} color='success' stats='689' statTitle={t('Total Fund')} link='/' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<DollarSign size={24} />} color='danger' stats='2.1k' statTitle={t('Owner Utility')} link='/' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<DollarSign size={24} />} color='success' stats='689' statTitle={t('Employee Salary')} link='/' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<AlertCircle size={24} />} color='danger' stats='2.1k' statTitle={t('Total Complain')} link='/complain/list' />
        </Col>
      </Row>
      <Row>
        <Col xl='3' md='4' sm='6'>
          {item == 'a' &&
            <>
              <StatsVertical icon={<Users size={24} />} color='primary' stats={Owner} statTitle={t('Total Owners')} link='/' />
            </>
          }

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
