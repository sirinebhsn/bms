// ** React Import
import { useEffect, useState } from 'react'
//import 'react-phone-number-input/style.css'
// ** Custom Components
import Sidebar from '@components/sidebar'
import './style.css'
import camera from './camera.js'
import { useDropzone } from 'react-dropzone'


// ** Reactstrap Imports
import { Button, Label, Form, Row, Col, Input, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, ListGroupItem, ListGroup } from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import "react-datetime/css/react-datetime.css";
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Fragment } from 'react'
import { isUserLoggedIn } from '@utils'
import { DownloadCloud, FileText, X } from 'react-feather'



const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const { t } = useTranslation()
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  // const now = moment().hour(0).minute(0);

  const history = useHistory();
  const [EmpList, setEmpList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [user_id, setUserId] = useState("");
  const [compl_name, setComplName] = useState("");
  const [compl_email, setComplEmail] = useState("");
  const [compl_description, setComplDescription] = useState("");
  const [building_id, setBuidingId] = useState("");
  const [compl_title, setComplTitle] = useState("");
  const [compl_date, setComplDate] = useState(""); 
  const [compl_phone, setComplPhone] = useState("");
  const [compl_solution, setSolution] = useState("");
  const [compl_job_status, setJobStatus] = useState("");
  const [compl_assigned_to, setAssigned] = useState("");
  const [compl_complainBy, setComplainBy] = useState("");
  const [compl_pictures, setPictures] = useState([]);

  const [userData, setUserData] = useState(null)
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setPictures([...compl_pictures, ...acceptedFiles.map(file => Object.assign(file))])
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    } else {
      return <FileText size='28' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = compl_pictures
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setPictures([...filtered])
  }
  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }
  const fileList = compl_pictures.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  const handleRemoveAllFiles = () => {
    setPictures([])
  }

  const timeout=(ms)=>{
    return new Promise((resolve) =>setTimeout(resolve(), ms))
  }

  useEffect(() => {
    getUser();
    getData()
    getEmployees()

  }, [])
  const getUser = async()=>{
    await timeout(1000)
    if (isUserLoggedIn() !== null) {

    axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
      setUserData(response.data)
  } )}}
  async function getEmployees() {
    let result = await fetch(`${API_ENDPOINT}/api/getEmployees`);
    result = await result.json();
    setEmpList(result)
  }
  async function getData() {
    let result = await fetch(`${API_ENDPOINT}/api/listBuildings`);
    result = await result.json();
    setBuildingList(result)
  }

  function handleEnter(event) {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }
  const openCam = () => {
    camera.startCamera();
    camera.takeSnapshot();
  }
  const addComplain = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('building_id', building_id);
    formData.append('compl_name', compl_name);
    formData.append('compl_email', compl_email);
    formData.append('compl_assigned_to', compl_assigned_to);
    formData.append('compl_date', compl_date);
    formData.append('compl_title', compl_title);
    formData.append('compl_description', compl_description);
    formData.append('compl_date', compl_date);
    formData.append('compl_phone', compl_phone);
    formData.append('compl_solution', compl_solution);
    formData.append('compl_job_status', compl_job_status);
    formData.append('compl_complainBy', compl_complainBy);
    for (let i = 0; i < compl_pictures.length; i++) {
      console.log("compl_pictures[i]", compl_pictures[i])
      formData.append('compl_pictures[]', compl_pictures[i])
    }
    console.log(formData)
    axios.post(`${API_ENDPOINT}/api/addComplain`, formData).then(res => {

      if (res.data.status == 200) {
        new Swal("Success", res.data.message, "success");
        window.location.reload()


      }


    });

  }
  return (
    <Fragment>
      <Sidebar
        size='lg'
        open={open}
        title={t('Add New Complain')}
        headerClassName='mb-1'
        contentClassName='pt-0'
        toggleSidebar={toggleSidebar}
      >
        <Form className='mt-2 pt-50'>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='building_id'>{t('Select Building')}</Label>
              <select id='building_id' className='form-control' onChange={(e) => setBuidingId(e.target.value)}
              >
                <option  >{t('Select Building')}</option>
                {buildingList.map((item) => {
                  return (<option value={item.building_id}>{item.building_name}</option>
                  )

                })
                }
              </select>
            </Col>
          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='compl_assigned_to'>{t('Assigned To')}</Label>
              <select id='compl_assigned_to' className='form-control' onChange={(e) => setAssigned(e.target.value)}
              >
                <option  >{t('Select Employee')}</option>
                {EmpList.map((item) => {
                  return (<option value={item.user_name}>{item.user_name}</option>
                  )
                })
                }
              </select>
            </Col>
          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='compl_complainBy'>{t('Completed By')}</Label>
              <select id='compl_complainBy' className='form-control' onChange={(e) => setComplainBy(e.target.value)}
              >
                <option>{t('Select Employee')}</option>
                {EmpList.map((item) => {
                  return (<option value={item.user_name}>{item.user_name}</option>
                  )
                })
                }
              </select>
            </Col>
          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='compl_name'>
                {t('Complainer Name')} <span className='text-danger'>*</span>
              </Label>
              <input id='compl_name' type='text' onKeyDown={handleEnter} className="form-control" onChange={(e) => setComplName(e.target.value)}
                placeholder={t("Complainer Name")} /><br />
            </Col>

          </Row>
          <Row>
            <Col sm='12' className='mb-1'>
              <Label className='form-label' for='compl_job_status'>{t('Select Status')}</Label>
              <select id='compl_job_status' className='form-control' onChange={(e) => setJobStatus(e.target.value)}
              >
                <option>{t('Select Status')}</option>
                <option value="0"> Pending </option>
                <option value="1"> In Progress </option>
                <option value="2"> On Hold </option>
                <option value="3"> Completed </option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='compl_title'>
                Title <span className='text-danger'>*</span>
              </Label>
              <input id='compl_title' type='text' onKeyDown={handleEnter} className="form-control" onChange={(e) => setComplTitle(e.target.value)}
                placeholder=" Title" /><br />
            </Col>

          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='compl_email'>
                {t('Email')} <span className='text-danger'>*</span>
              </Label>
              <input id='compl_email' type='email' onKeyDown={handleEnter} className="form-control" onChange={(e) => setComplEmail(e.target.value)}
                placeholder={t("Email")} /><br />
            </Col>

          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='compl_phone'>
                {t('Phone Number')} <span className='text-danger'>*</span>
              </Label>
              <input type='text' id='compl_phone' onKeyDown={handleEnter} className="form-control" onChange={(e) => setComplPhone(e.target.value)}
                placeholder={t("Phone Number")} />
            </Col>
          </Row>


          <Row>

            <Col sm='12' className='mb-1'>
              <Label className='form-label' for='compl_date'>
                {t('Date Of Complain')} <span className='text-danger'>*</span>
              </Label>
              <Flatpickr
                className='form-control'
                value={compl_date}
                id='compl_date'
                options={{
                  format: "Y-m-d",
                  altFormat: "Y-m-d",
                  altInput: true
                }}
                onChange={(date) => {
                  setComplDate(date)
                }
                }
              />
            </Col>
          </Row>


          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='compl_description'>
                {t('Description')}<span className='text-danger'>*</span>
              </Label>
              <textarea type='text' id='compl_desciption' onKeyDown={handleEnter} className="form-control"
                onChange={(e) => setComplDescription(e.target.value)} placeholder={t("Description")} />
            </Col>

          </Row>
          <Row>
            <Col sm='12' className='mb-1'>

              <Label className='form-label' for='compl_solution'>
                {t('Solution')}<span className='text-danger'>*</span>
              </Label>
              <textarea type='text' id='compl_solution' onKeyDown={handleEnter} className="form-control"
                onChange={(e) => setSolution(e.target.value)} placeholder={t("Solution")}/>
            </Col>

          </Row>

          <Col sm='12' className='mb-1'>

            <input type='hidden' id='user_id' name='user_id' value={(userData && userData.user_id)} ref={() => setUserId(userData && userData.user_id)} />

          </Col>
          <br />
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} id='compl_pictures' />
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <DownloadCloud size={64} />
              <h5>{t('Drop Pictures here or click to upload')}</h5>
              <p className='text-secondary'>
                {t('Drop Pictures here or click')}{' '}
                <a href='/' onClick={e => e.preventDefault()}>
                  {t('browse')}
                </a>{' '}
                {t('through your machine')}
              </p>
            </div>
          </div>
          {compl_pictures.length ? (
            <Fragment>
              <ListGroup className='my-2'>{fileList}</ListGroup>
              <div className='d-flex justify-content-end'>
                <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                  {t('Remove All')}
                </Button>
              </div>
            </Fragment>
          ) : null}      <br />


          <Button onClick={addComplain} className='me-1' color='primary'>
            {t('Add Complain')}
          </Button>
          <Button type='reset' color='secondary'>
            {('Cancel')}
          </Button>
        </Form>
      </Sidebar >
    </Fragment>
  )
}
export default SidebarNewUsers
