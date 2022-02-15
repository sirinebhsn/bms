// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { Home, UserCheck } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'

const FloorList = () => {
  return (
    <div className='app-floor-list'>
      <Row>
        <Col lg='6' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Total Floors'
            icon={<Home size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>21,459</h3>}
          />
        </Col>
       
        <Col lg='6' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Floors Dispo'
            icon={<Home size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>19,860</h3>}
          />
        </Col>
       
      </Row>
      <Table />
    </div>
  )
}

export default FloorList
