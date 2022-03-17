// ** Reactstrap Imports
// ** React Imports
import { Fragment, useEffect, useState } from 'react'


import 'cleave.js/dist/addons/cleave-phone.us'

// ** Reactstrap Imports
import { Row, Col, Form, Card, Input, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import Cleave from 'cleave.js/react'
import { Mail } from 'react-feather'

const UserProjectsList = () => {

  const history = useHistory();

  const [building_name, setName] = useState("");
  const [building_email, setEmail] = useState("");
  const [building, setBuilding] = useState("");
  const [building_address, setAddress] = useState("");
  const [building_security_guard_mobile, setGuardmob] = useState("");
  const [building_secrataty_mobile, setSecratatymob] = useState("");
  const [building_moderator_mobile, setModeratormob] = useState("");
  const [building_make_year, setYear] = useState("");
  const [building_image, setImage] = useState("");
  const [building_status, setStatus] = useState("");
  const [building_company_name, setCompanyname] = useState("");
  const [building_company_phone, setCompanyphone] = useState("");
  const [building_company_address, setCompanyaddress] = useState("");
  const [building_rule, setRule] = useState("");
  const options = {
    phone: true, phoneRegionCode: 'US'
  
  }

  const [imgData, setImgData] = useState('https://image.geze.com/im/StageSpezial/pboxx-pixelboxx-619726/Des');
  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  function handleEnter(event) {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }

  const addBuilding = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('building_name', building_name);
    formData.append('building_email ', building_email);
    formData.append('building', building);
    formData.append('building_address ', building_address);
    formData.append('building_security_guard_mobile', building_security_guard_mobile);
    formData.append('building_secrataty_mobile', building_secrataty_mobile);
    formData.append('building_moderator_mobile', building_moderator_mobile);
    formData.append('building_make_year', building_make_year);
    formData.append('building_image ', building_image);
    formData.append('building_status', building_status);
    formData.append('building_company_name', building_company_name);
    formData.append('building_company_phone', building_company_phone);
    formData.append('building_company_address', building_company_address);
    formData.append('building_rule', building_rule);

    axios.post(`https://bms-back.start-now.fr/public/api/addBuilding`, formData).then(res => {
      console.log(res.data)

      if (res.data.status == 200) {
        new Swal("Success", res.data.message, "success");
        history.push('/apps/buildings/list');

      }

    });

  }

  return (
    <Col style={{ width: '70rem' }}>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle>
            <h1>Add New Building</h1></CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>
          <Form className='mt-2 pt-50'>

            <div className='d-flex'>
              <div className='me-25'>
                <img className='rounded me-50' src={imgData} style={{ width: 100, height: 100 }} />

              </div>
              <div className='d-flex align-items-end mt-75 ms-1'>
                <div>
                  <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                    Upload
                    <div className='me-25'>

                      <Input id='owner-picture' type='file' onChange={onChangePicture} onKeyDown={handleEnter}
                        hidden accept='image/*' />
                    </div>
                  </Button>
                  <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                </div>
              </div>
            </div>
            <br />

            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='building_name'>
                  Building name
                </Label>

                <Input id='building_name' placeholder='Building Name'
                  onChange={(e) =>
                    setName(e.target.value)}
                />

              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='building_email'>
                  Building Email
                </Label>
                <Input id='building_email' placeholder='Building Email'
                  onChange={(e) =>
                    setEmail(e.target.value)} />

              </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='building'>
                  Building
                </Label>

                <Input type='text' id='building' placeholder='Building'
                  onChange={(e) =>
                    setBuilding(e.target.value)}
                />

              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='building_address '>
                  Building Address
                </Label>
                <Input id='building_address' placeholder='Building Address'
                  onChange={(e) =>
                    setAddress(e.target.value)} />

              </Col>
            </Row>
            <Row>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='building_security_guard_mobile'>
                  Security Guard Phone number
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText >TN(+216)</InputGroupText>
                  <Cleave id='building_security_guard_mobile' className='form-control' placeholder='52 956 861' options={options}
                    onChange={(e) =>
                      setGuardmob(e.target.value)} />
                </InputGroup>

              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='building_secrataty_mobile'>
                  Secrataty Phone number
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText>TN(+216)</InputGroupText>
                  <Cleave id='building_secrataty_mobile' className='form-control' placeholder='52 956 861' options={options}
                    onChange={(e) =>
                      setSecratatymob(e.target.value)} />
                </InputGroup>

              </Col>
            </Row>
            <Row>

              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='building_moderator_mobile'>
                  Moderator Phone number
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText>TN (+216)</InputGroupText>
                  <Cleave id='building_moderator_mobile' className='form-control' placeholder='52 956 861' options={options}
                    onChange={(e) =>
                      setModeratormob(e.target.value)} />
                </InputGroup>

              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='building_company_phone'>
                  Company Phone number
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText>TN (+216)</InputGroupText>
                  <Cleave id='building_company_phone' className='form-control' placeholder='52 956 861' onChange={(e) =>
                    setCompanyphone(e.target.value)} options={options} />
                </InputGroup>

              </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='building_make_year '>
                  Building Creation Year
                </Label>
                <Input id='building_make_year' defaultValue={new Date().getFullYear()}
                  onChange={(e) =>
                    setYear(e.target.value)} />

              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='building_status'>
                  Building Status<span className='text-danger'>*</span>
                </Label>
                <select id='building_status' className='form-control' onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Select Status</option>
                  <option value="1"> Active </option>
                  <option value="2"> Inactive </option>

                </select>

              </Col>
            </Row>

            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='building_company_address'>
                  Building Company Address
                </Label>

                <Input id='building_company_address' placeholder='Building Company Address'
                  onChange={(e) =>
                    setCompanyaddress(e.target.value)}
                />

              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='building_company_name'>
                  Company Name
                </Label>

                <Input id='building_company_name' placeholder='Building Company Name'
                  onChange={(e) =>
                    setCompanyname(e.target.value)}
                />

              </Col>

            </Row>
            <Row>
              <Label className='form-label' for='building_rule'>
                Building Rule
              </Label>

              <Input
                type='textarea'
                name='building_rule'
                id='building_rule'
                lder='Make Rules here'
                style={{ minHeight: '300px' }}
                onChange={(e) =>
                  setRule(e.target.value)}
              />

            </Row>
            <Col sm='6' className='mb-1'>
              <br />
              <Button onClick={addBuilding} className='me-1' color='primary'>
                Add Building
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
