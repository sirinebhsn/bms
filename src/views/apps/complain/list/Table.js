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
  Progress

} from 'reactstrap'
// ** React Imports
//import "bootstrap/dist/css/bootstrap.css";


// ** Styles
import '@styles/react/pages/modal-create-app.scss'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Mail, Phone, Search, User } from 'react-feather'



// ** Table Header
const UsersList = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

  const [sidebarOpen, setSidebarOpen] = useState(false)
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
                <td> <Phone size={14} />&nbsp; {item.compl_mobile}  </td>
{item.compl_status=='0' &&
<>
                <td>

                  <Progress value="30" color='danger' striped='true' animated='true' style={{ width: 130, height: 15 }} />
                </td>
                </>}

              </tr>
            </tbody>

          )}       

        </Table>
        <br />
        <br />

      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

    </Fragment>

  )


}
export default UsersList