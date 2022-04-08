// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power, Home } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import axios from 'axios'
import Building from './BuildingCard'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  const [userData, setUserData] = useState(null)
  const [buildingList, setBuildingList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT

  function handleShow() {
    setShow(true)
    axios.get(`${API_ENDPOINT}/api/listBuildings`).then(res => {

      setBuildingList(res.data);
    },[])
  }
  const timeout=(ms)=>{
    return new Promise((resolve) =>setTimeout(resolve(), ms))
  }
  //** Get User Details from His accessToken
  useEffect(() => {
    getUser()
 
  },[])
  const getUser=async()=>{
    await timeout(1000)
    if (isUserLoggedIn() !== null) {
      axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
        setUserData(response.data)
      })}
  }
  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(userData && userData['user_name'])}</span><br/>
          {
            userData && userData.user_type == 'S' &&
            <>
              <span className='user-status'>Super Admin</span>

            </>
          // user_type== "a" For admin 
          }
          {
            userData && userData.user_type == 'a' &&
            <>
              <span className='user-status'>Admin</span>

            </>

          }
           {
            userData && userData.user_type == 'o' &&
            <>
              <span className='user-status'>Owner</span>

            </>

          }



        </div>
        <Avatar img={userData && userData.user_image || userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/pages/profile'>
          <User size={14} className='me-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem>
        {
          userData && userData.user_type == 'S' &&
          <>
            <DropdownItem >
              <Home size={14} className='me-75' />
              <span className='align-middle' onClick={() => handleShow(buildingList)}>Buildings</span>
            </DropdownItem>
          </>
        }
        <DropdownItem tag={Link} to='/apps/todo'>
          <CheckSquare size={14} className='me-75' />
          <span className='align-middle'>Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/chat'>
          <MessageSquare size={14} className='me-75' />
          <span className='align-middle'>Chats</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/pages/account-settings'>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/pages/pricing'>
          <CreditCard size={14} className='me-75' />
          <span className='align-middle'>Pricing</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/pages/faq'>
          <HelpCircle size={14} className='me-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
      <Modal isOpen={show}>
        <ModalHeader>
          <h1>Buildings</h1>
        </ModalHeader>
        <ModalBody>
          <Building />
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </UncontrolledDropdown>

  )

}

export default UserDropdown
