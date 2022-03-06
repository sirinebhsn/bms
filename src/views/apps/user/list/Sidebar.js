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
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import { useTranslation } from 'react-i18next'


const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const { t } = useTranslation()

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

  // const current = new Date();
  //const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  useEffect(() => {
    axios.get(`https://bmsback.herokuapp.com/api/listBuildings`).then(res => {

      setBuildingList(res.data);
    });
  }, [])
  const [imgData, setImgData] = useState('https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png');
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


    axios.post(`https://bmsback.herokuapp.com/api/addUser`, formData).then(res => {
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
    <Sidebar
      size='lg'
      open={open}
      title='Add New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form className='mt-2 pt-50'>

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

                <Label className='form-label' for='floor'>Select Building</Label>
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

                <Label className='form-label' for='floor'>Select Building</Label>
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

            <Label className='form-label' for='user_pre_address'>
              User Name <span className='text-danger'>*</span>
            </Label>
            <input type='text' onKeyDown={handleEnter} className="form-control" onChange={(e) => setName(e.target.value)}
              placeholder="User Name" /><br />
            <small className='text-danger'>{errorList.user_name}</small>
          </Col>
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='user_email'>
              Email <span className='text-danger'>*</span>
            </Label>
            <input type='email' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br />
            <small className='text-danger'>{errorList.USER8email}</small>

          </Col>
        </Row>
        <Row>
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='user_name'>
              User Password <span className='text-danger'>*</span>
            </Label>
            <input type='password' onKeyDown={handleEnter} className="form-control" onChange={(e) => setPassword(e.target.value)}
              placeholder="User Password" /><br />
            <small className='text-danger'>{errorList.user_password}</small>
          </Col>
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='user_nid'>
              User Nid <span classNambe='text-danger'>*</span>
            </Label>
            <input type='text' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setNid(e.target.value)} placeholder="Type user NID here" /><br />
            <small className='text-danger'>{errorList.user_nid}</small>

          </Col>
        </Row>
        <Row>

          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='user_pre_address'>
              Present Address <span className='text-danger'>*</span>
            </Label>
            <input type='text' onKeyDown={handleEnter} className="form-control" onChange={(e) => setPresentAdress(e.target.value)}
              placeholder="Present Address" /><br />
            <small className='text-danger'>{errorList.user_pre_address}</small>
          </Col>
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='user_per_address'>
              Permenant Address <span className='text-danger'>*</span>
            </Label>
            <input type='text' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setPermenantAdress(e.target.value)} placeholder="Permenant Address" /><br />
            <small className='text-danger'>{errorList.user_per_address}</small>

          </Col>
        </Row>




        <Row>
          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='user_date_creation'>
              User Starting Date <span className='text-danger'>*</span>
            </Label>
            <Datetime onKeyDown={handleEnter}

              value={user_date_creation} onChange={setCreationDate} />
          </Col>

          <small className='text-danger'>{errorList.user_date_creation}</small>
        </Row>
        <Row>
          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='user_ending_date'>
              User Ending Date <span className='text-danger'>*</span>
            </Label>
            <Datetime onKeyDown={handleEnter}

              value={user_ending_date} onChange={setEndingDate} />
          </Col>
          <small className='text-danger'>{errorList.user_ending_date}</small>
        </Row>

        <Row>
          <Label className='form-label' for='user_tel'>
            User Phone Number <span className='text-danger'>*</span>
          </Label>
          <PhoneInput onKeyDown={handleEnter} placeholder="enter phone number"
            value={user_tel} onChange={setTelephone} />
          <small className='text-danger'>{errorList.user_tel}</small>
        </Row> <br />
        <Row>
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
            <small className='text-danger'>{errorList.user_status}</small>

          </Col>
          <Col>

            <Label className='form-label' for='user_currlang'>
              Currant Language <span className='text-danger'>*</span>
            </Label>
            <input type='text' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setLang(e.target.value)} placeholder="Current Language" /><br />
            <small className='text-danger'>{errorList.user_currlang}</small>


          </Col>

        </Row>
        <Row>
          <Col>

            <Label className='form-label' for='user_designation'>
              User Designation<span className='text-danger'>*</span>
            </Label>
            <input type='text' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setDesignation(e.target.value)} placeholder="Designation" /><br />
            <small className='text-danger'>{errorList.user_designation}</small>


          </Col>
        </Row>
        <Row>
          {user_type != 'e' &&
            <>
              <Col sm='6' className='mb-1'>

                <Label className='form-label' for='user_salary'>
                  User salary <span className='text-danger'>*</span>
                </Label>
                <input disabled type='number' onKeyDown={handleEnter} className="form-control"
                  onChange={(e) => setSalary(e.target.value)} placeholder="Emlployee salary" /><br />

              </Col>
            </>
          }       {user_type == 'e' &&
            <>
              <Col sm='6' className='mb-1'>

                <Label className='form-label' for='user_per_address'>
                  User salary <span className='text-danger'>*</span>
                </Label>
                <input type='number' onKeyDown={handleEnter} className="form-control"
                  onChange={(e) => setSalary(e.target.value)} placeholder="Emlployee salary" /><br />

              </Col>
            </>
          }
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='user_member_type'>
              User Member Type <span className='text-danger'>*</span>
            </Label>
            <input type='text' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setMembertype(e.target.value)} placeholder="User Member Type" /><br />

          </Col>                </Row>
        <div className='d-flex'>
          <div className='d-flex align-items-end mt-75 ms-1'>
            <div>
              <div className="previewProfilePic">
                <img className="owner-picture" style={{ width: 150, height: 150 }} src={imgData} />
              </div>
              <br />
              <input id="user_image" onKeyDown={handleEnter} type="file" onChange={onChangePicture} />

              <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
            </div>
          </div>
        </div>
        <br />
        <small className='text-danger'>{errorList.user_image}</small>

        <Button onClick={addUser} className='me-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary'>
          Cancel
        </Button>
      </Form>
    </Sidebar >
  )
}

export default SidebarNewUsers
