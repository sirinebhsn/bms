// ** React Imports
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

// ** Icons Imports
import { Disc, X, Circle } from 'react-feather'

// ** Config
import themeConfig from '@configs/themeConfig'
import axios from 'axios'

const VerticalMenuHeader = props => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover } = props
  const [userData, setUserData] = useState(null)

  //** Get User Details from His accessToken
 

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([])
      axios.get(`https://bms-back.start-now.fr/public/api/auth/user`).then(response => {
        setUserData(response.data)
       })
  }, [menuHover, menuCollapsed])

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(true)}
        />
      )
    } else {
      return (
        <Circle
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(false)}
        />
      )
    }
  }

  return (
    <div className='navbar-header'>
      <ul className='nav navbar-nav flex-row'>
        <li className='nav-item me-auto'>
        {userData && userData.user_type=='a'
&&
<>        
          <NavLink to='/' className='navbar-brand'>
            <span className='brand-logo'>

              <img src={(userData && userData.buildings.building_image)} width='40' height='50' />
            </span>
            <h2 className='brand-text mb-0'>{(userData && userData.buildings.building_name)}</h2>
          </NavLink>
          </>}
          {userData && userData.user_type=='S'
&&
<>        
          <NavLink to='/' className='navbar-brand'>
            <span className='brand-logo'>

            <img src={themeConfig.app.appLogoImage} alt='logo' />
            </span>
            <h2 className='brand-text mb-0'>BMS</h2>
          </NavLink>
          </>}
        </li>
        <li className='nav-item nav-toggle'>
          <div className='nav-link modern-nav-toggle cursor-pointer'>
            <Toggler />
            <X onClick={() => setMenuVisibility(false)} className='toggle-icon icon-x d-block d-xl-none' size={20} />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default VerticalMenuHeader
