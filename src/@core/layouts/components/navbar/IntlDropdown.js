// ** Third Party Components
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from 'react-country-flag'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const IntlDropdown = (props) => {
  const {
    isRtl,
    setIsRtl,
    isHidden,
    setLayout,
    navbarType,
    footerType,
    transition,
    navbarColor,
    setIsHidden,
    contentWidth,
    menuCollapsed,
    setLastLayout,
    setTransition,
    setNavbarType,
    setFooterType,
    setNavbarColor,
    setContentWidth,
    setMenuCollapsed

  }=props
  // ** Hooks
  const { i18n } = useTranslation()
  const{t}= useTranslation()
  // ** Vars
  const langObj = {
    en: 'English',
    de: 'German',
    fr: 'French',
    pt: 'Portuguese',
    ly: 'Arabic',

  }
  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
    i18n.changeLanguage(lang)
    if(lang=='ly'){
      setIsRtl==true
    }
  }

  return (
    <UncontrolledDropdown href='/' tag='li' className='dropdown-language nav-item'>
        <DropdownToggle href='/' tag='a' className='nav-link' onClick={e => e.preventDefault()}>
        <ReactCountryFlag
          svg
          className='country-flag flag-icon'
          countryCode={i18n.language === 'en' ? 'us' : i18n.language}
        />
        <span className='selected-language'>{langObj[i18n.language]}</span>
      </DropdownToggle>
      <DropdownMenu className='mt-0' end>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'en')}>
          <ReactCountryFlag className='country-flag' countryCode='us' svg />
          <span className='ms-1'>{t('English')}</span>
        </DropdownItem>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'fr')}>
          <ReactCountryFlag className='country-flag' countryCode='fr' svg />
          <span className='ms-1'>{t('French')}</span>
        </DropdownItem>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'de')}>
          <ReactCountryFlag className='country-flag' countryCode='de' svg />
          <span className='ms-1'>{t('German')}</span>
        </DropdownItem>
        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'pt')}>
          <ReactCountryFlag className='country-flag' countryCode='pt' svg />
          <span className='ms-1'>{t('Portuguese')}</span>
        </DropdownItem>
        <DropdownItem  id='countryCode' href='/' tag='a' onClick={e => handleLangUpdate(e, 'ly')} name='RTL' checked={isRtl} onChange={() => setIsRtl(true)}>
          <ReactCountryFlag className='country-flag' countryCode='ly' svg />
          <span className='ms-1'>{t('Arabic')}</span>

        </DropdownItem>
      </DropdownMenu>

    </UncontrolledDropdown>
  )
}

export default IntlDropdown
