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
  
  return (
    <Card className='card-statistics'>
      <CardBody className='statistics-body'>
      </CardBody>
      <UsersList />

    </Card>

  )
}



export default StatsCard
