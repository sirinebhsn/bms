///** React Imports
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
  Form,
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
import { Edit, Lock, Search, Trash, User } from 'react-feather'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

// ** Table Header
const FloorList = () => {
  const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT
  const{t}= useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
  async function getData() {
    let result = await fetch(`${API_ENDPOINT}/api/listFloor`);
    result = await result.json();
    setData(result)
  }
  async function search(key) {
    if (key) {
      console.warn(key)
      let result = await fetch(`${API_ENDPOINT}/api/searchFloor/` + key);
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
          <CardTitle tag='h4'>{t('Floors List')}</CardTitle>
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
          <Button className='add-new-floor' color='primary' onClick={toggleSidebar}>
           {t('Add New Floor')}
          </Button>
        </CardHeader>

        <Table>
          <thead>
            <tr>
              <th> {t('FLOOR NUM')} </th>
              <th> {t('FLOOR Name')} </th>
              <th> {t('FLOOR ELEVATOR')} </th>
              <th> {t('FLOOR AREA')} </th>
              <th> {t('FLOOR BUILDING')} </th>
              <th> {t('FLOOR ADDED DATE')}</th>
              <th>{t('ACTIONS')} </th>
              <th></th>
            </tr>
          </thead>

          {data.map((item) =>

            <tbody>
              <tr>
                <td> {item.floor_num}</td>
                <td> {item.floor_name}</td>

                <td>{item.floor_elevator == 0 &&
                  <>
                    <td>{t('Not Available')}</td>

                  </>

                }
                  {item.floor_elevator == 1 &&
                    <>
                      <td> {t('Available')}</td>

                    </>

                  }  </td>
                <td> {item.floor_area}.m</td>

                <td> {item?.buildings?.building_name}</td>
                <td> {item.floor_added_date}</td>
                <td>
                  <span >
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
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

    </Fragment>

  )

}
export default FloorList
