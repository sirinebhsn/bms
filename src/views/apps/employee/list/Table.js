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
import { Edit, Eye, Lock, Mail, Phone, Search, Trash, User } from 'react-feather'
import { useTranslation } from 'react-i18next'

// ** Table Header
const UsersList = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const{t}= useTranslation()
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
  async function getData() {
    let result = await fetch(`${API_ENDPOINT}/api/getEmployees`);
    result = await result.json();
    setData(result)
  }

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>{t('Employees List')}</CardTitle>
          <Col className='mb-1' md='6' sm='12'>
            <InputGroup>
              <Button color='primary'  outline>
                <Search size={12} />
              </Button>
              <Input type='text' placeholder={t('Search here')} />
              <Button color='primary' outline>
                {t('Search !')}
              </Button>
            </InputGroup>
          </Col>
          <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
            {t('Add New Employee')}
          </Button>
          
        </CardHeader>

        <Table>
          <thead>
            <tr>
              <th> {t('PICTURE')} </th>
              <th> {t('NAME')} </th>
              <th> {t('EMAIL')}</th>
              <th> {t('PASSWORD')} </th>
              <th>  {t('PHONE NUMBER')} </th>
              <th> {t('ACTIONS')} </th>

            </tr>
          </thead>

          {data.map((item) =>
            <tbody>
              <tr>
                <td> <img style={{ width: 50, height: 50 }} src={item.user_image} /> </td>

                <td> <User size={14} />&nbsp;{item.user_name}</td>
                <td> <Mail size={14} /> &nbsp;{item.email} </td>
                <td> <Lock size={14} color=" #273746 " /> &nbsp; {item.password}</td>
                <td> <Phone size={14} color="green" />&nbsp; {item.user_tel} </td>

                <td>
                  <span>
                    <Trash size={20} color="red" />
                  </span>
                  &nbsp;&nbsp;
                  <span>

                  <Edit size={20} color="#F5CBA7" />
                  </span>
                  &nbsp;&nbsp;
                  <span>
                    <Eye size={17}></Eye>
                  </span>
                </td>
              </tr>
            </tbody>
          )
          }

        </Table>
      </Card>
  
     <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>

  )


}
export default UsersList