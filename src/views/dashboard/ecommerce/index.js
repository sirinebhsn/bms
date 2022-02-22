// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Icons Imports
import { AlertCircle, ArrowRight, Award, DollarSign, Eye, Heart, Home, List, MessageSquare, Monitor, Settings, ShoppingBag, Truck, User, UserCheck, UserPlus, Users } from 'react-feather'

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

const EcommerceDashboard = () => {
  const { colors } = useContext(ThemeColors)
  const trackBgColor = '#e9ecef'
  const [owner, setOwner] = useState([]);
  const [floor, setFloor] = useState([]);
  const [unit, setUnit] = useState([]);
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    getOwners();
    getFloors();
    getUnits();
    getEmployees();
  }, [])
  async function getOwners() {
    let result = await fetch("http://localhost:8000/api/countOwners");
    result = await result.json();
    setOwner(result)
  }
  async function getFloors() {
    let result = await fetch("http://localhost:8000/api/countFloors");
    result = await result.json();
    setFloor(result)
  }
  async function getUnits() {
    let result = await fetch("http://localhost:8000/api/countUnit");
    result = await result.json();
    setUnit(result)
  }
  async function getEmployees() {
    let result = await fetch("http://localhost:8000/api/countEmployees");
    result = await result.json();
    setEmployee(result)
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
          <StatsVertical icon={<Home size={24} color='red' />} color='info' stats={floor}
            statTitle='Total Floor' >
          </StatsVertical>
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Monitor size={24} />} color='warning' stats={unit}
            statTitle='Total Units' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<User size={24} />} color='danger' stats={owner} statTitle='Total Owner' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Users size={24} />} color='primary' stats='0' statTitle='Total Tenant' />
        </Col>

        {/* Stats With Icons */}
      </Row>
      <Row>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Users size={24} />} color='success' stats={employee} statTitle='Total Employees' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Users size={24} />} color='danger' stats='2.1k' statTitle='Total Committee' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<DollarSign size={24} />} color='success' stats='689' statTitle='Total Rent' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Settings size={24} />} color='danger' stats='2.1k' statTitle='Total Maintenance' />
        </Col>
      </Row>
      <Row>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<Users size={24} />} color='success' stats='689' statTitle='Total Fund' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<DollarSign size={24} />} color='danger' stats='2.1k' statTitle='Owner Utility' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<DollarSign size={24} />} color='success' stats='689' statTitle='Employee Salary' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={<AlertCircle size={24} />} color='danger' stats='2.1k' statTitle='Total Complain' />
        </Col>
      </Row>

      <Row>

        <Col lg="6" xs="12">
          <Sales2 />
        </Col>
        <Col lg="6" xs="12">
          <Sales3/>
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
