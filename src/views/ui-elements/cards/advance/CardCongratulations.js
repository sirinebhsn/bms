// ** Icons Imports
import { Award } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { isUserLoggedIn } from '@utils'

const CardCongratulations = () => {

  const [userData, setUserData] = useState(null)
  const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT
  
  useEffect(() => {
    if (isUserLoggedIn() !== null) {


      axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
        setUserData(response.data)
      })}
  },[])
  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <Avatar icon={<Award size={10} />} className='shadow' color='primary' size='sm' />
        <div className='text-center'>
        {
            userData && userData.user_type == 'o' &&
            <>
          <h1 className='mb-1 text-white'>Welcome Owner , {(userData && userData['user_name'])}</h1>
          <CardText className='m-auto w-75'>
            Enjoy your tower  <strong>In you units</strong> In {(userData && userData.buildings.building_name)} .
          </CardText>
        </>}
        {
            userData && userData.user_type == 'a' &&
            <>
          <h1 className='mb-1 text-white'>Welcome Admin , {(userData && userData['user_name'])}</h1>
          <CardText className='m-auto w-75'>
            Enjoy your tower  <strong>In </strong> {(userData && userData.buildings.building_name)} .
          </CardText>
        </>}
        {userData && userData.user_type == 'S' &&
            <>
          <h1 className='mb-1 text-white'>Welcome Super Admin , {(userData && userData['user_name'])}</h1>
          <CardText className='m-auto w-75'>
            Enjoy your tower  <strong>In BMS .</strong> 
          </CardText>
        </>}
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
