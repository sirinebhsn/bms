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
import { Edit,Lock,Trash, User } from 'react-feather'
import Swal from 'sweetalert2'

// ** Table Header
const FloorList = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
  async function getData() {
    let result = await fetch("http://localhost:8000/api/listFloor");
    result = await result.json();
    setData(result)
  }

  async function deleteOperation(id) {
    let result = await fetch("http://localhost:8000/api/deleteFloor/" + id, {
      method: "DELETE"

    });
    result = await result.json()

  }
  async function search(key) {
    console.warn(key)
    let result = await fetch("http://localhost:8000/api/searchFloor/" + key);
    result = await result.json();
    console.warn(result)
    setData(result)

  }


  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Floors List</CardTitle>
          <div className="col-sm-3">
            <input type="text" onChange={(e) => search(e.target.value)} className="form-control" placeholder="Search Floor" />

          </div>
          <Button className='add-new-floor' color='primary' onClick={toggleSidebar}>
            Add New Floor
          </Button>
        </CardHeader>

        <Table>
          <thead>
            <tr>
              <th> ID </th>
              <th> FLOOR NO </th>
              <th> Stair Length </th>
              <th> Elevator Availability</th>
              <th>Actions </th>
              
            </tr>
          </thead>

          {data.map((item) =>

            <tbody>
              <tr>
              <td> <Lock size={14} color=" #273746 " />  {item.id} </td>
              <td> {item.floor_no}</td>
              <td> {item.long_escalier}</td>
              <td> {item.dispo_ascenseur}</td>

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
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

    </Fragment>

  )

}
export default FloorList