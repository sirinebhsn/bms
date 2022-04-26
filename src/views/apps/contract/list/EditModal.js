import axios from "axios";
import { use } from "i18next";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import './style.css'
import { isUserLoggedIn } from '@utils'


const EditModal = ({ compl_id }) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [complain, setComplain] = useState([])
  const [EmpList, setEmpList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);

  useEffect(() => {
    getComplain()
    getUser()
    getEmployees()
    getData()
  }, [])
  const timeout=(ms)=>{
    return new Promise((resolve) =>setTimeout(resolve(), ms))
  }
  const getUser = async()=>{
    await timeout(1000)
    if (isUserLoggedIn() !== null) {
    axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
      setUserData(response.data)
  } )}}
  function getComplain() {
    if (compl_id) {
      axios.get(`${API_ENDPOINT}/api/getComplainById/` + compl_id).then(response =>
        setComplain(response.data)
      )
    }
  }
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
  const [compl_name, setName] = useState('');
  const [compl_email, setEmail] = useState('');
  const [compl_date, setDate] = useState('');
  const [compl_phone, setPhone] = useState('');
  const [compl_assigned_to, setAssignedTo] = useState('');
  const [compl_job_status, setStatus] = useState('');
  const [compl_complainBy, setComplainBy] = useState('');
  const [building_id, setBuildingId] = useState('');
  const [compl_title, setComplTitle] = useState('');
  const [compl_description, setComplDescription] = useState("");
  const [compl_solution, setSolution] = useState("");
  const [userData, setUserData] = useState(null)


  const [user_id, setUserId] = useState('');
  const updateInfo = async () => {
    await axios.put(`${API_ENDPOINT}/api/updateComplain/${compl_id}`, {
      compl_name: compl_name ? compl_name : complain.compl_name,
      compl_email: compl_email ? compl_email : complain.compl_email,
      compl_assigned_to: compl_assigned_to ? compl_assigned_to : complain.compl_assigned_to,
      compl_phone: compl_phone ? compl_phone : complain.compl_phone,
      compl_complainBy: compl_complainBy ? compl_complainBy : complain.compl_complainBy,
      compl_date: compl_date ? compl_date : complain.compl_date,
      compl_job_status: compl_job_status ? compl_job_status : complain.compl_job_status,
      building_id: building_id ? building_id : complain.building_id,
      user_id: user_id ? user_id : complain.user_id,
      compl_title: compl_title ? compl_title : complain.compl_title,
      compl_description: compl_description ? compl_description : complain.compl_description,
      compl_solution: compl_solution ? compl_solution : complain.compl_solution,


    }).then(response => {
      console.log(response.data)
      if (response.data.status == 200) {
        new Swal("Success", "Complain Updated successfully");
        window.location.reload()
        console.log(response.data)
      }
    }
    )
  }
  const handleUpdate = (e) => {
    e.preventDefault();

    if (compl_name || compl_assigned_to || compl_complainBy || user_id || compl_date
      || compl_email || compl_job_status || compl_phone || building_id || compl_title
      || compl_description || compl_solution)
      updateInfo();

  }
  return (

    <Card>
      <CardBody>

        <Form>
          <Row>
            <Col>

              <Label for="compl_name">Complain Name</Label>
              <input className="form-control" type="text" id="compl_name" defaultValue={complain?.compl_name} onChange={(e) => setName(e.target.value)} /> <br />

            </Col>
            <Col>
              <Label for="compl_email">Complain Email</Label>
              <input className="form-control" type="text" id="compl_email" defaultValue={complain?.compl_email} onChange={(e) => setEmail(e.target.value)} /> <br />

            </Col>
          </Row>
          <Row>
            <Col>

              <Label className='form-label' for='compl_assigned_to'>Assigned To</Label>
              <select id='compl_assigned_to' className='form-control' onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option>{complain.compl_assigned_to}</option>
                {EmpList.map((item) => {
                  return (<option value={item.user_name}>{item.user_name}</option>
                  )
                })
                }
              </select>
            </Col>
            <Col>
              <Label className='form-label' for='compl_complainBy'>Completed By</Label>
              <select id='compl_complainBy' className='form-control' onChange={(e) => setComplainBy(e.target.value)}
              >
                <option>{complain.compl_complainBy}</option>
                {EmpList.map((item) => {
                  return (<option value={item.user_name}>{item.user_name}</option>
                  )
                })
                }
              </select>
            </Col>
          </Row>
          <Row>
            <Col>

              <Label className='form-label' for='building_id'>Select Building</Label>
              <select id='building_id' className='form-control' onChange={(e) => setBuildingId(e.target.value)}
              >
                <option  >Select Building</option>
                {buildingList.map((item) => {
                  return (<option value={item.building_id}>{item.building_name}</option>
                  )

                })
                }
              </select>
            </Col>
            <Col>
              <Label className='form-label' for='compl_title'>
                Title <span className='text-danger'>*</span>
              </Label>
              <input id='compl_title' type='text' defaultValue={complain.compl_title} className="form-control" onChange={(e) => setComplTitle(e.target.value)}
                placeholder=" Title" /><br />
            </Col>
          </Row>
          <Row>
            <Col>
              <Label className='form-label' for='compl_job_status'>Select Status</Label>
              <select id='compl_job_status' className='form-control' onChange={(e) => setStatus(e.target.value)}
              >
                {complain.compl_job_status == '0' &&
                  <>
                    <option>Pending</option>
                  </>
                }
                {complain.compl_job_status == '1' &&
                  <>
                    <option>In Progress</option>
                  </>
                }
                {complain.compl_job_status == '2' &&
                  <>
                    <option>In Hold</option>
                  </>
                }
                {complain.compl_job_status == '3' &&
                  <>
                    <option>Completed</option>
                  </>
                }
                <option value="0"> Pending </option>
                <option value="1"> In Progress </option>
                <option value="2"> On Hold </option>
                <option value="3"> Completed </option>
              </select>
            </Col>
            <Col>
              <Label className='form-label' for='compl_phone'>
                Phone <span className='text-danger'>*</span>
              </Label>
              <input type='text' id='compl_phone' defaultValue={complain.compl_phone} className="form-control" onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone" />


            </Col>
          </Row>
          <Row>
            <Col>
              <Label className='form-label' for='compl_date'>
                Date <span className='text-danger'>*</span>
              </Label>
              <Flatpickr
                className='form-control'
                defaultValue={complain.compl_date}
                id='compl_date'
              
                onChange={(date) => {
                  setDate(date)
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
              <textarea type='text' id='compl_desciption' defaultValue={complain.compl_description} className="form-control"
                onChange={(e) => setComplDescription(e.target.value)} placeholder="Designation" />
            </Col>
          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='compl_solution'>
                Solution<span className='text-danger'>*</span>
              </Label>
              <textarea type='text' id='compl_solution' defaultValue={complain.compl_solution} className="form-control"
                onChange={(e) => setSolution(e.target.value)} placeholder="Solution" />
            </Col>
          </Row>
          <Col sm='12' className='mb-1'>

            <input type='hidden' id='user_id' name='user_id' value={(userData && userData.user_id)} ref={() => setUserId(userData && userData.user_id)} />

          </Col>
          <Button color='primary' onClick={handleUpdate} className='me-1'>
            Edit
          </Button>

        </Form>

      </CardBody>

    </Card>
  );

}
export default EditModal;