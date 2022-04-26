// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import {AlertTriangle} from 'react-feather'

// ** Reactstrap Imports

const WarningToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='warning' icon={<AlertTriangle size={12} />} />
        <h6 className='toast-title'>Warning!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        All Fields Are required !
      </span>
    </div>
  </Fragment>

  )


export default WarningToast
