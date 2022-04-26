// ** Third Party Components
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap'

const StatsVertical = ({ icon, color, stats, statTitle, className, link }) => {
  const {t}= useTranslation()
  return (
    <Card className='text-center'>
      <CardBody className={className}>
        <div className={`avatar p-50 m-0 mb-1 ${color ? `bg-light-${color}` : 'bg-light-primary'}`}>
          <div className='avatar-content'>{icon}</div>
        </div>
        <h2 className='fw-bolder'>{stats}</h2>
        <p className='card-text line-ellipsis'>{statTitle}</p>
        <Link to={link}><p> {t('See More')}</p> </Link>
        
      </CardBody>
    </Card>
  )
}

export default StatsVertical

// ** PropTypes
StatsVertical.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  stats: PropTypes.string.isRequired,
  statTitle: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,

}
