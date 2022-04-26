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
import { useTranslation } from 'react-i18next'

const UsersList = () => {
  const{t}=useTranslation()

 
  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='6' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle={t('Total Employees')}
            icon={<Users size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'></h3>}
          />
        </Col>
        <Col lg='6' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle={t('Top 5 Employees')}
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
