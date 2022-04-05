// ** React Imports
import Sidebar from './Sidebar'

import { useState, useEffect, Fragment } from 'react'

import 'react-phone-number-input/style.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  InputGroup,
  Input

} from 'reactstrap'
// ** React Imports
//import "bootstrap/dist/css/bootstrap.css";


// ** Styles
import '@styles/react/pages/modal-create-app.scss'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Calendar, Clock, Edit, Eye, Lock, Mail, Phone, Search, Trash, User } from 'react-feather'
import Swal from 'sweetalert2'
import LoginForm from './DetailsModal'
import UserInfoEdit from './UserInfoEdit'
import EditModal from './EditModal'
import ReactPaginate from 'react-paginate';


// ** Table Header
const UsersList = () => {
  const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT

  const [selectedUser, setSelectedUser] = useState();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseEditModal = () => setShowModal(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    // When the handler is invoked

    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  async function handleShow(user_id) {
    setSelectedUser(user_id)
    setShow(true)
    console.warn(user_id)
    let result = await fetch(`${API_ENDPOINT}/api/auth/getUser/` + user_id);
    result = await result.json();
    console.warn(result)

  }
  
  async function handleShowModalEdit(user_id) {
    setSelectedUser(user_id)
    setShowModal(true)
    console.warn(user_id)
    let result = await fetch(`${API_ENDPOINT}/api/auth/getUser/` + user_id);
    result = await result.json();
    console.warn(result) 
  
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
  async function getData() {
    let result = await fetch(`${API_ENDPOINT}/api/listVisitors`);
    result = await result.json();
    setData(result)
  }

  async function deleteOperation(user_id) {
    let result = await fetch(`${API_ENDPOINT}/api/deleteUser/` + user_id, {
      method: "DELETE"

    });
    result = await result.json()

    confirmAlert({
      title: 'Confirm to submit',
      message: `Are you sure to do this. ${data?.user_id}` ,
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes'),

        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });


      getData(); 
  

    
  }
  async function searchUser(key) {
    if(key){
    console.warn(key)
    let result = await fetch(`${API_ENDPOINT}/api/searchUser/` + key);
    result = await result.json();
    console.warn(result)
    setData(result)
    }
    else{
      getData();
    }
  }

  return (
    <Fragment>

      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Visitors List</CardTitle>
         
          <Col className='mb-1' md='6' sm='12'>
            <InputGroup onChange={(e) => searchUser(e.target.value)}>
              <Button color='primary' onClick={searchUser} outline>
                <Search size={12} />
              </Button>
              <Input type='text' onChange={(e) => searchUser(e.target.value)} placeholder='Search here' />
              <Button color='primary' outline>
                Search !
              </Button>
            </InputGroup>
          </Col>
           <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
            Add New Visitor
          </Button>
          
        </CardHeader>

        <Table>
          <thead>
            <tr>
              <th> Visitor Name </th>
              <th> Visitor Mobile </th>
              <th> Issue Date</th>
              <th> Int Time </th>
              <th>  Out Time </th>
              <th> Actions </th>

            </tr>
          </thead>

          {data.map((item) =>
            <tbody>
              <tr>

                <td> <User size={14} />&nbsp;{item.visit_name}</td>
                <td> <Mail size={14} /> &nbsp;{item.visit_mobile} </td>
                <td> <Calendar size={14}/>&nbsp; {item.visit_issue_date}  </td>
                <td> <Clock size={14}/>&nbsp; {item.visit_inttime}  </td>
                <td> <Clock size={14}/>&nbsp; {item.visit_outtime}  </td>

                <td>
                  <span onClick={() => deleteOperation(item.user_id)}>
                    <Trash size={20} color="red" />
                  </span>
                  &nbsp;&nbsp;
                  <span onClick={() => handleShowModalEdit(item.user_id)}>

                  <Edit size={20} color="#F5CBA7" />
                  </span>
                  &nbsp;&nbsp;
                  <span onClick={() => handleShow(item.user_id)}>
                    <Eye size={17}></Eye>
                  </span>
                </td>
              </tr>
            </tbody>
          )
          }

        </Table>
        <br/>
        <br/>
       
      </Card>

      <Modal isOpen={show}>
        <ModalHeader>
          <h1>User Details</h1>
        </ModalHeader>
        <ModalBody>
          <LoginForm user_id={selectedUser} />
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={handleClose}>
            Close 
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={showModal}>
        <ModalHeader>
          <h1>Edit User </h1>
        </ModalHeader>
        <ModalBody>
          <EditModal user_id={selectedUser} />
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={handleCloseEditModal}>
            Close 
          </Button>
        </ModalFooter>
      </Modal>

     <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

    </Fragment>

  )


}
export default UsersList