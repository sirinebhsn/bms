// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import 'react-phone-number-input/style.css'

import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX, Users } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useEffect, useState } from 'react'

const UsersList = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    getOwners();
  }, [])
  async function getOwners() {
    let result = await fetch("http://localhost:8000/api/countOwners");
    result = await result.json();
    setData(result)
  }

  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='6' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Total Employees'
            icon={<Users size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'></h3>}
          />
        </Col>
      
      
      </Row>
      <Table />
    </div>
  )
}

export default UsersList
