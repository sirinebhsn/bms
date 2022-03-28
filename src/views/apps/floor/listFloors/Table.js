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
  ModalFooter

} from 'reactstrap'
// ** React Imports
//import "bootstrap/dist/css/bootstrap.css";


// ** Styles
import '@styles/react/pages/modal-create-app.scss'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Edit, Lock, Trash, User } from 'react-feather'
import Swal from 'sweetalert2'

// ** Table Header
const FloorList = () => {
  const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT

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

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Floors List</CardTitle>
          <div className="col-sm-3">
            <input type="text" onChange="" className="form-control" placeholder="Search Floor" />

          </div>
          <Button className='add-new-floor' color='primary' onClick={toggleSidebar}>
            Add New Floor
          </Button>
        </CardHeader>

        <Table>
          <thead>
            <tr>
              <th> FLOOR NUM </th>
              <th> FLOOR Name </th>
              <th> FLOOR ELEVATOR </th>
              <th> FLOOR AREA </th>
              <th> FLOOR BUILDING </th>
              <th> FLOOR ADDED DATE</th>
              <th>Actions </th>
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
                    <td> Non Disponible</td>

                  </>

                }
                  {item.floor_elevator == 1 &&
                    <>
                      <td> Disponible</td>

                    </>

                  }  </td>
                <td> {item.floor_area}</td>

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
