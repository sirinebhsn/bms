// ** React Import
import { useEffect, useState } from 'react'
//import 'react-phone-number-input/style.css'
// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Reactstrap Imports
import { Button, Label, Form, Row, Col } from 'reactstrap'
import axios from 'axios';

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const [floorList, setFloorList] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/listFloor`).then(res => {

      setFloorList(res.data);
    });
  }, [])


  const [unit_no, setUnitno] = useState("");
  const [description_unit, setDescriptionUnit] = useState("");
  const [floor, setFloor] = useState("");



 async function addUnit() {
    console.warn(floor,unit_no,description_unit)
    const formData= new FormData();
  
    formData.append('unit_no', unit_no);
    formData.append('description_unit', description_unit);
    formData.append('floor', floor);


   console.log(formData)
   let result = await fetch("http://localhost:8000/api/addUnit", {
      method: 'POST',
      body: formData
    });

    alert("Success")

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

            <Label className='form-label' for='name'>
              UNIT NO <span className='text-danger'>*</span>
            </Label>
            <input type='text' className="form-control"
              onChange={(e) =>
                setUnitno(e.target.value)
              }
              placeholder="Unit no" /><br />
          </Col>

        </Row> 
        <Row>
          <Col sm='12' className='mb-1'>

            <Label className='form-label' for='name'>
              Description Unit <span className='text-danger'>*</span>
            </Label>
            <input type='text' className="form-control"
              onChange={(e) =>
                setDescriptionUnit(e.target.value)
              }
              placeholder="Description Unit " /><br />
          </Col>

        </Row> 
        <Row>
          
          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='unit'>Select Floor</Label>
            <select id='floor'  className='form-control' onChange={(e) => setFloor(e.target.value)}
            >

              <option>Select Unit</option>
              {floorList.map((item) => {
                return (<option value={item.floor}>{item.floor_no}&nbsp;{item.dispo_ascenseur} </option>
                )

              })
              }
            </select>
          </Col>
        </Row>
        <Button onClick={addUnit} className='me-1' color='primary'>
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

