// ** React Import
import { useEffect, useState } from 'react'
//import 'react-phone-number-input/style.css'
// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Reactstrap Imports
import { Button, Label, Form, Row, Col } from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

const SidebarNewFloor = ({ open, toggleSidebar }) => {

  const [errorList, setError] = useState([]);
  const [floor_no, setFloorno] = useState("");
  const [long_escalier, setLongEscalier] = useState("");
  const [dispo_ascenseur, setAscenseur] = useState("");

   const addFloor = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('floor_no', floor_no);
    formData.append('long_escalier', long_escalier);
    formData.append('dispo_ascenseur', dispo_ascenseur);

    axios.post(`http://localhost:8000/api/addFloor`, formData).then(res => {
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

            <Label className='form-label' for='name'>
              Floor Number <span className='text-danger'>*</span>
            </Label>
            <select id='floor_no' className='form-control' onChange={(e) => setFloorno(e.target.value)}>
             <option value=''> Select Floor </option>
             <option value='Ground Floor'> Ground Floor </option>

              <option value='First floor'> First Floor </option>
              <option value='Second Floor'> Second Floor </option>
              <option value='Third Floor'> Third Floor </option>
              <option value='Fourth Floor'> Fourth Floor </option>
              <option value='Fifth Floor'> Fifth Floor </option>


            </select>
            <small className='text-danger'>{errorList.floor_no}</small>
            <br />
          </Col>

        </Row>
        {floor_no == 'Ground Floor' || floor_no!== '' && 
<>
        <Row>
          <Col sm='12' className='mb-1'>
        


            <Label className='form-label' for='long_escalier'>
              Stair Length <span className='text-danger'>*</span>
            </Label>
            <input type='text' className="form-control"
              onChange={(e) =>
                setLongEscalier(e.target.value)
              }
              placeholder="0.00 m" />
            <small className='text-danger'>{errorList.long_escalier}</small>
            <br/>
          </Col>
        </Row>
            
        <Row>
          <Col sm='12' className='mb-1'>

            <Label className='form-label' for='dispo_ascenseur'>
              Elevator availability
              <span className='text-danger'>*</span>
            </Label>
            <select id='dispo_ascenseur' className='form-control' onChange={(e) => setAscenseur(e.target.value)}>
              <option value=''> Select Elevator availability </option>

              <option value='With Elevator'> Disponible </option>
              <option value='Without Elevator'> Non Disponible </option>
            </select>
            <small className='text-danger'>{errorList.dispo_ascenseur}</small>
            <br/>
          </Col>
        </Row>
</>}
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

