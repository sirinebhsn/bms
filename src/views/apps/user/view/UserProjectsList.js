// ** Reactstrap Imports
// ** React Imports
import { Fragment, useEffect, useState } from 'react'


import 'cleave.js/dist/addons/cleave-phone.us'

// ** Reactstrap Imports
import { Row, Col, Form, Card, Input, Label, Button, CardBody, CardTitle, CardHeader } from 'reactstrap'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios'
import Swal from 'sweetalert2'

const UserProjectsList = () => {

  const [buildingList, setBuildingList] = useState([]);
  const [errorList, setError] = useState([]);
  const [user_name, setName] = useState("");
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [user_tel, setTelephone] = useState("");
  const [user_nid, setNid] = useState("");
  const [user_pre_address, setPresentAdress] = useState("");
  const [user_per_address, setPermenantAdress] = useState("");
  const [user_image, setImage] = useState("");
  const [building_id, setBuildingid] = useState("");
  const [user_salary, setSalary] = useState("");
  const [user_type, setType] = useState("");
  const [user_status, setStatus] = useState("");
  const [user_designation, setDesignation] = useState("");
  const [user_currlang, setLang] = useState("");
  const [user_member_type, setMembertype] = useState("");
  const [user_ending_date, setEndingDate] = useState("");
  const [user_date_creation, setCreationDate] = useState("");
  
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  useEffect(() => {
    axios.get(`http://localhost:8000/api/listBuildings`).then(res => {

      setBuildingList(res.data);
    });
  }, [])
  const [imgData, setImgData] = useState('data:image/jpeg;base64,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');
  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setImage(e.target.files[0]);
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
  const addUser = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user_name', user_name);
    formData.append('user_type', user_type);
    formData.append('user_email', user_email);
    formData.append('user_password', user_password);
    formData.append('user_tel', user_tel);
    formData.append('user_nid', user_nid);
    formData.append('user_pre_address', user_pre_address);
    formData.append('user_per_address', user_per_address);
    formData.append('user_image', user_image);
    formData.append('user_designation', user_designation);
    formData.append('building_id', building_id);
    formData.append('user_member_type', user_member_type);
    formData.append('user_currlang', user_currlang);
    formData.append('user_status', user_status);
    formData.append('user_salary', user_salary);
    formData.append('user_ending_date', user_ending_date);
    formData.append('user_date_creation', user_date_creation);
    formData.append('building_id', building_id);


    axios.post(`http://localhost:8000/api/addUser`, formData).then(res => {
      if (res.data.status == 200) {
        new Swal("Success", res.data.message, "success");
        setError([]);
        window.location.reload(false);
      }
      else if (res.data.status == 422) {
        (new Swal("All Fields are required", "", "error"));
        setError(res.data.errors);
      }
      else if (res.data.status == 400) {
        new Swal("This User Already Existed", "", "error");
        setError(res.data.errors);
      }




    });
  }
  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle>
            <h1>Add New User</h1></CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>
          <Form className='mt-2 pt-50'>

            <div className='d-flex'>
              <div className='me-25'>
              <img className='rounded me-50' src={imgData} style={{ width: 150, height: 150 }} />

              </div>
              <div className='d-flex align-items-end mt-75 ms-1'>
                <div>
                  <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                    Upload
                    <div className='me-25'>

                    <Input  id='user_image' type='file'  onChange={onChangePicture} onKeyDown={handleEnter}
                      hidden accept='image/*' />
                      </div>
                  </Button>
                  <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                </div>
              </div>
            </div>
            <br />
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='user_name'>
                  User name
                </Label>

                <Input id='user_name' placeholder='user Name'
                  onChange={(e) =>
                    setName(e.target.value)}
                />

              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='user_email'>
                  User Email
                </Label>
                <Input id='user_email' placeholder='User Email'
                  onChange={(e) =>
                    setEmail(e.target.value)} />

              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='user_password'>
                  User Password
                </Label>
                <Input id='user_password' type='password' placeholder='user_password'
                  onChange={(e) =>
                    setPassword(e.target.value)} />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='user_nid'>
                  User NID
                </Label>
                <Input id='user_nid' name='user_nid' placeholder='User NID'
                  onChange={(e) =>
                    setCin(e.target.value)} />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='user'>
                  Phone Number
                </Label>
                <PhoneInput placeholder="enter phone number"
                  value={user_tel} onChange={setTelephone} />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='user_pre_address'>
                  Present Address
                </Label>
                <Input id='user_pre_address' name='user_pre_address'
                  onChange={(e) => setPresentAdress(e.target.value)} />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='user_per_address'>
                  Permenant Address
                </Label>
                <Input id='user_per_address' name='user_per_address'
                  onChange={(e) => setPermenantAdress(e.target.value)} />
              </Col>



              <Col className='mt-2' sm='12'>
                <Button onClick={addUser} className='me-1' color='primary'>
                  Add User
                </Button>
                <Button color='secondary' outline>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  )
}


export default UserProjectsList
