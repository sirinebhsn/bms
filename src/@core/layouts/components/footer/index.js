// ** Icons Import
import { Heart } from 'react-feather'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const {t}= useTranslation()
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        {t('COPYRIGHT')} © {new Date().getFullYear()}{' '}
        <a href='https://start-now.fr/' target='_blank' rel='noopener noreferrer'>
          Start-Now
        </a>
        <span className='d-none d-sm-inline-block'>, {t('All rights Reserved')}</span>
      </span>
      <span className='float-md-end d-none d-md-block'>
        {t('If Not Now Then When')}
        <Heart size={14} />
      </span>
    </p>
  )
}

export default Footer
