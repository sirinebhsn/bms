// ** React Imports
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

// ** Icons Imports
import { Disc, X, Circle } from 'react-feather'

// ** Config
import themeConfig from '@configs/themeConfig'
import axios from 'axios'

const VerticalMenuHeader = (props) => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover } = props
  const [userData, setUserData] = useState(null)
  const building_id = window.localStorage.getItem('building_id')
  //** Get User Details from His accessToken

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [building, setBuilding] = useState([])
  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([])
    axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
      setUserData(response.data)
    }, [])
  }, [menuHover, menuCollapsed], [])
  useEffect(() => {
    getBuilding();
  }, [])
  /* async function handleShow(building_id) {
     setSelectedBuilding(building_id)
     setShow(true)
     console.warn(building_id)
     let result = await fetch(`${API_ENDPOINT}/api/getBuilding/` + building_id);
     result = await result.json();
     console.warn(result)
 
   }*/
  function getBuilding(){
    axios.get(`${API_ENDPOINT}/api/getBuilding/${building_id}`).then(response => {
      setBuilding(response.data)


  })}
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
          {userData && userData.user_type == ('a' || 'o')
            &&
            <>
              <NavLink to='/' className='navbar-brand'>
                <span className='brand-logo'>

                  <img src={(userData && userData?.buildings?.building_image)} width='40' height='50' />
                </span>
                <h2 className='brand-text mb-0'>{(userData && userData?.buildings?.building_name)}</h2>
              </NavLink>
            </>}
          {userData && userData.user_type == 'S'
            &&
            <>
              <NavLink to='/' className='navbar-brand'>
                <span className='brand-logo'>
                  {building_id == 'null' && <>

                    <img src={themeConfig.app.appLogoImage} alt='logo' />
                  </>
                  }
                  {building_id != 'null' && <>

                    <img src={building.building_image} alt='logo' />
                  </>
                  }
                </span>
                {building_id == 'null' && <>
                  <h2 className='brand-text mb-0'>BMS</h2>
                </>
                }
                {building_id != 'null' && <>

                  <h2 className='brand-text mb-0'>{building.building_name}</h2>
                </>
                }

              </NavLink>
            </>}
          {userData && userData.user_type == 'S' &&
            <NavLink to='/' className='navbar-brand'>
              <span className='brand-logo'>

                <img src={(userData && userData?.buildings?.building_image)} width='40' height='50' />
              </span>
              <h2 className='brand-text mb-0'>{(userData && userData?.buildings?.building_name)}</h2>
            </NavLink>
          }
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
