// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Custom Components


// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'

// ** Demo Components

import ProfileHeader from './ProfileHeader'


// ** Styles
import '@styles/react/pages/page-profile.scss'

const Profile = () => {
  <script src="https://unpkg.com/react-image-crop/dist/ReactCrop.min.js"></script>

  // ** States
  const [block, setBlock] = useState(false)

  const handleBlock = () => {
    setBlock(true)
    setTimeout(() => {
      setBlock(false)
    }, 2000)
  }

 
  return (
    <Fragment>
      
        <div id='user-profile'>
          <Row>
            <Col sm='12'>
              <ProfileHeader/>
            </Col>
          </Row>
    
        </div>
    </Fragment>
  )
}

export default Profile
