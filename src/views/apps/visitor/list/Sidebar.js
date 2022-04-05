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



const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const { t } = useTranslation()
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  // const now = moment().hour(0).minute(0);

  const history = useHistory();
  const [UnitList, setUnitList] = useState([]);
  const [errorList, setError] = useState([]);
  const [unit_id, setUnitId] = useState("");
  const [visit_name, setName] = useState("");
  const [visit_issue_date, setIssueDate] = useState(new Date().toISOString());
  const [visit_mobile, setTelephone] = useState("");
  const [sexe, setSexe] = useState("");

  const [visit_inttime, setInttime] = useState(new Date().toISOString());
  const [visit_outtime, setOuttime] = useState(new Date().toISOString());

var current=new Date().toISOString();
  //const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  useEffect(() => {

    axios.get(`${API_ENDPOINT}/api/listUnite`).then(res => {

      setUnitList(res.data);
    });
  }, [])


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
    formData.append('visit_name', visit_name);
    formData.append('unit_id', unit_id);
    formData.append('visit_issue_date', visit_issue_date);
    formData.append('visit_inttime', visit_inttime);
    formData.append('visit_outtime', visit_outtime);
    formData.append('visit_mobile', visit_mobile);
    formData.append('sexe', sexe);

    console.log(formData)
    axios.post(`${API_ENDPOINT}/api/addVisitor`, formData).then(res => {

      if (res.data.status == 200) {
        new Swal("Success", res.data.message, "success");
        window.location.reload()


      }


    });

  }

  return (
    <Fragment>
      <Sidebar
        size='sm'
        open={open}
        title='Add New Visitor'
        headerClassName='mb-1'
        contentClassName='pt-0'
        toggleSidebar={toggleSidebar}
      >
        <Form className='mt-2 pt-50'>
          <Row>
          <Col sm='12' className='mb-1'>

            <Label className='form-label' for='unit_id'>Select Unit</Label>
            <select id='unit_id' className='form-control' onChange={(e) => setUnitId(e.target.value)}
            >


              <option  >Select Unit</option>
              {UnitList.map((item) => {
                return (<option value={item.unit_id}>{item.unit_name}</option>
                )

              })
              }
            </select>
            </Col>
          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='visit_name'>
                Visitor Name <span className='text-danger'>*</span>
              </Label>
              <input id='visit_name' type='text' onKeyDown={handleEnter} className="form-control" onChange={(e) => setName(e.target.value)}
                placeholder="User Name" /><br />
            </Col>

          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='visit_mobile'>
                Visitor Mobile <span className='text-danger'>*</span>
              </Label>
              <input type='text' id='visit_mobile' onKeyDown={handleEnter} className="form-control" onChange={(e) => setTelephone(e.target.value)}
                placeholder="Visitor Mobile" /><br />
            </Col>
          </Row>
          <Row>
              <Col sm='12' className='mb-1'>
              <Label className='form-label' for='sexe'>
            Sexe <span className='text-danger'>*</span>
          </Label>
          <select className='form-control' onChange={(e) => setSexe(e.target.value)}>
          <option value=""> Select 
            </option>
            <option value="m"> Male
            </option>
            <option value="f"> Female</option>

          </select>


              </Col>

          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='visit_inttime'>
                Visitor Int Time <span className='text-danger'>*</span>
              </Label>
              <br />
              <Flatpickr
                className='form-control'
                value={visit_inttime}
                id='visit_inttime'
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: 'H:i',
                  time_24hr: true
                }}
                onChange={date => setInttime(date)}
              />
              <br />

            </Col>
          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='visit_outtime'>
                Visitor Out Time <span className='text-danger'>*</span>
              </Label>
              <br />
              <Flatpickr
                className='form-control'
                value={visit_inttime}
                id='visit_outtime'
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: 'H:i',
                  time_24hr: true
                }}
                onChange={date => setOuttime(date)}
              />
              <br />

            </Col>
          </Row>

          <Row>

            <Col sm='12' className='mb-1'>
              <Label className='form-label' for='visit_issue_date'>
                Visit Issue Date <span className='text-danger'>*</span>
              </Label>
              <Flatpickr
                className='form-control'
                value={visit_issue_date}
                id='visit_issue_date'
                options={{
                  dateFormat: 'Y-m-d',
                }}
                onChange = {(date) => {
                  setIssueDate(date)
              }
            }
              />
            </Col>
          </Row>



          <br />

          <Button onClick={addUser} className='me-1' color='primary'>
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
