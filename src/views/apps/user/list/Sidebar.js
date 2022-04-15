// ** React Import
import { useEffect, useState } from 'react'
//import 'react-phone-number-input/style.css'
// ** Custom Components
import Sidebar from '@components/sidebar'
import './style.css'

// ** Reactstrap Imports
import { Button, Label, Form, Row, Col, Input, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle } from 'reactstrap'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios'
import Swal from 'sweetalert2'
import "react-datetime/css/react-datetime.css";
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'


import { toast } from 'react-toastify'
import InfoToast from '../toasts/InfoToast'


const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const { t } = useTranslation()
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

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
  const current = new Date();
  //const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`
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

    console.log(formData)
    axios.post(`${API_ENDPOINT}/api/auth/addUser`, formData).then(res => {
 
      if(res.data.status==201){
      new Swal("Success",res.data.message, "success");
      window.location.reload()

      }
      if(res.data.status==400){
        return(
          toast.info(<InfoToast/>, { icon: false, hideProgressBar: true })
          
        )
        }


    });

  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title= {t('Add New User')}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form className='mt-2 pt-50'>

        <Row>
          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='user_type'>{t('Select User')}</Label>
            <select id='user_type' className='form-control' onChange={(e) => setType(e.target.value)}
            >
              <option>{t('Select User')}</option>
              <option value="a"> {t('Admin')} </option>
              <option value="o"> {t('Owner')} </option>
              <option value="e"> {t('Employee')} </option>
              <option value="t"> {t('Tenant')} </option>
            </select>
          </Col>
          {user_type != 'a' &&
            <>
              <Col sm='6' className='mb-1'>

                <Label className='form-label' for='building_id'>{t('Select Building')}</Label>
                <select disabled id='building_id' className='form-control' onChange={(e) => setBuildingid(e.target.value)}
                >


                  <option>{t('Select BUILDING')}</option>
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

                <Label className='form-label' for='building_id'>{t('Select Building')}</Label>
                <select id='building_id' className='form-control' onChange={(e) => setBuildingid(e.target.value)}
                >
                  <option>{t('Select BUILDING')}</option>
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
              {t('User Name')} <span className='text-danger'>*</span>
            </Label>
            <input id='user_name' type='text' onKeyDown={handleEnter} className="form-control" onChange={(e) => setName(e.target.value)}
              placeholder={t("User Name")} /><br />
          </Col>
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='email'>
              {t('Email')} <span className='text-danger'>*</span>
            </Label>
            <input type='email' id='email' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setEmail(e.target.value)} placeholder={t("Email")} /><br />

          </Col>
        </Row>
        <Row>
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='password'>
              {t('User Password')} <span className='text-danger'>*</span>
            </Label>
            <input type='password' id='password' onKeyDown={handleEnter} className="form-control" onChange={(e) => setPassword(e.target.value)}
              placeholder={t("User Password")} /><br />
          </Col>
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='user_nid'>
              {t('User Nid')} <span className='text-danger'>*</span>
            </Label>
            <input type='text' id='user_nid' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setNid(e.target.value)} placeholder={t("Type user NID here")} /><br />

          </Col>
        </Row>
        <Row>

          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='user_pre_address'>
              {t('Present Address')} <span className='text-danger'>*</span>
            </Label>
            <input type='text' id='user_pre_address' onKeyDown={handleEnter} className="form-control" onChange={(e) => setPresentAdress(e.target.value)}
              placeholder={t("Present Address")} /><br />
          </Col>
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='user_per_address'>
              {t('Permenant Address')} <span className='text-danger'>*</span>
            </Label>
            <input type='text' id='user_per_address' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setPermenantAdress(e.target.value)} placeholder={t("Permenant Address")} /><br />

          </Col>
        </Row>




        <Row>
          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='user_date_creation'>
              {t('User Starting Date')} <span className='text-danger'>*</span>
            </Label>
            <input type="date" className='form-control' id='user_date_creation'

              onChange={(e) => setCreationDate(e.target.value)}

              dateFormat="yyyy-MM-dd"


            />
          </Col>

        </Row>
        <Row>

          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='user_ending_date'>
              {t('User Ending Date')} <span className='text-danger'>*</span>
            </Label>
            <input type='date' className='form-control'
              id='user_ending_date'
              onChange={(e) => setEndingDate(e.target.value)}
              dateFormat="yyyy-MM-dd"


            />
          </Col>
        </Row>

        <Row>
          <Label className='form-label' for='user_tel'>
            {t('Phone Number')} <span className='text-danger'>*</span>
          </Label>
          <PhoneInput
            id='user_tel'
            onKeyDown={handleEnter} placeholder={t("enter phone number")}
            value={user_tel} onChange={setTelephone} />
        </Row> <br />
        <Row>
          <Col sm='6' className='mb-1'>
            <Label className='form-label' for='user_status'>
              {t('User Status')}<span className='text-danger'>*</span>
            </Label>
            <select id='user_status' className='form-control' onChange={(e) => setStatus(e.target.value)}
            >
              <option>{t('Select Status')}</option>
              <option value="1"> {t('Active')} </option>
              <option value="2"> {t('Leave')} </option>

            </select>

          </Col>
          <Col>
            <Label className='form-label' for='user_currlang'>
              {t('Current Language')} <span className='text-danger'>*</span>
            </Label>
            <select id='user_curr_lang' className='form-control' onChange={(e) => setLang(e.target.value)}
            >
              <option>{t('Select Language')}</option>
              <option value="English"> {t('English')} </option>
              <option value="French"> {t('French')} </option>
              <option value="German"> {t('German')} </option>
              <option value="Arabic"> {('Arabic')} </option>



            </select>


          </Col>

        </Row>
        <Row>
          <Col>

            <Label className='form-label' for='user_designation'>
              {t('User Designation')}<span className='text-danger'>*</span>
            </Label>
            <textarea type='text' id='user_designation' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setDesignation(e.target.value)} placeholder={t("Designation")} /><br />


          </Col>
        </Row>
        <Row>
          {user_type != 'e' &&
            <>
              <Col sm='6' className='mb-1'>

                <Label className='form-label' for='user_salary'>
                  {t('Employee salary')} <span className='text-danger'>*</span>
                </Label>
                <input disabled type='number' id='user_salary' onKeyDown={handleEnter} className="form-control"
                  onChange={(e) => setSalary(e.target.value)} placeholder={t("Employee salary")} /><br />

              </Col>
            </>
          }       {user_type == 'e' &&
            <>
              <Col sm='6' className='mb-1'>

                <Label className='form-label' for='user_salary'>
                 {t('Employee salary')} <span className='text-danger'>*</span>
                </Label>
                <input type='number' id='user_salary' onKeyDown={handleEnter} className="form-control"
                  onChange={(e) => setSalary(e.target.value)} placeholder= {t('Employee salary')} /><br />

              </Col>
            </>
          }
          <Col sm='6' className='mb-1'>

            <Label className='form-label' for='user_member_type'>
              {t('User Member Type')} <span className='text-danger'>*</span>
            </Label>
            <select id='user_member_type' className='form-control' onChange={(e) => setMembertype(e.target.value)}
            >
              <option>{t('Select User')}</option>
              <option value="admin"> {t('Admin')} </option>
              <option value="worker"> {t('Worker')} </option>
              <option value="security guard">{('Security guard')} </option>
              <option value="guard"> {t('Guard')} </option>
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
              <input id="user_image" onKeyDown={handleEnter} type="file" onChange={onChangePicture} />

              <p className='mb-0'>{t('Allowed JPG, GIF or PNG. Max size of 800kB')}</p>
            </div>
          </div>
        </div>
        <br />

        <Button onClick={addUser} className='me-1' color='primary'>
            {t('Add User')}
        </Button>
        <Button type='reset' color='secondary'>
          {t('Cancel')}
        </Button>
      </Form>
    </Sidebar >
  )
}
export default SidebarNewUsers
