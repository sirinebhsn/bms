// ** React Imports
import Sidebar from './Sidebar'

import { Fragment, useState } from 'react'

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
  Input

} from 'reactstrap'
// ** React Imports
//import "bootstrap/dist/css/bootstrap.css";


// ** Styles
import '@styles/react/pages/modal-create-app.scss'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Search } from 'react-feather'



// ** Table Header
const UsersList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

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
              <Input type='text'placeholder='Search here' />
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

       

        </Table>
        <br />
        <br />

      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

    </Fragment>

  )


}
export default UsersList