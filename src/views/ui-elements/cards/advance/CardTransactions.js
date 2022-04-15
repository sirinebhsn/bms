// ** Custom Components
import Avatar from '@components/avatar'
import { useEffect, useState } from 'react'

// ** Icons Imports
import * as Icon from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from 'reactstrap'
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import UnitList from '../../../apps/units/listUnits/Table'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CardTransactions = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
const {t}= useTranslation()
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
  async function getData() {
    let result = await fetch(`${API_ENDPOINT}/api/listVisitors`);
    result = await result.json();
    setData(result)
  }
  const avatar= defaultAvatar
  const female =require('@src/assets/images/portrait/small/avatar-s-20.jpg').default

  const renderTransactions = () => {
    return data.map(item => {
      return (
        <div key={item.id} className='transaction-item'>
          <div className='d-flex'>
            { item.sexe=='m' &&
            <>
            <Avatar className='rounded' img={avatar} imgHeight='42' imgWidth='42' />
      </>}
      { item.sexe=='f' &&
            <>
            <Avatar className='rounded' img={female} imgHeight='42' imgWidth='42' />
      </>}
            <div>
              <h6 className='transaction-title'>{item.visit_name}</h6>
              <small>{item?.unites?.unit_name}</small>
            </div>
          </div>
          <div className={`fw-bolder ${item.down ? 'text-danger' : 'text-success'}`}>{item.visit_issue_date}</div>
        </div>
      )
    })
  }

  return (
    <Card className='card-transaction'>
      <CardHeader>
        <CardTitle tag='h4'>{t('Last Visitors')}</CardTitle>
        <Icon.MoreVertical size={18} className='cursor-pointer' />
      </CardHeader>
      <CardBody>{renderTransactions()}
      </CardBody>
      <CardFooter>
        <div  style={{float: 'right'}} >
      <Link to='/visitor/list'> {t('See More')} </Link>
</div>
      </CardFooter>
    </Card>
  )
}

export default CardTransactions
