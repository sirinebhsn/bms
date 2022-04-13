// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import 'react-phone-number-input/style.css'

import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX, Users, Codesandbox } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useEffect, useState } from 'react'

const UsersList = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

  const [data, setData] = useState([]);
  useEffect(() => {
    getBuildings();
  }, [])
  async function getBuildings() {
    let result = await fetch(`${API_ENDPOINT}/api/countBuildings`);
    result = await result.json();
    setData(result)
  }

  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='6' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Total Buildings'
            icon={<Codesandbox size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{data}</h3>}
          />
        </Col>
        <Col lg='6' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle='Top 5 Owners'
            icon={<UserPlus size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>4,567</h3>}
          />
        </Col>
      
      </Row>
      <Table />
    </div>
  )
}

export default UsersList
