import { Fragment } from "react";
import { X } from "react-feather";
import Avatar from '@components/avatar'

const ErrorToast = () => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='danger' icon={<X size={12} />} />
          <h6 className='toast-title'>Error!</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span role='img' aria-label='toast-text'>
          👋 Invalid Picture Extension.
        </span>
      </div>
    </Fragment>
  )

export default ErrorToast