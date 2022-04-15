// ** Reactstrap Imports
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, Label, Progress, Row } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'
const UserProjectsList = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const {t}= useTranslation()
  const history = useHistory();
  const [errorList, setError] = useState([]);
  const [floor_num, setFloornum] = useState("");
  const [floor_name, setFloorName] = useState("");
  const [floor_added_date, setDate] = useState("");
  const [floor_area, setFloorArea] = useState("");
  const [building_id, setBuildingid] = useState("");
  const [floor_elevator, setFloorElevator] = useState("");
  const [userData, setUserData] = useState([]);
  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve(), ms))
  }
  useEffect(() => {
    getUser()
  }, [])
  const getUser = async () => {
    await timeout(1000)
    axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
      setUserData(response.data)
    })
  }
  function handleEnter(event) {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }

  const addFloor = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('floor_name', floor_name);
    formData.append('floor_num', floor_num);
    formData.append('floor_elevator', floor_elevator);
    formData.append('floor_area', floor_area);
    formData.append('floor_added_date', floor_added_date);
    formData.append('building_id', building_id);

    axios.post(`${API_ENDPOINT}/api/addFloor`, formData).then(res => {
      if (res.data.status == 200) {
    history.push('/floor/listFloors')

      }
      else if (res.data.status == 422) {
        new Swal("All Fields are mandetory", "", "error");
        setError(res.data.errors);
      }
      else if (res.data.status == 400) {
        new Swal("This Floor already existed", "", "error");
        setError(res.data.errors);
      }
    });


  }
  return (
    <Col style={{ width: '70rem' }}>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle>
            <h1>{t('Add New Floor')}</h1></CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>
          <Form className='mt-2 pt-50'>

            <Row>
              <Col sm='6' className='mb-1'>

                <Label className='form-label' for='floor_num'>
                  {t('Floor Number')} <span className='text-danger'>*</span>
                </Label>
                <input type='number' id='floor_num' className='form-control' onChange={(e) => setFloornum(e.target.value)} />


                <br />
              </Col>
              <Col sm='6' className='mb-1'>

                <Label className='form-label' for='floor_name'>
                  {t('FLOOR Name')} <span className='text-danger'>*</span>
                </Label>
                <input type='text' id='floor_name' className='form-control' onChange={(e) => setFloorName(e.target.value)} />


                <br />
              </Col>
            </Row>


            <Row>
              <Col sm='6' className='mb-1'>

                <Label className='form-label' for='floor_elevator'>
                  {t('FLOOR ELEVATOR')} <span className='text-danger'>*</span>
                </Label>
                <select className="form-control"
                  onChange={(e) =>
                    setFloorElevator(e.target.value)
                  }>
                  <option value=''> {t('Select')}</option>
                  <option value='1'>{t('Available')}</option>
                  <option value='0'>{t('Not Available')}</option>

                </select>

                <br />
              </Col>
              <Col sm='6' className='mb-1'>

                <Label className='form-label' for='name'>
                {t('FLOOR AREA')} <span className='text-danger'>*</span>
                </Label>
                <input type='number' id='floor_area' className='form-control' onChange={(e) => setFloorArea(e.target.value)} />


                <br />
              </Col>
            </Row>

            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='floor_added_date'>{t('Select Date')} </Label>

                <input className='form-control' type="date" onChange={(e) => setDate(e.target.value)} value={floor_added_date} format="yyyy-MM-dd" />
              </Col>
        
            <Col sm='6' className='mb-1'>
              <br />
              <Button onClick={addFloor} className='me-1' color='primary'>
                {t('Add Floor')}
              </Button>
              <Button type='reset' className='me-1' color='secondary' >
                {t('Cancel')}
              </Button>

            </Col>
            </Row>
            <Row>
              <Col sm='12' className='mb-1'>

                <input type='hidden' id='building_id' name='building_id' value={(userData && userData?.buildings?.building_id)} ref={() => setBuildingid(userData && userData?.buildings?.building_id)} />

              </Col>
            </Row>
          


          </Form>
        </CardBody>
      </Card>
    </Col>)
}


export default UserProjectsList
