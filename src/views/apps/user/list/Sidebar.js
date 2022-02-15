// ** React Import
import { useEffect, useState } from 'react'
//import 'react-phone-number-input/style.css'
// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Reactstrap Imports
import { Button, Label, Form, Row, Col } from 'reactstrap'
import PhoneInput from 'react-phone-number-input'
const SidebarNewUsers = ({ open, toggleSidebar }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cin, setCin] = useState("");
  const [presentAdress, setPresentAdress] = useState("");
  const [permenantAdress, setPermenantAdress] = useState("");
  const [file, setFile] = useState("");
 async function addOwner() {
    console.warn(name, email, password, telephone, cin, presentAdress, permenantAdress, file)
    const formData= new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('telephone', telephone);
    formData.append('cin', cin);
    formData.append('presentAdress', presentAdress);
    formData.append('permenantAdress', permenantAdress);
    formData.append('file', file);
   console.log(formData)
   let result = await fetch("http://localhost:8000/api/addOwner", {
      method: 'POST',
      body: formData
    });

    alert("Success")
    window.location.reload(false);
  }
 
  return (
    <Sidebar
      size='lg'
      open={open}
      title='Add New Owner'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form className='mt-2 pt-50'>
        <Row>
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='name'>
              Owner name <span className='text-danger'>*</span>
            </Label>
            <input type='text' className="form-control"
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Name" /><br />
          </Col>
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='email'>
              Email <span className='text-danger'>*</span>
            </Label>
            <input type='email' className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email" /><br />
          </Col>
        </Row> 
        <Row>
        <Col sm='6' className='mb-1'>
          <Label className='form-label' for='password'>
            password <span className='text-danger'>*</span>
          </Label>
          <input type='password' className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" /><br />
        </Col>

        <Col sm='6' className='mb-1'>
        <Label className='form-label' for='telephone'>
            telephone <span className='text-danger'>*</span>
          </Label>

            <PhoneInput  placeholder="enter phone number"
          value={telephone} onChange={setTelephone}/>
            <div>{telephone}</div>
        </Col>
        </Row>
        <Row>
        <Col sm='6' className='mb-1'>
          <Label className='form-label' for='cin'>
            cin <span className='text-danger'>*</span>
          </Label>
          <input type='text' className="form-control"
            onChange={(e) => setCin(e.target.value)}
            placeholder="Cin" /><br />
        </Col>
        <Col sm='6' className='mb-1'>
          <Label className='form-label' for='presentAdress'>
            presentAdress <span className='text-danger'>*</span>
          </Label>
          <input type='text' className="form-control"
            onChange={(e) => setPresentAdress(e.target.value)}
            placeholder="PresentAdress" /><br />
        </Col>
        </Row>
        <div className='mb-1'>
          <Label className='form-label' for='permenantAdress'>
            Permenant Address <span className='text-danger'>*</span>
          </Label>
          <input type='text' className="form-control"
            onChange={(e) => setPermenantAdress(e.target.value)}
            placeholder="Permenant Address" /><br />

        </div>
        <div className='mb-1'>
          <Label className='form-label' for='file'>
            File<span className='text-danger'>*</span>
          </Label>
          <input type='file' className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
            placeholder="file" /><br />
        </div>

        <Button onClick={addOwner} className='me-1' color='primary'>
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
