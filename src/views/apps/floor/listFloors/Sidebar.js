// ** React Import
import { useEffect, useState } from 'react'
//import 'react-phone-number-input/style.css'
// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Reactstrap Imports
import { Button, Label, Form, Row, Col } from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import DateTimePicker from 'react-datetime-picker';

const SidebarNewFloor = ({ open, toggleSidebar }) => {
  const [listBuilding, setBuildingList]=useState([]);

  useEffect(() => {
    axios.get(`https://bmsbackendapp.herokuapp.com/api/listBuildings`).then(res => {

      setBuildingList(res.data);
    });
  }, [])
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

    axios.post(`https://bmsbackendapp.herokuapp.com/api/addFloor`, formData).then(res => {
      if (res.data.status == 200) {
        new Swal("Success", res.data.message, "success");
        setError([]);
        window.location.reload(false);

      }
      else if (res.data.status == 422) {
        new Swal("All Fields are mandetory", "", "error");
        setError(res.data.errors);
      }
      else if(res.data.status == 400) {
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
            <input type='number' id='floor_num' className='form-control' onChange={(e) => setFloornum(e.target.value)}/>
           

            <small className='text-danger'>{errorList.floor_num}</small>
            <br />
          </Col>

        </Row>
        <Row>
          <Col sm='12' className='mb-1'>

            <Label className='form-label' for='floor_name'>
              Floor Name <span className='text-danger'>*</span>
            </Label>
            <input type='text' id='floor_name' className='form-control' onChange={(e) => setFloorName(e.target.value)}/>
           

            <small className='text-danger'>{errorList.floor_name}</small>
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
                
              <option value='1'>Disponible</option>
              <option value='0'>Non Disponible</option>

             </select>
           
            <small className='text-danger'>{errorList.floor_elevator}</small>
            <br/>
          </Col>
        </Row>
        <Row>
        <Row>
          <Col sm='12' className='mb-1'>

            <Label className='form-label' for='name'>
              Floor Area <span className='text-danger'>*</span>
            </Label>
            <input type='number' id='floor_area' className='form-control' onChange={(e) => setFloorArea(e.target.value)}/>
           

            <small className='text-danger'>{errorList.floor_area}</small>
            <br />
          </Col>

        </Row>
        <Row>
        <Col sm='12' className='mb-1'>
        <Label className='form-label' for='floor_added_date'>Select Date </Label>

           <input type="date" onChange={(e) => setDate(e.target.value)} value={floor_added_date} format="y-MM-dd h:mm:ss a" />
          </Col>
         </Row>

          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='floor'>Select Building</Label>
            <select id='building_id'  className='form-control' onChange={(e) => setBuildingid(e.target.value)}
            >
           <option>Select BUILDING</option>
              {listBuilding.map((item) => {
                return (<option value={item.building_id}>{item.building_name}</option>
                )

              })
              }
            </select>
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
