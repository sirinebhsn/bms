// ** React Imports
import { Fragment, useEffect, useState } from 'react'
// ** Icons Imports
import { AlignJustify, Rss, Info, Image, Users, Edit, Camera } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button, Input, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'
import { isUserLoggedIn } from '@utils'
import axios from 'axios'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import UpdateProfile from './UpdateProfile'
import { useTranslation } from 'react-i18next'
const ProfileHeader = () => {

  // ** States

  const [isOpen, setIsOpen] = useState(false)
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [data, setData] = useState(null)
  const {t}= useTranslation()

  const toggle = () => setIsOpen(!isOpen)
  useEffect(() => {
    getUser()
  }, [])
  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve(), ms))
  }
  const getUser = async () => {
    await timeout(1000)
    if (isUserLoggedIn() !== null) {
      axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
        setData(response.data)
      })
    }

  }
  const [selectedUser, setSelectedUser] = useState();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseEditModal = () => setShowModal(false);
  async function handleShowModalEdit(user_id) {
    setSelectedUser(user_id)
    setShowModal(true)
    console.warn(user_id)
    let result = await fetch(`${API_ENDPOINT}/api/auth/getUser/` + user_id);
    result = await result.json();
    console.warn(result)

  }

  return (
    <Fragment>
      <Card className='profile-header mb-2'>
        <CardImg src={(data && data.buildings.building_image)} height='400' alt='User Profile Image' top />

        <div className='position-relative'>
        <div className='profile-img-container d-flex align-items-center'>
          <div className='profile-img'>
            <img className='rounded img-fluid' src={data?.user_image} alt='Card image' />
          </div>
            <div className='profile-title ms-3'>
              <h2 className='text-white'>{(data && data['user_name'])}</h2>
              <p className='text-white'>{(data && data['user_designation'])}</p>
            </div>
          </div></div>

        <div className='profile-header-nav'>
          <Navbar container={false} className='justify-content-end justify-content-md-between w-100' expand='md' light>
            <Button color='' className='btn-icon navbar-toggler' onClick={toggle}>
              <AlignJustify size={21} />
            </Button>
            <Collapse isOpen={isOpen} navbar>
              <div className='profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0'>
                <Nav className='mb-0' pills>

                </Nav>
                
                <Button color='primary'>
                  <Edit className='d-block d-md-none' size={14} />
                  <span className='fw-bold d-none d-md-block' onClick={() => handleShowModalEdit(data.user_id)}>{t('Edit')}</span>
                </Button>
              </div>
            </Collapse>
          </Navbar>
        </div>
      </Card>
      <Modal isOpen={showModal} >
        <ModalHeader >
          <h1>{t('Edit User')} </h1>
        </ModalHeader>
        <ModalBody>
          <UpdateProfile user_id={selectedUser} />
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={handleCloseEditModal}>
            {t('Close')}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default ProfileHeader
