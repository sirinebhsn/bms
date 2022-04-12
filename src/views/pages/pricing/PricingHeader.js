// ** Reactstrap Imports
import { Input } from 'reactstrap'

const PricingHeader = ({ duration, setDuration }) => {
  const onChange = e => {
    if (e.target.checked) {
      setDuration('yearly')
    } else {
      setDuration('monthly')
    }
  }

  return (
    <div className='text-center'>
      <h1 className='mt-5'>Complain Details</h1>
      <p className='mb-2 pb-75'>
        All The complain's details that you are looking for are here
      </p>
    </div>
  )
}

export default PricingHeader
