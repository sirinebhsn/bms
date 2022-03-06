// ** React Import
import { useEffect, useState } from 'react'
//import 'react-phone-number-input/style.css'
// ** Custom Components
import Sidebar from '@components/sidebar'
import './style.css'

// ** Reactstrap Imports
import { Button, Label, Form, Row, Col, Input } from 'reactstrap'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios'
import Swal from 'sweetalert2'
const SidebarNewUsers = ({ open, toggleSidebar }) => {
  
  const [unitList, setUnitList] = useState([]);
  const [errorList, setError] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cin, setCin] = useState("");
  const [presentAdress, setPresentAdress] = useState("");
  const [permenantAdress, setPermenantAdress] = useState("");
  const [file, setFile] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {
    axios.get(`https://bmsback.herokuapp.com/api/listUnit`).then(res => {

      setUnitList(res.data);
    });
  }, [])
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
  

  const addOwner = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('telephone', telephone);
    formData.append('cin', cin);
    formData.append('presentAdress', presentAdress);
    formData.append('permenantAdress', permenantAdress);
    formData.append('file', file);
    formData.append('unit', unit);
    axios.post(`https://bmsback.herokuapp.com/api/addOwner`, formData).then(res => {
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
        new Swal("An Owner with this Email Address Aready Exist", "", "error");
        setError(res.data.errors);
      }
      else if (res.data.status == 401) {
        new Swal("This NID IS Already Attached to another Owner !", "", "error");
        setError(res.data.errors);
      }
      else if (res.data.status == 402) {
        new Swal("This PHONE NUMBER IS Already Attached to another Owner !", "", "error");
        setError(res.data.errors);
      }
     

    });


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
            <input type='text'onKeyDown={handleEnter}  className="form-control" onChange={(e) => setName(e.target.value)}
              placeholder="Name" /><br />
            <small className='text-danger'>{errorList.name}</small>
          </Col>
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='email'>
              Email <span className='text-danger'>*</span>
            </Label>
            <input type='email' onKeyDown={handleEnter}  className="form-control"
              onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br />
            <small className='text-danger'>{errorList.email}</small>

          </Col>
        </Row>
        <Row>
          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='password'>
              password <span className='text-danger'>*</span>
            </Label>
            <input type='password'onKeyDown={handleEnter}  className="form-control"
              onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br />
            <small className='text-danger'>{errorList.password}</small>

          </Col>

          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='telephone'>
              telephone <span className='text-danger'>*</span>
            </Label>
            <PhoneInput onKeyDown={handleEnter} placeholder="enter phone number"
              value={telephone} onChange={setTelephone} />
            <small className='text-danger'>{errorList.telephone}</small>

          </Col>
        </Row>
        <Row>
          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='cin'>
              cin <span className='text-danger'>*</span>
            </Label>
            <input type='text'onKeyDown={handleEnter}  className="form-control"
              onChange={(e) => setCin(e.target.value)} placeholder="Cin" /><br />
            <small className='text-danger'>{errorList.cin}</small>

          </Col>
          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='presentAdress'>
              presentAdress <span className='text-danger'>*</span>
            </Label>
            <input type='text' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setPresentAdress(e.target.value)}
              placeholder="PresentAdress" /><br />
            <small className='text-danger'>{errorList.presentAdress}</small>

          </Col>
        </Row>
        <Row>
          <Col sm='6' className='mb-1'>
            <Label className='form-label' onKeyDown={handleEnter}  for='permenantAdress'>
              Permenant Address <span className='text-danger'>*</span>
            </Label>
            <input type='text' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setPermenantAdress(e.target.value)}
              placeholder="Permenant Address" /><br />
            <small className='text-danger'>{errorList.permenantAdress}</small>

          </Col>
          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='unit'>Select Unit</Label>
            <select id='unit' onKeyDown={handleEnter}  className='form-control' onChange={(e) => setUnit(e.target.value)}
            >

              <option>Select Unit</option>
              {unitList.map((item) => {
                return (<option value={item.item_no}>{item.unit_no}</option>
                )

              })
              }
            </select>
            <small className='text-danger'>{errorList.unit}</small>


          </Col>

        </Row>
        <div className='d-flex'>
          <div className='d-flex align-items-end mt-75 ms-1'>
            <div>
                <div className="previewProfilePic">
                <img className="owner-picture" style={{ width: 150, height: 150 }}  src={imgData} />
              </div>
              <br/>
              <input id="file" onKeyDown={handleEnter}  type="file" onChange={onChangePicture} />

              <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
            </div>
          </div>
        </div>
        <br />
        <small className='text-danger'>{errorList.file}</small>

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
