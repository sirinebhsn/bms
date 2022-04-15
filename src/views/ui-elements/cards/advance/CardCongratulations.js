// ** Icons Imports
import { Award } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { isUserLoggedIn } from '@utils'
import { useTranslation } from 'react-i18next'

const CardCongratulations = () => {
  const { t } = useTranslation()

  const [userData, setUserData] = useState(null)
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve(), ms))
  }
  useEffect(() => {
    getUser()
  }, [])
  const getUser = async () => {
    await timeout(1000)
    if (isUserLoggedIn() !== null) {
      axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
        setUserData(response.data)
      })
    }

  }
  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <Avatar icon={<Award size={10} />} className='shadow' color='primary' size='sm' />
        <div className='text-center'>
          {
            userData && userData.user_type == 'o' &&
            <>
              <h1 className='mb-1 text-white'>{t('Welcome Owner')} , {(userData && userData['user_name'])}</h1>
              <CardText className='m-auto w-75'>
                {t('Enjoy your tour')}  <strong>{t('In you units')}</strong> {t('In')} {(userData && userData.buildings.building_name)} .
              </CardText>
            </>}
          {
            userData && userData.user_type == 'a' &&
            <>
              <h1 className='mb-1 text-white'>{t('Welcome Admin')} , {(userData && userData['user_name'])}</h1>
              <CardText className='m-auto w-75'>
               {t('Enjoy your tour')}  <strong>{t('In')} </strong> {(userData && userData.buildings.building_name)} .
              </CardText>
            </>}
          {userData && userData.user_type == 'S' &&
            <>
              <h1 className='mb-1 text-white'>{t('Welcome Super Admin')} , {(userData && userData['user_name'])}</h1>
              <CardText className='m-auto w-75'>
                {t('Enjoy your tour')}  <strong>{t('In')} BMS .</strong>
              </CardText>
            </>}
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
