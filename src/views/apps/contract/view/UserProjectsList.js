// ** Reactstrap Imports
// ** React Imports
import 'cleave.js/dist/addons/cleave-phone.us'
import { useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
// ** Reactstrap Imports
import { Row, Col, Form, Card, Input, Label, Button, CardBody, CardTitle, CardHeader } from 'reactstrap'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import "../list/style.css"
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import "./index.css";

const assignObjectPaths = (obj, stack) => {
  Object.keys(obj).forEach(k => {
    const node = obj[k];
    if (typeof node === "object") {
      node.path = stack ? `${stack}.${k}` : k;
      assignObjectPaths(node, node.path);
    }
  });
};
let listUnitsData = []

const UserProjectsList = () => {


  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const { t } = useTranslation()
  const [date, setDate] = useState(new Date().toLocaleString() + "")
  const [unitList, setUnitList] = useState([]);
  const [objectPathsAssigned, setObjectPathsAssigned] = useState(false)
  const [ownerList, setOwnerList] = useState([]);
  const [tenantList, setTenantList] = useState([]);
  const [periodList, setPeriodList] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState('');


  useEffect(() => {
    getOwner()
    getTenant()
    getUnit()
    getPeriods()
  }, [])
  useEffect(() => {
    if (objectPathsAssigned) {
      setUnitList(listUnitsData)
    }
  }, [objectPathsAssigned])
  async function handleShow(unit_id) {
    setSelectedUnit(unit_id)
    console.warn(unit_id)
    let result = await fetch(`${API_ENDPOINT}/api/getUnit/` + unit_id);
    result = await result.json();
    console.warn(result)

  }
  function getUnit() {
    axios.get(`${API_ENDPOINT}/api/listUnite`).then(response => {

      listUnitsData = [...response.data];
      assignObjectPaths(response.data)
      setObjectPathsAssigned(true)
      console.log(listUnitsData)
    }
    )
  }
  function getOwner() {
    axios.get(`${API_ENDPOINT}/api/getOwner`).then(response =>
      setOwnerList(response.data)
    )
  }
  function getTenant() {
    axios.get(`${API_ENDPOINT}/api/getTenant`).then(response =>
      setTenantList(response.data)
    )
  }

  // console.log('units', unitList)
  function getPeriods() {
    axios.get(`${API_ENDPOINT}/api/listPeriodTypes`).then(response =>
      setPeriodList(response.data)

    )
  }




  /*async function getRent(unit_id) {
    setSelectedUnit(unit_id)
    let result = await fetch(`${API_ENDPOINT}/api/getRent/` + unit_id);
    result = await result.json();
    console.warn(result)
  }*/
  const onChange = (currentNode, selectedNodes) => {
    console.log("path::", currentNode.path);

  };


  return (
    <Col style={{ width: '70rem' }}>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle>
            <h1>Add Contract</h1></CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>
          <Form className='mt-2 pt-50'>
            <Row>
       
              <Col sm='6' className='mb-1'>
                <DropdownTreeSelect style={{width:'400'}} data={unitList}
                onChange={onChange}      
              mode='radioSelect' 
                 />
                 </Col>

                 
          </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' >Select Owner</Label>
                <select className='form-control'>
                  <option>Select Owner</option>
                  {ownerList.map((item) => {
                    return (<option value=''>{item.user_name}</option>
                    )

                  })
                  }
                </select>
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' >Select Tenant</Label>
                <select className='form-control'>
                  <option>Select Tenant
                  </option>
                  {tenantList.map((item) => {
                    return (<option value=''>{item.user_name}</option>
                    )

                  })
                  }
                </select>
              </Col>


            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' >Select Period</Label>
                <select className='form-control'>
                  <option>Select Period
                  </option>
                  {periodList.map((item) => {
                    return (<option value=''>{item.periodicity}</option>
                    )
                  })
                  }
                </select>
              </Col>


              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='compl_date'>
                  Date <span className='text-danger'>*</span>
                </Label>
                <Flatpickr
                  className='form-control'
                  value={date}
                  id='date'

                />
              </Col>


            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label'>
                  Contract Advance
                </Label>

                <Input defaultValue="200.000 DL" />

              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label'>
                  Contract Rent Per Period
                </Label>
                <Input placeholder='Contract Rent Per Period' />

              </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' >Select Status</Label>
                <select className='form-control'>
                  <option>Select Status</option>
                  <option value="a"> Appartment </option>
                  <option value="o"> House </option>
                  <option value="e"> Store </option>
                  <option value="t"> Villa </option>
                </select>
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' >contract fixed charge</Label>
                <Input type='text' placeholder='contract_fixed_charge' className='form-control' />
              </Col>
            </Row>

            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' >contract modalite rupture</Label>
                <Input type='text' placeholder='contract modalite rupture' className='form-control' />

              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' >contract share</Label>
                <Input type='text' placeholder='contract_share' className='form-control' />
              </Col>
            </Row>

            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' >Select End Date</Label>
                <Input type='date' className='form-control' />

              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' >contract reminder date</Label>
                <Input type='date' className='form-control' />
              </Col>
            </Row>
            <Col sm='6' className='mb-1' style={{ float: 'right' }}>
              <br />
              <Button className='me-1' color='primary'>
                Add Contract
              </Button>
              <Button type='reset' className='me-1' color='secondary' >
                Cancel
              </Button>

            </Col>

          </Form>
        </CardBody>
      </Card>
    </Col>)
}


export default UserProjectsList
