// ** React Import
import { useEffect, useState } from 'react'
//import 'react-phone-number-input/style.css'
// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Reactstrap Imports
import { Button, Label, Form, Row, Col } from 'reactstrap'
import { isUserLoggedIn } from '@utils'

import axios from 'axios';

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

  const [userData, setUserData] = useState([]);
  const [floorList, setFloorList] = useState([]);

  /**  Get the Data of the Current User  **/
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
        setUserData(response.data)
      })
      axios.get(`${API_ENDPOINT}/api/listFloor`).then(res=>{
        setFloorList(res.data)
        
      }
        )
    }
  })

  /* *** Unit Fields Initial States *** */
  const [unit_name, setName] = useState("");
  const [building_id, setBuilding] = useState("");
  const [floor_id, setFloor] = useState("");
  const [unit_type, setUnitType] = useState("");
  const [unit_status, setUnitStatus] = useState("");
  const [unit_roomnumber, setUnitRoomNumber] = useState("");
  const [unit_added_date, setUnitAddedDate] = useState("");
  const [unit_image, setUnitImage] = useState([]);
  const addUnit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('unit_name', unit_name);
    formData.append('building_id', building_id);
    formData.append('floor_id', floor_id);
    formData.append('unit_type', unit_type);
    formData.append('unit_status', unit_status);
    formData.append('unit_roomnumber', unit_roomnumber);
    formData.append('unit_added_date', unit_added_date);
    formData.append('unit_image', unit_image);
    console.log(formData)
    axios.post(`${API_ENDPOINT}/api/addUnit`, formData).then(res => {
      console.log(res.data)
      new Swal("Success", "success");
      window.location.reload()



    });
  }

  return (
    <Sidebar
      size='sm'
      open={open}
      title='New Unit'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form className='mt-2 pt-50'>
        <Row>
          <Col sm='12' className='mb-1'>

            <Label className='form-label' for='unit_name'>
              UNIT NAME <span className='text-danger'>*</span>
            </Label>
            <input type='text' className="form-control"

              onChange={(e) => setName(e.target.value)} placeholder="Unit name" /><br />
          </Col>
          <Col sm='12' className='mb-1'>

            <input type='hidden' id='building_id' name='building_id' value={(userData && userData?.buildings?.building_id)} ref={() => setBuilding(userData && userData?.buildings?.building_id)} />

          </Col>
        </Row>
        <Row>
          <Col sm='12' className='mb-1'>

            <Label className='form-label' for='unit_type'>
              Unit type <span className='text-danger'>*</span>
            </Label>
            <input type='text' className="form-control"

              placeholder="Unit Type" onChange={(e) => setUnitType(e.target.value) } /><br />
          </Col>

        </Row>
        <Row>
          <Col sm='12' className='mb-1'>

            <Label className='form-label' for='unit_type'>
              Unit Status <span className='text-danger'>*</span>
            </Label>
            <select>
              <option value="0"> Select Status 

              </option>

            </select>

           <br />
          </Col>

        </Row>
        <Row>

          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='floor_id'>Select Floor</Label>
            <select id='floor_id' className='form-control' onChange={(e) => setFloor(e.target.value)}
            >
              {floorList.map((item)=>
              <option value='floor_id'>{item.floor_name}</option>
              
              )}

            </select>
          </Col>
        </Row>
        <Button className='me-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary'>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers

