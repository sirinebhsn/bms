// ** React Import
import { useEffect, useState } from 'react'
//import 'react-phone-number-input/style.css'
// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Reactstrap Imports
import { Button, Label, Form, Row, Col } from 'reactstrap'

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
  async function getData() {
    let result = await fetch("http://localhost:8000/api/listFloor");
    result = await result.json();
    setData(result)
  }
  const [floor_no, setFloorno] = useState("");

 async function addFloor() {
    console.warn(floor_no)
    const formData= new FormData();
  
    formData.append('floor_no', floor_no);

   console.log(formData)
   let result = await fetch("http://localhost:8000/api/addFloor", {
      method: 'POST',
      body: formData
    });

    alert("Success")

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
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='name'>
              Floor Number <span className='text-danger'>*</span>
            </Label>
            <input type='text' className="form-control"
              onChange={(e) =>
                setFloorno(e.target.value)
              }
              placeholder="floor no" /><br />
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

export default SidebarNewUsers

