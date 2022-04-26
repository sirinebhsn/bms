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
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader

} from 'reactstrap'
// ** React Imports
//import "bootstrap/dist/css/bootstrap.css";


// ** Styles
import '@styles/react/pages/modal-create-app.scss'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Edit, Eye, Image, Mail, Phone, Search, Trash2, User, X } from 'react-feather'
import Slider from './Slider';
import { Link } from 'react-router-dom';
import EditModal from './EditModal';
import ComplainDetails from './DetailsModal';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';



// ** Table Header
const UsersList = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const {t}= useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedComplain, setSelectedComplain] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [])
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handleClose = () => {
    setShow(false);
    setShowModal(false)
    setShowDetails(false)
  }
  async function handleShow(compl_id) {
    setSelectedComplain(compl_id)
    setShow(true)
    console.warn(compl_id)
    let result = await fetch(`${API_ENDPOINT}/api/getComplain/` + compl_id);
    result = await result.json();
    console.warn(result)

  }
  async function showModalDetails(compl_id) {
    setSelectedComplain(compl_id)
    setShowDetails(true)
    console.warn(compl_id)
    let result = await fetch(`${API_ENDPOINT}/api/getComp/` + compl_id);
    result = await result.json();
    console.warn(result)

  }
  async function deleteOperation(compl_id) {
    let result = await fetch(`${API_ENDPOINT}/api/deleteComplain/` + compl_id, {
      method: "DELETE"

    });
    result = await result.json()
    getData()

  }

  async function handleShowModalEdit(compl_id) {
    setSelectedComplain(compl_id)
    setShowModal(true)
    console.warn(compl_id)
    let result = await fetch(`${API_ENDPOINT}/api/getComplainById/` + compl_id);
    result = await result.json();
    console.warn(result)

  }
 
  async function getData() {
    let result = await fetch(`${API_ENDPOINT}/api/listComplain`);
    result = await result.json();
    setData(result)
  }
  async function searchComplain(key) {
    if(key){
    console.warn(key)
    let result = await fetch(`${API_ENDPOINT}/api/searchComplain/` + key);
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
          <CardTitle tag='h4'>{t('Complains List')}</CardTitle>

          <Col className='mb-1' md='6' sm='12'>
            <InputGroup onChange={(e) => searchComplain(e.target.value)} >
              <Button color='primary' onChange={(e) => searchComplain(e.target.value)}  outline >
                <Search size={12} />
              </Button>
              <Input type='text' placeholder={t('Search here')} onChange={(e) => searchComplain(e.target.value)}  />
              <Button color='primary' onChange={(e) => searchComplain(e.target.value)}  outline>
                {t('Search !')}
              </Button>
            </InputGroup>
          </Col>
          <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
            {t('Add New Complain')}
          </Button>

        </CardHeader>

        <Table>
          <thead>
            <tr>
              <th> {t('COMPLAINER NAME')} </th>
              <th> {t('COMPLAINER EMAIL')} </th>
              <th> {t('ASSIGNED TO')}</th>
              <th> {t('COMPLAIN STATUS')} </th>
              <th> {('PICTURES')} </th>
              <th> {t('ACTIONS')}</th>

            </tr>
          </thead>
          {data.map((item) =>
            <tbody>
              <tr>
                <td> <User size={14} />&nbsp;{item.compl_name}</td>
                <td><Link to='/apps/email'> <Mail size={14} /></Link> &nbsp;{item.compl_email} </td>
                <td> <User size={14} />&nbsp; {item.compl_assigned_to}  </td>

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

                      <Progress value="100" color='success' striped='true' animated='true' style={{ width: 130, height: 15 }} />
                    </>}

                </td>
                <td><span onClick={() => handleShow(item.compl_id)} ><Image size={20} color="#F08080" /> </span></td>

                <td>
                <span onClick={() => {
                    new Swal({
                      title: `Are you sure you want to delete ${item.compl_name}?`,
                      text: "You will not be able to recover your data!",
                      type: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#DD6B55",
                      isConfirmed: <button onClick={()=>deleteOperation(item.compl_id)}/>,
                      closeOnConfirm: false
                    })  }} >
                    <Trash2 size={20} color="red" />
                  </span>&nbsp;
                  <span onClick={() => handleShowModalEdit(item.compl_id)}>

                    <Edit size={20} color="#A1B1B6" />
                  </span>
                  &nbsp;
                  <span onClick={() => showModalDetails(item.compl_id)}>
                    <Eye size={17}></Eye>
                  </span>
                </td>


              </tr>
            </tbody>

          )}

        </Table>

        <Modal
          isOpen={show}
        >
          <ModalHeader style={{ width: '800px', height: '0px' }} toggle={() => setShow(false)} />
          <Slider compl_id={selectedComplain} >
          </Slider>
        </Modal>
        <Modal isOpen={showModal}
        >
          <ModalHeader>
            <h1>{t('Edit Complain')} </h1>
          </ModalHeader>
          <ModalBody>
            <EditModal compl_id={selectedComplain} />
          </ModalBody>
          <ModalFooter>
            <Button variant="danger" onClick={handleClose}>
              {t('Close')}
            </Button>

          </ModalFooter>
        </Modal>

        <br />
        <br />

      <Modal isOpen={showDetails}  size='lg'>
        <ModalHeader>
          <h1>{t('Complain Details')}</h1>
        </ModalHeader>
        <ModalBody>
          <ComplainDetails compl_id={selectedComplain} />
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={handleClose}>
            {t('Close')} 
          </Button>
        </ModalFooter>
      </Modal>
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

    </Fragment>

  )


}
export default UsersList