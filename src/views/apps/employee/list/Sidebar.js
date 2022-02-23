// ** React Import
//import 'react-phone-number-input/style.css'
// ** Custom Components
import Sidebar from '@components/sidebar'
import Select from 'react-select'

// ** Reactstrap Imports
import { Button, Label, Form, Row, Col, Dropdown, Input } from 'reactstrap'
import PhoneInput from 'react-phone-number-input'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
const SidebarNewUsers = ({ open, toggleSidebar }) => {

  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [nid, setNid] = useState("");
  const [join_date, setJoin] = useState("");
  const [end_date, setEnd] = useState("");
  const [presentAdress, setPresentAdress] = useState("");
  const [permenantAdress, setPermenantAdress] = useState("");
  const [file, setFile] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState("");
  const [salary_per_month, setSalary] = useState("");

  const [imgData, setImgData] = useState('https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png');
  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  function handleEnter(event) {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }

  const addEmployee = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('contact', contact);
    formData.append('nid', nid);
    formData.append('presentAdress', presentAdress);
    formData.append('permenantAdress', permenantAdress);
    formData.append('file', file);
    formData.append('status', status);
    formData.append('designation', designation);
    formData.append('join_date', join_date);
    formData.append('end_date', end_date);
    formData.append('salary_per_month', salary_per_month);


    axios.post(`https://bmsback.herokuapp.com/api/addEmployee`, formData).then(res => {
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
        new Swal("End Date Should Be After Join Date", "", "error");
        setError(res.data.errors);
      }

    });


  }
  return (
    <Sidebar
      size='lg'
      open={open}
      title='Add New Employee'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form className='mt-2 pt-50'>
        <Row>
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='name'>
              Employee name <span className='text-danger'>*</span>
            </Label>
            <input type='text' onKeyDown={handleEnter} className="form-control" onChange={(e) => setName(e.target.value)}
              placeholder="Name" /><br />
          </Col>
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='email'>
              Employee Email <span className='text-danger'>*</span>
            </Label>
            <input type='email' onKeyDown={handleEnter} onChange={(e) => setEmail(e.target.value)} className="form-control"
              placeholder="Email" /><br />
          </Col>
        </Row>
        <Row>
          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='password'>
              password <span className='text-danger'>*</span>
            </Label>
            <input type='password' className="form-control"
              placeholder="Password" onKeyDown={handleEnter} onChange={(e) => setPassword(e.target.value)} /><br />
          </Col>

          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='contact' onKeyDown={handleEnter}>
              Contact <span className='text-danger'>*</span>
            </Label>
            <PhoneInput placeholder="enter phone number"
              value={contact} onChange={setContact} />
          </Col>
        </Row>
        <Row>

          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='presentAdress'>
              presentAdress <span className='text-danger'>*</span>
            </Label>
            <input type='text' className="form-control"
              placeholder="PresentAdress" onKeyDown={handleEnter} onChange={(e) => setPresentAdress(e.target.value)} /><br />
          </Col>
          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='permenantAdress'>
              Permenant Address <span className='text-danger'>*</span>
            </Label>
            <input type='text' className="form-control"
              placeholder="Permenant Address" onKeyDown={handleEnter} onChange={(e) => setPermenantAdress(e.target.value)} /><br />

          </Col>
        </Row>
        <Row>
        <Col sm='6' className='mb-1'>
            <Label className='form-label' for='nid'>
              NID <span className='text-danger'>*</span>
            </Label>
            <input type='text' className="form-control"
              placeholder="Permenant Address" onKeyDown={handleEnter} onChange={(e) => setNid(e.target.value)} /><br />

          </Col>
          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='designation'>
              Designation <span className='text-danger'>*</span>
            </Label>
            <select id='designation' onChange={(e) => setDesignation(e.target.value)} className='form-control'>
              <option for=""> Select Designation</option>
              <option for="owner"> owner</option>
              <option for="admin"> admin</option>
              <option for="tenant"> tenant</option>

            </select>

          </Col>
        </Row>
        <Row>
          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='join_date' onKeyDown={handleEnter}>
              Joining Date <span className='text-danger'>*</span>
            </Label>
            <input type='date' className="form-control" onChange={(e) => setJoin(e.target.value)}

              placeholder="Joining Date" /><br />
          </Col>
          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='end_date'>
              Ending Date <span className='text-danger'>*</span>
            </Label>
            <input type='date' className="form-control" onChange={(e) => setEnd(e.target.value)}

              placeholder="Ending Date" /><br />
          </Col>
        </Row>
        <Row>

          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='salary_per_month'>
              Salary Per Month <span className='text-danger'>*</span>
            </Label>
            <input type='text' className="form-control" onChange={(e) => setSalary(e.target.value)}

              placeholder="0.00" /><br />
          </Col>
          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='status'>
              Status <span className='text-danger'>*</span>
            </Label>
            <select id='status' onChange={(e) => setStatus(e.target.value)} className='form-control'>
              <option for=""> Select Status</option>
              <option for="active"> active</option>
              <option for="leave"> leave</option>

            </select>
          </Col>
        </Row>
        <div className='d-flex'>
          <div className='d-flex align-items-end mt-75 ms-1'>
            <div>
              <div className="previewProfilePic">
                <img className="owner-picture" style={{ width: 150, height: 150 }} src={imgData} />
              </div>
              <br />
              <input id="file" onKeyDown={handleEnter} type="file" onChange={onChangePicture} />

              <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
            </div>
          </div>
        </div>
        <br />

        <Button className='me-1' color='primary' onClick={addEmployee}>
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
