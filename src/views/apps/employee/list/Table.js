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

  async function handleShow(id) {
    setSelectedUser(id)
    setShow(true)
    console.warn(id)
    let result = await fetch("https://bmsback.herokuapp.com/api/getOwner/" + id);
    result = await result.json();
    console.warn(result)

  }
  async function handleShowModalEdit(id) {
    setSelectedUser(id)

    setShowModal(true)
 
  
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
  async function getData() {
    let result = await fetch("https://bmsback.herokuapp.com/api/listOwner");
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
  async function search(key) {
    if(key){
    console.warn(key)
    let result = await fetch("http://localhost:8000/api/search/" + key);
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
          <CardTitle tag='h4'>Employees List</CardTitle>
          <div className="col-sm-3">
            <input type="text" onChange={(e) => search(e.target.value)} className="form-control" placeholder="Search Owner" />

          </div>
          <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
            Add New Employee
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


          

        </Table>
      </Card>

      <Modal isOpen={show}>
        <ModalHeader>
          <h1>Owner Details</h1>
        </ModalHeader>
        <ModalBody>
          <LoginForm id={selectedUser} />
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={handleClose}>
            Close 
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={showModal}>
        <ModalHeader>
          <h1>Edit Owner </h1>
        </ModalHeader>
        <ModalBody>
          <EditModal id={selectedUser} />
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