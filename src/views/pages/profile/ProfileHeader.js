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
const ProfileHeader = () => {

  // ** States

  const [isOpen, setIsOpen] = useState(false)
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [data, setData] = useState(null)

  const toggle = () => setIsOpen(!isOpen)
  useEffect(() => {
    if (isUserLoggedIn() !== null) {


      axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
        setData(response.data)
        setCropData(response?.data && response?.data?.user_image)
      })
    }
  }, [])
  const [imgData, setImgData] = useState();

  const [cropData, setCropData] = useState();
  const [cropper, setCropper] = useState();
  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setCropData(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
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

              <img className='rounded img-fluid' src={cropData} alt='Card image' />
              <div className='input-file'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3.2" />
                    <path d="M9 2l-1.83 2h-3.17c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2h-3.17l-1.83-2h-6zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                    <path d="M0 0h24v24h-24z" fill="none" />
                  </svg>
                </span>

                <input name="Select File" type="file" onChange={onChangePicture} />
              </div>

            </div>&nbsp;&nbsp;&nbsp;

            <Cropper
              style={{ height: "90%", width: "70%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview={imgData}
              src={imgData}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={true} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />


            <br />
            <br />

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
                <Button style={{ float: "right" }} onClick={getCropData}>
                  <Edit className='d-block d-md-none' size={14} />
                  <span className='fw-bold d-none d-md-block'>Edit</span>
                </Button>
                <Button color='primary'>
                  <Edit className='d-block d-md-none' size={14} />
                  <span className='fw-bold d-none d-md-block' onClick={() => handleShowModalEdit(data.user_id)}>Edit</span>
                </Button>
              </div>
            </Collapse>
          </Navbar>
        </div>
      </Card>
      <Modal isOpen={showModal} >
        <ModalHeader >
          <h1>Edit User </h1>
        </ModalHeader>
        <ModalBody>
          <UpdateProfile user_id={selectedUser} />
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={handleCloseEditModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default ProfileHeader
