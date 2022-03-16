// ** React Import
import { useEffect, useState } from 'react'
//import 'react-phone-number-input/style.css'
// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Reactstrap Imports
import { Button, Label, Form, Row, Col, Input } from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

const SidebarNewFloor = ({ open, toggleSidebar }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get(`https://bms-back.start-now.fr/public/api/auth/user`).then(response => {
      setUserData(response.data)
    })
  })


  const [errorList, setError] = useState([]);
  const [floor_num, setFloornum] = useState("");
  const [floor_name, setFloorName] = useState("");
  const [floor_added_date, setDate] = useState("");
  const [floor_area, setFloorArea] = useState("");
  const [building_id, setBuildingid] = useState("");
  const [floor_elevator, setFloorElevator] = useState("");

  const addFloor = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('floor_name', floor_name);
    formData.append('floor_num', floor_num);
    formData.append('floor_elevator', floor_elevator);
    formData.append('floor_area', floor_area);
    formData.append('floor_added_date', floor_added_date);
    formData.append('building_id', building_id);

    axios.post(`https://bms-back.start-now.fr/public/api/addFloor`, formData).then(res => {
      if (res.data.status == 200) {
        new Swal("Success", res.data.message, "success");
        setError([]);
        window.location.reload(false);

      }
      else if (res.data.status == 422) {
        new Swal("All Fields are mandetory", "", "error");
        setError(res.data.errors);
      }
      else if (res.data.status == 400) {
        new Swal("This Floor already existed", "", "error");
        setError(res.data.errors);
      }
    });


  }

  return (
    <Sidebar
      size='sm'
      open={open}
      title='New Floor'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form className='mt-2 pt-50'>
        <Row>
          <Col sm='12' className='mb-1'>

            <Label className='form-label' for='floor_num'>
              Floor Number <span className='text-danger'>*</span>
            </Label>
            <input type='number' id='floor_num' className='form-control' onChange={(e) => setFloornum(e.target.value)} />


            <br />
          </Col>

        </Row>
        <Row>
          <Col sm='12' className='mb-1'>

            <Label className='form-label' for='floor_name'>
              Floor Name <span className='text-danger'>*</span>
            </Label>
            <input type='text' id='floor_name' className='form-control' onChange={(e) => setFloorName(e.target.value)} />


            <br />
          </Col>

        </Row>

        <Row>
          <Col sm='12' className='mb-1'>



            <Label className='form-label' for='floor_elevator'>
              Floor Elevator <span className='text-danger'>*</span>
            </Label>
            <select className="form-control"
              onChange={(e) =>
                setFloorElevator(e.target.value)
              }>
              <option value=''> Select</option>
              <option value='1'>Disponible</option>
              <option value='0'>Non Disponible</option>

            </select>

            <br />
          </Col>
        </Row>
        <Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='name'>
                Floor Area <span className='text-danger'>*</span>
              </Label>
              <input type='number' id='floor_area' className='form-control' onChange={(e) => setFloorArea(e.target.value)} />


              <br />
            </Col>

          </Row>
          <Row>
            <Col sm='12' className='mb-1'>
              <Label className='form-label' for='floor_added_date'>Select Date </Label>

              <input type="date" onChange={(e) => setDate(e.target.value)} value={floor_added_date} format="yyyy-MM-dd" />
            </Col>
          </Row>

          <Col sm='12' className='mb-1'>
         
            <input type='hidden' id='building_id' name='building_id' value={(userData && userData?.buildings?.building_id)} ref={() => setBuildingid(userData && userData?.buildings?.building_id)} />

          </Col>
        </Row>
        <Button onClick={addFloor} className='me-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary'>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewFloor
/*{floor_num == 'Ground Floor' || floor_num!== '' && 
<>
</>}
*/
