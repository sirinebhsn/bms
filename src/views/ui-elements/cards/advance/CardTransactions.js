// ** Custom Components
import Avatar from '@components/avatar'

// ** Icons Imports
import * as Icon from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const CardTransactions = () => {
  const transactionsArr = [
    {
      title: 'Fuite d eau',
      color: 'light-primary',
      subtitle: 'Gasspillage',
      amount: '24/01/2022',
      Icon: Icon['Droplet'],
      down: true
    },
    {
      title: 'Fuite de gaz',
      color: 'light-success',
      subtitle: 'Danger',
      amount: '25/01/20200',
      Icon: Icon['Anchor']
    },
    {
      title: 'Electricity',
      color: 'light-danger',
      subtitle: 'Emergency',
      amount: '01/01/2022',
      Icon: Icon['BatteryCharging']
    },
    {
      title: 'Bruit',
      color: 'light-warning',
      subtitle: 'unsupportable',
      amount: '02/02/2022',
      Icon: Icon['X'],
      down: true
    },
    {
      title: 'Transfer',
      color: 'light-info',
      subtitle: 'Refund',
      amount: '04/02/2022',
      Icon: Icon['XSquare']
    }
  ]

  const renderTransactions = () => {
    return transactionsArr.map(item => {
      return (
        <div key={item.title} className='transaction-item'>
          <div className='d-flex'>
            <Avatar className='rounded' color={item.color} icon={<item.Icon size={18} />} />
            <div>
              <h6 className='transaction-title'>{item.title}</h6>
              <small>{item.subtitle}</small>
            </div>
          </div>
          <div className={`fw-bolder ${item.down ? 'text-danger' : 'text-success'}`}>{item.amount}</div>
        </div>
      )
    })
  }

  return (
    <Card className='card-transaction'>
      <CardHeader>
        <CardTitle tag='h4'>Last 5 Complains</CardTitle>
        <Icon.MoreVertical size={18} className='cursor-pointer' />
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
