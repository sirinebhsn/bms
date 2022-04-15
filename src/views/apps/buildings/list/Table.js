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
  InputGroup,
  Input,
  Col

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
import { useTranslation } from 'react-i18next';

// ** Table Header
const UsersList = () => {
  const [selectedBuilding, setSeleectedBuilding] = useState();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseEditModal = () => setShowModal(false);
  const {t}= useTranslation()
  async function handleShow(building_id) {
    setSelectedUser(building_id)
    setShow(true)
    console.warn(building_id)
    let result = await fetch("https://bms-back.start-now.fr/public/api/getUser/" + user_id);
    result = await result.json();
    console.warn(result)

  }
  
  async function handleShowModalEdit(user_id) {
    setSelectedUser(user_id)
    setShowModal(true)
    console.warn(user_id)
    let result = await fetch("https://bms-back.start-now.fr/public/api/getUser/" + user_id);
    result = await result.json();
    console.warn(result) 
  
  }
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
  async function getData() {
    let result = await fetch(`${API_ENDPOINT}/api/listBuildings`);
    result = await result.json();
    setData(result)
  }

  async function deleteOperation(user_id) {
    let result = await fetch("https://bms-back.start-now.fr/public/api/deleteUser/" + user_id, {
      method: "DELETE"

    });
    result = await result.json()

    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
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
  async function search(key) {
    if (key) {
      console.warn(key)
      let result = await fetch(`${API_ENDPOINT}/api/searchBuilding/` + key);
      result = await result.json();
      console.warn(result)
      setData(result)
    }
    else {
      getData();
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>{t('Buildings List')}</CardTitle>
          <Col className='mb-1' md='6' sm='12'>
            <InputGroup onChange={(e) => search(e.target.value)}>
              <Button color='primary' onClick={search} outline>
                <Search size={12} />
              </Button>
              <Input type='text' onChange={(e) => search(e.target.value)} placeholder={t('Search here')} />
              <Button color='primary' outline>
                {t('Search !')}
              </Button>
            </InputGroup>
          </Col>
          <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
            {t('Add New Building')}
          </Button>
          
        </CardHeader>

        <Table>
          <thead>
            <tr>
              <th> {t('PICTURE')} </th>
              <th> {t('BUILDING NAME')} </th>
              <th> {t('EMAIL')}</th>
              <th> {t('BUILDING PHONE NUMBER')} </th>
              <th>  {t('BUILDING ADDRESS')} </th>
              <th> {t('ACTIONS')} </th>

            </tr>
          </thead>

          {data.map((item) =>
            <tbody>
              <tr>
                <td> <img style={{ width: 50, height: 50 }} src={item.building_image} /> </td>

                <td> <User size={14} />&nbsp;{item.building_name}</td>
                <td> <Mail size={14} /> &nbsp;{item.building_email} </td>
                <td> <Phone size={14} color="green" />&nbsp; {item.building_secrataty_mobile} </td>
                <td> <Calendar size={14} color=" #273746 " /> &nbsp; {item.building_make_year}</td>


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
      </Card>

      <Modal isOpen={show}>
        <ModalHeader>
          <h1>{t('Building Details')}</h1>
        </ModalHeader>
        <ModalBody>
          <LoginForm user_id={selectedBuilding} />
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={handleClose}>
            {t('Close')} 
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={showModal}>
        <ModalHeader>
          <h1>{t('Edit Building')} </h1>
        </ModalHeader>
        <ModalBody>
          <EditModal user_id={selectedBuilding} />
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={handleCloseEditModal}>
            {t('Close')} 
          </Button>
        </ModalFooter>
      </Modal>

     <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

    </Fragment>

  )


}
export default UsersList