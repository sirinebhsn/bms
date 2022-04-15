//** React Imports
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
  InputGroup,
  Input,
  Row,
  Col,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,

} from 'reactstrap'
// ** React Imports
//import "bootstrap/dist/css/bootstrap.css";


// ** Styles
import '@styles/react/pages/modal-create-app.scss'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Edit, Image, Lock, Search, Trash, X } from 'react-feather'

import Slider from './Slider'
import { useTranslation } from 'react-i18next'

// ** Table Header
const UnitList = () => {
  const {t}= useTranslation()
  const [selectedUnit, setSelectedUnit] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  async function handleShow(unit_id) {
    setSelectedUnit(unit_id)
    setShow(true)
    console.warn(unit_id)
    let result = await fetch(`${API_ENDPOINT}/api/getUnit/` + unit_id);
    result = await result.json();
    console.warn(result)

  }
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
  async function getData() {
    let result = await fetch(`${API_ENDPOINT}/api/listUnite`);
    result = await result.json();
    setData(result)
  }

  async function deleteOperation(id) {
    let result = await fetch(`${API_ENDPOINT}/api/deleteUnit/` + id, {
      method: "DELETE"

    });
    result = await result.json()

  }
  async function search(key) {
    if (key) {
      console.warn(key)
      let result = await fetch(`${API_ENDPOINT}/api/searchUnit/` + key);
      result = await result.json();
      console.warn(result)
      setData(result)
    }
    else {
      getData();
    }
  }
  const ModalConfig = [

  {
    id: 1,
    title: 'Dark',
    modalColor: 'modal-dark',
    btnColor: 'dark'
  }
  ]
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'> {t('Units List')} </CardTitle>

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
            {t('Add New Unit')}
          </Button>
        </CardHeader>

        <Table>
          <thead>
            <tr>
              <th> {t('UNIT NAME')}</th>
              <th> {t('BUILDING')} </th>
              <th> {t('FLOOR')} </th>
              <th> {t('STATUS')} </th>
              <th> {t('ROOM NUMBER')} </th>
              <th> {t('TYPE')} </th>
              <th> {t('PICTURES')} </th>
              <th> {t('ACTIONS')} </th>

            </tr>
          </thead>

          {data.map((item) =>

            <tbody>
              <tr>
                <td> {item.unit_name} </td>
                <td> {item?.buildings?.building_name}</td>
                <td> {item.floor_id}</td>
                <td> {item.unit_status}</td>
                <td> {item.unit_roomnumber}</td>
                <td> {item?.types?.unit_type}</td>
                <td><span onClick={() => handleShow(item.unit_id)} ><Image size={20} color="#F08080"/> </span></td>




                <td>
                  <span onClick={() => deleteOperation(item.id)}>
                    <Trash size={20} color="red" />
                  </span>
                  &nbsp;&nbsp;
                  <Edit size={20} color="#F5CBA7" />
                  &nbsp;&nbsp;

                </td>
              </tr>
            </tbody>
          )
          }


        </Table>
      
        <Modal isOpen={show}
                  >
     
          <Slider unit_id={selectedUnit} >
          <span onClick={handleClose}> <X/></span>
          </Slider>
      </Modal>

      </Card>

  
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

    </Fragment>

  )

}
export default UnitList