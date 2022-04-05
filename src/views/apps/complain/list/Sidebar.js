// ** React Import
import { useEffect, useState } from 'react'
//import 'react-phone-number-input/style.css'
// ** Custom Components
import Sidebar from '@components/sidebar'
import './style.css'

// ** Reactstrap Imports
import { Button, Label, Form, Row, Col, Input, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle } from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import "react-datetime/css/react-datetime.css";
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Fragment } from 'react'
import { isUserLoggedIn } from '@utils'



const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const { t } = useTranslation()
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  // const now = moment().hour(0).minute(0);

  const history = useHistory();
  const [EmpList, setEmpList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [user_id, setUserId] = useState("");
  const [compl_name, setComplName] = useState("");
  const [compl_email, setComplEmail] = useState("");
  const [compl_description, setComplDescription] = useState("");
  const [building_id, setBuidingId] = useState("");
  const [compl_title, setComplTitle] = useState("");
  const [compl_date, setComplDate] = useState(new Date().toISOString());
  const [compl_phone, setComplPhone] = useState("");
  const [compl_solution, setSolution] = useState("");
  const [compl_job_status, setJobStatus] = useState("");
  const [compl_assigned_id, setAssigned] = useState("");
  const [compl_complainBy, setComplainBy] = useState("");
  const [userData, setUserData] = useState(null)


  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
        setUserData(response.data)
      },[])}
      getData()
      getEmployees()

  },[])
  async function getEmployees() {
    let result = await fetch(`${API_ENDPOINT}/api/getEmployees`);
    result = await result.json();
    setEmpList(result)
  }
  async function getData() {
    let result = await fetch(`${API_ENDPOINT}/api/listBuildings`);
    result = await result.json();
    setBuildingList(result)
  }

  function handleEnter(event) {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }

  const addComplain = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('building_id', building_id);
    formData.append('compl_name', compl_name);
    formData.append('compl_email', compl_email);
    formData.append('compl_assigned_id', compl_assigned_id);
    formData.append('compl_date', compl_date);
    formData.append('compl_title', compl_title);
    formData.append('compl_description', compl_description);
    formData.append('compl_date', compl_date);
    formData.append('compl_phone', compl_phone);
    formData.append('compl_solution', compl_solution);
    formData.append('compl_job_status', compl_job_status);
    formData.append('compl_complainBy', compl_complainBy);

    console.log(formData)
    axios.post(`${API_ENDPOINT}/api/addComplain`, formData).then(res => {

      if (res.data.status == 200) {
        new Swal("Success", res.data.message, "success");
        window.location.reload()


      }


    });

  }
  return (
    <Fragment>
      <Sidebar
        size='lg'
        open={open}
        title='Add New Visitor'
        headerClassName='mb-1'
        contentClassName='pt-0'
        toggleSidebar={toggleSidebar}
      >
        <Form className='mt-2 pt-50'>
          <Row>
          <Col sm='12' className='mb-1'>

            <Label className='form-label' for='building_id'>Select Building</Label>
            <select id='building_id' className='form-control' onChange={(e) => setBuidingId(e.target.value)}
            >
              <option  >Select Building</option>
              {buildingList.map((item) => {
                return (<option value={item.building_id}>{item.building_name}</option>
                )

              })
              }
            </select>
            </Col>
          </Row>
          <Row>
          <Col sm='12' className='mb-1'>

            <Label className='form-label' for='compl_assigned_id'>Assigned To</Label>
            <select id='compl_assigned_id' className='form-control' onChange={(e) => setAssigned(e.target.value)}
            >
              <option  >Select Employee</option>
              {EmpList.map((item) => {
                return (<option value={compl_assigned_id}>{item.user_name}</option>
                )
              })
              }
            </select>
            </Col>
          </Row>
          <Row>
          <Col sm='12' className='mb-1'>

            <Label className='form-label' for='compl_assigned_id'>Accomplish By</Label>
            <select id='compl_complainBy' className='form-control' onChange={(e) => setComplainBy(e.target.value)}
            >
              <option  >Select Employee</option>
              {EmpList.map((item) => {
                return (<option value={compl_complainBy}>{item.user_name}</option>
                )
              })
              }
            </select>
            </Col>
          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='compl_name'>
               Name <span className='text-danger'>*</span>
              </Label>
              <input id='compl_name' type='text' onKeyDown={handleEnter} className="form-control" onChange={(e) => setComplName(e.target.value)}
                placeholder=" Name" /><br />
            </Col>

          </Row>
          <Row>
          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='compl_job_status'>Select Status</Label>
            <select id='compl_job_status' className='form-control' onChange={(e) => setJobStatus(e.target.value)}
            >
              <option>Select Status</option>
              <option value="0"> Pending </option>
              <option value="1"> In Progress </option>
              <option value="e"> On Hold </option>
              <option value="t"> Completed </option>
            </select>
          </Col>
          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='compl_title'>
               Title <span className='text-danger'>*</span>
              </Label>
              <input id='compl_title' type='text' onKeyDown={handleEnter} className="form-control" onChange={(e) => setComplTitle(e.target.value)}
                placeholder=" Title" /><br />
            </Col>

          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='compl_email'>
               Email <span className='text-danger'>*</span>
              </Label>
              <input id='compl_email' type='email' onKeyDown={handleEnter} className="form-control" onChange={(e) => setComplEmail(e.target.value)}
                placeholder="Email" /><br />
            </Col>

          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='compl_phone'>
                Phone <span className='text-danger'>*</span>
              </Label>
              <input type='text' id='compl_phone' onKeyDown={handleEnter} className="form-control" onChange={(e) => setComplPhone(e.target.value)}
                placeholder="Phone" />
            </Col>
          </Row>
    

          <Row>

            <Col sm='12' className='mb-1'>
              <Label className='form-label' for='compl_date'>
                Date <span className='text-danger'>*</span>
              </Label>
              <Flatpickr
                className='form-control'
                value={compl_date}
                id='compl_date'
                options={{
                  dateFormat: 'Y-m-d',
                }}
                onChange = {(date) => {
                  setComplDate(date)
              }
            }
              />
            </Col>
          </Row>

          <Row>
            <Col sm='12' className='mb-1'>

            <Label className='form-label' for='compl_description'>
              Description<span className='text-danger'>*</span>
            </Label>
            <textarea type='text' id='compl_desciption' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setComplDescription(e.target.value)} placeholder="Designation" />
            </Col>

          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

            <Label className='form-label' for='compl_solution'>
              Solution<span className='text-danger'>*</span>
            </Label>
            <textarea type='text' id='compl_solution' onKeyDown={handleEnter} className="form-control"
              onChange={(e) => setSolution(e.target.value)} placeholder="Solution" />
            </Col>

          </Row>

          <Col sm='12' className='mb-1'>
         
            <input type='hidden' id='user_id' name='user_id' value={(userData && userData.user_id)} ref={() => setUserId(userData && userData.user_id)} />

          </Col>
          <br />

          <Button onClick={addComplain} className='me-1' color='primary'>
            Submit
          </Button>
          <Button type='reset' color='secondary'>
            Cancel
          </Button>
        </Form>
      </Sidebar >
    </Fragment>
  )
}
export default SidebarNewUsers
