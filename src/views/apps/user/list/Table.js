// ** React Imports
import Sidebar from './Sidebar'

import { useState, useEffect, Fragment } from 'react'

import 'react-phone-number-input/style.css'

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
  ModalFooter

} from 'reactstrap'
// ** React Imports
//import "bootstrap/dist/css/bootstrap.css";


// ** Styles
import '@styles/react/pages/modal-create-app.scss'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Edit, Eye, Lock, Mail, Phone, Trash, User } from 'react-feather'
import Swal from 'sweetalert2'
import LoginForm from './DetailsModal'
import UserInfoEdit from './UserInfoEdit'
import EditModal from './EditModal'

// ** Table Header
const UsersList = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseEditModal = () => setShowModal(false);

  async function handleShow(user_id) {
    setSelectedUser(user_id)
    setShow(true)
    console.warn(user_id)
    let result = await fetch("https://bmsback.herokuapp.com/api/getUser/" + user_id);
    result = await result.json();
    console.warn(result)

  }
  async function handleShowModalEdit(user_id) {
    setSelectedUser(user_id)
    setShowModal(true)
    console.warn(user_id)
    let result = await fetch("https://bmsback.herokuapp.com/api/getUser/" + user_id);
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
    let result = await fetch("https://bmsback.herokuapp.com/api/listUser");
    result = await result.json();
    setData(result)
  }

  async function deleteOperation(id) {
    let result = await fetch("https://bmsback.herokuapp.com/api/delete/" + id, {
      method: "DELETE"

    });
    result = await result.json()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((yes) => {
      if (yes.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'This Owner has been deleted.',
          'success'
        )

      }
      getData(); 


    })

  }
  async function searchUser(key) {
    if(key){
    console.warn(key)
    let result = await fetch("https://bmsback.herokuapp.com/api/searchUser/" + key);
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
          <CardTitle tag='h4'>Users List</CardTitle>
          <div className="col-sm-3">
            <input type="text" onChange={(e) => searchUser(e.target.value)} className="form-control" placeholder="Search User" />

          </div>
          <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
            Add New User
          </Button>
          
        </CardHeader>

        <Table>
          <thead>
            <tr>
              <th> Picture </th>
              <th> Name </th>
              <th> Email</th>
              <th> Password </th>
              <th>  Phone Number </th>
              <th> Actions </th>

            </tr>
          </thead>

          {data.map((item) =>
            <tbody>
              <tr>
                <td> <img style={{ width: 50, height: 50 }} src={"https://bmsback.herokuapp.com/" + item.user_image} /> </td>

                <td> <User size={14} />&nbsp;{item.user_name}</td>
                <td> <Mail size={14} /> &nbsp;{item.user_email} </td>
                <td> <Lock size={14} color=" #273746 " /> &nbsp; {item.user_password}</td>
                <td> <Phone size={14} color="green" />&nbsp; {item.user_tel} </td>

                <td>
                  <span onClick={() => deleteOperation(item.id)}>
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