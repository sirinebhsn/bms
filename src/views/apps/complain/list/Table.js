// ** React Imports
import Sidebar from './Sidebar'

import { Fragment, useEffect, useState } from 'react'

import 'react-phone-number-input/style.css'
import 'react-confirm-alert/src/react-confirm-alert.css';
// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  Table,
  Button,

  Col,
  InputGroup,
  Input,
  Progress,
  Modal

} from 'reactstrap'
// ** React Imports
//import "bootstrap/dist/css/bootstrap.css";


// ** Styles
import '@styles/react/pages/modal-create-app.scss'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Image, Mail, Phone, Search, User, X } from 'react-feather'
import Slider from './Slider';



// ** Table Header
const UsersList = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedComplain, setSelectedComplain] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  async function handleShow(compl_id) {
    setSelectedComplain(compl_id)
    setShow(true)
    console.warn(compl_id)
    let result = await fetch(`${API_ENDPOINT}/api/getComplain/` + compl_id);
    result = await result.json();
    console.warn(result)

  }
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  async function getData() {
    let result = await fetch(`${API_ENDPOINT}/api/listComplain`);
    result = await result.json();
    setData(result)
  }

  return (
    <Fragment>

      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Visitors List</CardTitle>

          <Col className='mb-1' md='6' sm='12'>
            <InputGroup >
              <Button color='primary' outline>
                <Search size={12} />
              </Button>
              <Input type='text' placeholder='Search here' />
              <Button color='primary' outline>
                Search !
              </Button>
            </InputGroup>
          </Col>
          <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
            Add New Complain
          </Button>

        </CardHeader>

        <Table>
          <thead>
            <tr>
              <th> Complain Name </th>
              <th> Complain Email </th>
              <th> Complain Phone</th>
              <th> Complain Status </th>
              <th> Employee </th>
              <th> Actions </th>

            </tr>
          </thead>
          {data.map((item) =>
            <tbody>
              <tr>
                <td> <User size={14} />&nbsp;{item.compl_name}</td>
                <td> <Mail size={14} /> &nbsp;{item.compl_email} </td>
                <td> <Phone size={14} />&nbsp; {item.compl_phone}  </td>

                <td>
                  {item.compl_job_status == '0' &&
                    <>

                      <Progress value="30" color='danger' striped='true' animated='true' style={{ width: 130, height: 15 }} />
                    </>}
                  {item.compl_job_status == '1' &&

                    <>

                      <Progress value="50" color='warning' striped='true' animated='true' style={{ width: 130, height: 15 }} />
                    </>}
                  {item.compl_job_status == '2' &&

                    <>

                      <Progress value="80" color='primary' striped='true' animated='true' style={{ width: 130, height: 15 }} />
                    </>}
                  {item.compl_job_status == '3' &&

                    <>

                      <Progress value="100" color='info' striped='true' animated='true' style={{ width: 130, height: 15 }} />
                    </>}

                </td>
                <td> <User size={14} />&nbsp; {item.compl_assigned_to}  </td>
                <td><span onClick={() => handleShow(item.compl_id)} ><Image size={20} color="#F08080"/> </span></td>




              </tr>
            </tbody>

          )}

        </Table>
        
        <Modal isOpen={show}
                  >
     
          <Slider compl_id={selectedComplain} >
          <span onClick={handleClose}> <X/></span>
          </Slider>
      </Modal>
        <br />
        <br />

      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

    </Fragment>

  )


}
export default UsersList