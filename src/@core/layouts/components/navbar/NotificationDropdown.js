// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'
import { isUserLoggedIn } from '@utils'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'

// ** Reactstrap Imports
import { Button, Badge, Input, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Modal, ModalBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import StatusDetails from './StatusDetails'
import { useTranslation } from 'react-i18next'

const NotificationDropdown = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [data, setData] = useState([]);
  const [count, setCount] = useState("");
  const [countStatus, setCountStatus] = useState("");
  const [selectedComplain, setSelectedComplain] = useState([]);
  const [userData, setUserData] = useState([]);
  const [status, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [show, setShow] = useState(false);
  const {t}= useTranslation()

  useEffect(() => {
    getData();
    getCount();
    getUser();
    getStatus();
    getCountStatus();
  }, [])
  async function getData() {
    let result = await fetch(`${API_ENDPOINT}/api/listComplain`);
    result = await result.json();
    setData(result)
  }
  async function getStatus() {
    let result = await fetch(`${API_ENDPOINT}/api/listStatus`);
    result = await result.json();
    setStatus(result)
  }
 function getComplain(compl_id) {
  setShow(true)
    axios.get(`${API_ENDPOINT}/api/getComp/${compl_id}`).then(
      setSelectedComplain(compl_id)

    )
    console.warn(compl_id)
  }
  function getStatusById(status_id) {
    setShow(true)
    axios.get(`${API_ENDPOINT}/api/geStatus/${status_id}`).then(
      setSelectedStatus(status_id)

    )
    console.warn(status_id)
  }
 
  async function getCount() {
    let result = await fetch(`${API_ENDPOINT}/api/countComplain`);
    result = await result.json();
    setCount(result)
  }
  async function getCountStatus() {
    let result = await fetch(`${API_ENDPOINT}/api/countStatus`);
    result = await result.json();
    setCountStatus(result)
  }
  function getUser() {
    if (isUserLoggedIn() !== null) {
      axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
        setUserData(response.data)
      })
    }
  }

  // ** Notification Array
  const notificationsArray = [
    {
      img: require('@src/assets/images/portrait/small/avatar-s-15.jpg').default,
      subtitle: 'Won the monthly best seller badge.',
      title: (
        <p className='media-heading'>
          <span className='fw-bolder'>Congratulation Sam 🎉</span>winner!
        </p>
      )
    },
    {
      img: require('@src/assets/images/portrait/small/avatar-s-3.jpg').default,
      subtitle: 'You have 10 unread messages.',
      title: (
        <p className='media-heading'>
          <span className='fw-bolder'>New message</span>&nbsp;received
        </p>
      )
    },
    {
      avatarContent: 'MD',
      color: 'light-danger',
      subtitle: 'MD Inc. order updated',
      title: (
        <p className='media-heading'>
          <span className='fw-bolder'>Revised Order 👋</span>&nbsp;checkout
        </p>
      )
    },
    {
      title: <h6 className='fw-bolder me-auto mb-0'>System Notifications</h6>,
      switch: (
        <div className='form-switch'>
          <Input type='switch' id='primary' name='primary' inline='true' defaultChecked />
        </div>
      )
    },
    {
      avatarIcon: <X size={14} />,
      color: 'light-danger',
      subtitle: 'USA Server is down due to hight CPU usage',
      title: (
        <p className='media-heading'>
          <span className='fw-bolder'>Server down</span>&nbsp;registered
        </p>
      )
    },
    {
      avatarIcon: <Check size={14} />,
      color: 'light-success',
      subtitle: 'Last month sales report generated',
      title: (
        <p className='media-heading'>
          <span className='fw-bolder'>Sales report</span>&nbsp;generated
        </p>
      )
    },
    {
      avatarIcon: <AlertTriangle size={14} />,
      color: 'light-warning',
      subtitle: 'BLR Server using high memory',
      title: (
        <p className='media-heading'>
          <span className='fw-bolder'>High memory</span>&nbsp;usage
        </p>
      )
    }
  ]

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {data.map((item, index) => {
          return (
            <a key={index} className='d-flex' href='/' onClick={e => e.preventDefault()}>


              <Fragment>
                <div className='me-1'>

                  <Avatar
                    img={item?.users?.user_image}
                  />
                </div>
                <div className='list-item-body flex-grow-1'>
                  <Link to={`/complain/details/${item.compl_id}`}
                    key={selectedComplain.compl_id}
                    onClick={() => getComplain(item.compl_id)}>
                    {item.compl_title}
                  </Link>
                  <small className='notification-text'> {item?.users?.user_name}</small>

                </div>
              </Fragment>
            </a>)
        })}

      </PerfectScrollbar>

    )
  }
  const renderNotificationStatus = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {status.map((item, index) => {
          return (
            <a key={index} className='d-flex' href='/' onClick={e => e.preventDefault()}>


              <Fragment>
                <div className='me-1'>

                  <Avatar
                    img={item?.users?.user_image}
                  />
                </div>
                <div className='me-1'>
                  <span onClick={()=>getStatusById(item.status_id)}>
                  <span onClick={()=>getComplain(item.compl_id)}>
                  {item?.users?.user_name}
                  </span></span>
                </div>
                <div className='me-1'>
                  {item.compl_status == '0' &&
                    <>
                      <p>Pending</p>
                    </>}
                  {item.compl_status == '1' &&
                    <>
                      <p>In Hold</p>
                    </>}
                </div>
                <Modal isOpen={show}>
                  <ModalBody>
                    <StatusDetails compl_id={selectedComplain} status_id={selectedStatus}/>
                  </ModalBody>
                </Modal>
              </Fragment>
              
            </a>)
        })}
  
      </PerfectScrollbar>

    )
  }
  /*eslint-enable */
  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25'>
      {userData.user_type == 'e' &&
        <>
          <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>


            <Bell size={21} />

            <Badge pill color='danger' className='badge-up'>
              {count}
            </Badge>

          </DropdownToggle>
          <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0'>
            <li className='dropdown-menu-header'>
              <DropdownItem className='d-flex' tag='div' header>
                <h4 className='notification-title mb-0 me-auto'> 
                {t('Notifications')}
                 </h4>
                <Badge tag='div' color='light-primary' pill>
                  {count} {t('New')}
                </Badge>
              </DropdownItem>
            </li>
            {renderNotificationItems()}
            <li className='dropdown-menu-footer'>
              <Button color='primary' block>
               {t('Read all notifications')}
              </Button>
            </li>

          </DropdownMenu>
        </>}
      {userData.user_type == 'a' &&
        <>
          <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>


            <Bell size={21} />

            <Badge pill color='danger' className='badge-up'>
              {countStatus}
            </Badge>

          </DropdownToggle>
          <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0'>
            <li className='dropdown-menu-header'>
              <DropdownItem className='d-flex' tag='div' header>
                <h4 className='notification-title mb-0 me-auto'>Notifications</h4>
                <Badge tag='div' color='light-primary' pill>
                  {countStatus} New
                </Badge>
              </DropdownItem>
            </li>
            {renderNotificationStatus()}
            <li className='dropdown-menu-footer'>
              <Button color='primary' block>
                Read all notifications
              </Button>
            </li>

          </DropdownMenu>
        </>}

    </UncontrolledDropdown>
  
  )

}

export default NotificationDropdown
