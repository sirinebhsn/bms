// ** React Imports
import { useEffect, useState } from 'react'

// ** Icons Imports
import { AlignJustify, Rss, Info, Image, Users, Edit } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap'
import { isUserLoggedIn } from '@utils'
import axios from 'axios'

const ProfileHeader = () => {
  // ** States
  const [isOpen, setIsOpen] = useState(false)
  const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT
  const [data, setData] = useState(null)

  const toggle = () => setIsOpen(!isOpen)
  useEffect(() => {
    if (isUserLoggedIn() !== null) {


      axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
        setData(response.data)
      })}
  },[])

  return (
    <Card className='profile-header mb-2'>
      <CardImg src={(data && data.buildings.building_image)} height='400' alt='User Profile Image' top />
      <div className='position-relative'>
        <div className='profile-img-container d-flex align-items-center'>
          <div className='profile-img'>
            <img className='rounded img-fluid' src={data && data.user_image } alt='Card image' />
          </div>
          <div className='profile-title ms-3'>
            <h2 className='text-white'>{(data && data['user_name'])}</h2>
            <p className='text-white'>{(data && data['user_designation'])}</p>
          </div>
        </div>
      </div>
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
                <span className='fw-bold d-none d-md-block'>Edit</span>
              </Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  )
}

export default ProfileHeader
