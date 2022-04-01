// ** Reactstrap Imports
// ** React Imports
import { Fragment, useEffect, useState } from 'react'

import 'cleave.js/dist/addons/cleave-phone.us'
import { toast } from 'react-toastify'

// ** Reactstrap Imports
import { Row, Col, Form, Card, Input, Label, Button, CardBody, CardTitle, CardHeader } from 'reactstrap'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios'
import Swal from 'sweetalert2'
import "../list/style.css"
import { useHistory } from 'react-router-dom'
import WarningToast from '../toasts/WarningToast'
import ErrorToast from '../toasts/ErrorToast'

const UserProjectsList = () => {
  const history = useHistory();
  const [buildingList, setBuildingList] = useState([]);
  const [errorList, setError] = useState([]);
  const [user_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const [user_ending_date, setEndingDate] = useState(new Date());
  const [user_date_creation, setCreationDate] = useState(new Date());

  useEffect(() => {
    axios.get(`${API_ENDPOINT}/api/listBuildings`).then(res => {

      setBuildingList(res.data);
    });
  }, [])

  const [imgData, setImgData] = useState('https://cdn1.iconfinder.com/data/icons/avatar-3/512/Manager-512.png');
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
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const addUser = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user_name', user_name);
    formData.append('user_type', user_type);
    formData.append('email', email);
    formData.append('password', password);
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


    axios.post(`${API_ENDPOINT}/api/auth/addUser`, formData).then(res => {
      console.log(res.data)

      if (res.data.status == 200) {
        new Swal("Success", res.data.message, "success");
        setError([]);
        history.push('/apps/user/list');

      }
      if (res.data.status == 422) {

      
        return (
          toast.warning(<WarningToast />, { icon: false, hideProgressBar: true })
        )

      }

      if (res.data.status == 411) {
      return(
        toast.error(<ErrorToast />, { icon: false, hideProgressBar: true })
      )

      }

    });

  }

  return (
    <Col style={{ width: '70rem' }}>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle>
            <h1>Add New User</h1></CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>
          <Form className='mt-2 pt-50'>

            <div className='d-flex'>
              <div className='me-25'>
                <img className='rounded me-50' src={imgData} style={{ width: 100, height: 100 }} />

              </div>
              <div className='d-flex align-items-end mt-75 ms-1'>
                <div>
                  <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                    Upload
                    <div className='me-25'>

                      <Input id='owner-picture' type='file' onChange={onChangePicture} onKeyDown={handleEnter}
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
                <Label className='form-label' for='user_type'>Select User</Label>
                <select id='user_type' className='form-control' onChange={(e) => setType(e.target.value)}
                >
                  <option>Select User</option>
                  <option value="a"> Admin </option>
                  <option value="o"> Owner </option>
                  <option value="e"> Employee </option>
                  <option value="t"> Tenant </option>
                </select>
              </Col>
              {user_type != 'a' &&
                <>
                  <Col sm='6' className='mb-1'>

                    <Label className='form-label' for='building_id'>Select Building</Label>
                    <select disabled id='building_id' className='form-control' onChange={(e) => setBuildingid(e.target.value)}
                    >


                      <option  >Select BUILDING</option>
                      {buildingList.map((item) => {
                        return (<option value={item.building_id}>{item.building_name}</option>
                        )

                      })
                      }
                    </select>

                  </Col>
                </>}
              {user_type == 'a' &&
                <>
                  <Col sm='6' className='mb-1'>

                    <Label className='form-label' for='building_id'>Select Building</Label>
                    <select id='building_id' className='form-control' onChange={(e) => setBuildingid(e.target.value)}
                    >


                      <option  >Select BUILDING</option>
                      {buildingList.map((item) => {
                        return (<option value={item.building_id}>{item.building_name}</option>
                        )

                      })
                      }
                    </select>

                  </Col>
                </>}
            </Row>
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
                <Label className='form-label' for='email'>
                  User Email
                </Label>
                <Input id='email' placeholder='User Email'
                  onChange={(e) =>
                    setEmail(e.target.value)} />

              </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='password'>
                  User Password
                </Label>
                <Input id='password' type='password' placeholder='password'
                  onChange={(e) =>
                    setPassword(e.target.value)} />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='user_nid'>
                  User NID
                </Label>
                <Input id='user_nid' name='user_nid' placeholder='User NID'
                  onChange={(e) =>
                    setNid(e.target.value)} />
              </Col>
            </Row>
            <Row>

              <Col sm='6' className='mb-1'>

                <Label className='form-label' for='user_pre_address'>
                  Present Address <span className='text-danger'>*</span>
                </Label>
                <input type='text' id='user_pre_address' onKeyDown={handleEnter} className="form-control" onChange={(e) => setPresentAdress(e.target.value)}
                  placeholder="Present Address" /><br />
              </Col>
              <Col sm='6' className='mb-1'>

                <Label className='form-label' for='user_per_address'>
                  Permenant Address <span className='text-danger'>*</span>
                </Label>
                <input type='text' id='user_per_address' onKeyDown={handleEnter} className="form-control"
                  onChange={(e) => setPermenantAdress(e.target.value)} placeholder="Permenant Address" /><br />
              </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='user_date_creation' >
                  User Starting Date <span className='text-danger'>*</span>
                </Label>
                <input type="date" className='form-control' id='user_date_creation'
                  onChange={(e) => setCreationDate(e.target.value)}

                  dateFormat="yyyy-MM-dd"


                />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='user_ending_date'>
                  User Ending Date <span className='text-danger'>*</span>
                </Label>
                <input type="date" className='form-control' id='user_ending_date'

                  onChange={(e) => setEndingDate(e.target.value)}

                  dateFormat="yyyy-MM-dd"


                />
              </Col>

            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='user_tel'>
                  Phone Number
                </Label>
                <PhoneInput placeholder="enter phone number" id="user_tel"
                  value={user_tel} onChange={setTelephone} />
              </Col>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='user_status'>
                  User Status<span className='text-danger'>*</span>
                </Label>
                <select id='user_status' className='form-control' onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Select Status</option>
                  <option value="1"> Active </option>
                  <option value="2"> Leave </option>

                </select>

              </Col>
            </Row>
            <Col>

              <Label className='form-label' for='user_designation'>
                User Designation<span className='text-danger'>*</span>
              </Label>
              <textarea type='text' id='user_designation' onKeyDown={handleEnter} className="form-control"
                onChange={(e) => setDesignation(e.target.value)} placeholder="Designation" /><br />


            </Col>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='user_currlang'>
                  Currant Language <span className='text-danger'>*</span>
                </Label>
                <select id='user_curr_lang' className='form-control' onChange={(e) => setLang(e.target.value)}
                >
                  <option>Select Language</option>
                  <option value="English"> English </option>
                  <option value="French"> French </option>
                  <option value="German"> German </option>
                  <option value="Arabic"> Arabic </option>



                </select>


              </Col>
              {user_type != 'e' &&
                <>
                  <Col sm='6' className='mb-1'>

                    <Label className='form-label' for='user_salary'>
                      User salary <span className='text-danger'>*</span>
                    </Label>
                    <input disabled type='number' id='user_salary' onKeyDown={handleEnter} className="form-control"
                      onChange={(e) => setSalary(e.target.value)} placeholder="Emlployee salary" /><br />

                  </Col>
                </>
              }       {user_type == 'e' &&
                <>
                  <Col sm='6' className='mb-1'>

                    <Label className='form-label' for='user_salary'>
                      User salary <span className='text-danger'>*</span>
                    </Label>
                    <input type='number' id='user_salary' onKeyDown={handleEnter} className="form-control"
                      onChange={(e) => setSalary(e.target.value)} placeholder="Emlployee salary" /><br />

                  </Col>
                </>
              }


            </Row>
            <Row>
              <Col sm='6' className='mb-1'>

                <Label className='form-label' for='user_member_type'>
                  User Member Type <span className='text-danger'>*</span>
                </Label>
                <select id='user_member_type' className='form-control' onChange={(e) => setMembertype(e.target.value)}
                >
                  <option>Select User</option>
                  <option value="admin"> Admin </option>
                  <option value="worker"> Worker </option>
                  <option value="security guard"> Security guard </option>
                  <option value="guard"> Guard </option>
                </select>
              </Col>

              <Col sm='6' className='mb-1'>
                <br />
                <Button onClick={addUser} className='me-1' color='primary'>
                  Add User
                </Button>
                <Button type='reset' className='me-1' color='secondary' >
                  Cancel
                </Button>

              </Col>

            </Row>

          </Form>
        </CardBody>
      </Card>
    </Col>)
}


export default UserProjectsList
