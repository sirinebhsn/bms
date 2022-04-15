// ** React Import
import { Fragment, useEffect, useState } from 'react'
//import 'react-phone-number-input/style.css'
// ** Custom Components
import Sidebar from '@components/sidebar'
// ** Reactstrap Imports
import { Button, Label, Form, Row, Col, Input, ListGroupItem, ListGroup } from 'reactstrap'
import { isUserLoggedIn } from '@utils'

import axios from 'axios';

import Swal from 'sweetalert2'
import { DownloadCloud, FileText, X } from 'react-feather'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next';

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const {t}= useTranslation()
  const [userData, setUserData] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [typeData, setTypeData] = useState([]);



  /**  Get the Data of the Current User  **/

  useEffect(() => {
   
    getUser()
    getFloor()
    getUnits()
  
  }, [])
  const timeout=(ms)=>{
    return new Promise((resolve) =>setTimeout(resolve(), ms))
  }
  const  getUser=async()=>{
    await timeout(1000)
    if (isUserLoggedIn() !== null) {
      axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
        setUserData(response.data)
      })}
    }
const getFloor=()=>{
  axios.get(`${API_ENDPOINT}/api/listFloor`).then(res => {

    setFloorList(res.data);
  });
}
const getUnits=()=>{
  axios.get(`${API_ENDPOINT}/api/listUnitTypes`).then(resp => {

    setTypeData(resp.data);
  });

}
  /* *** Unit Fields Initial States *** */
  const [unit_name, setName] = useState("");
  const [building_id, setBuilding] = useState("");
  const [floor_id, setFloor] = useState("");
  const [type_id, setUnitType] = useState("");
  const [unit_status, setUnitStatus] = useState("");
  const [unit_roomnumber, setUnitRoomNumber] = useState("");
  const [unit_added_date, setUnitAddedDate] = useState("");
  const [unit_pictures, setPictures] = useState([]);

  /*  const fileSelectedHandler = (e) => {
      setPictures(e.target.files)
    }*/
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setPictures([...unit_pictures, ...acceptedFiles.map(file => Object.assign(file))])
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
    const uploadedFiles = unit_pictures
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
  const fileList = unit_pictures.map((file, index) => (
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


  /*const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setPictures((previousImages) => previousImages.concat(imagesArray));
  };*/


  const addUnit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('unit_name', unit_name);
    formData.append('building_id', building_id);
    formData.append('floor_id', floor_id);
    formData.append('type_id', type_id);
    formData.append('unit_status', unit_status);
    formData.append('unit_roomnumber', unit_roomnumber);
    formData.append('unit_added_date', unit_added_date);
    for (let i = 0; i < unit_pictures.length; i++) {
      console.log("unit_pictures[i]", unit_pictures[i])
      formData.append('unit_pictures[]', unit_pictures[i])
    }
    console.log(formData)
    axios.post(`${API_ENDPOINT}/api/addUnite`, formData).then(res => {
      if(res.data.status==200){
      console.log(res.data)
      new Swal("Success", res.data.message, "success");
      window.location.reload()


      }
    });
  }

  return (

    <Sidebar
      size='lg'
      open={open}
      title='New Unit'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form className='mt-2 pt-50' encType='multipart/form-data'>
        <Col sm='12' className='mb-1'>

          <input type='hidden' id='building_id' name='building_id' value={(userData && userData?.buildings?.building_id)} ref={() => setBuilding(userData && userData?.buildings?.building_id)} />

        </Col>
        <Row>

          <Label className='form-label' for='unit_name'>
           {t('UNIT NAME')} <span className='text-danger'>*</span>
          </Label>
          <input type='text' className="form-control"

            onChange={(e) => setName(e.target.value)} placeholder={t("Unit name")} /><br />
        </Row>

        <br />
        <Row>

          <Label className='form-label' for='type_id'>{t('Select Type')}</Label>
          <select id='type_id' className='form-control' onChange={(e) => setUnitType(e.target.value)}
          >


            <option  >{t('Select Type')}</option>
            {typeData.map((item) => {
              return (<option value={item.type_id}>{item.unit_type}</option>
              )

            })
            }
          </select>
        </Row>
        <br />
        <Row>

          <Label className='form-label' for='unit_roomnumber'>
            {t('Room Number')}<span className='text-danger'>*</span>
          </Label>
          <Input type='number' className="form-control"

            placeholder={t("Room Number")} id='unit_roomnumber' onChange={(e) => setUnitRoomNumber(e.target.value)} /><br />
        </Row>
        <br />
        <Row>

        <Label className='form-label' for='unit_added_date'>
              {t('Unit Added Date')} <span className='text-danger'>*</span>
            </Label>
            <input type="date" className='form-control' id='unit_added_date'

              onChange={(e) => setUnitAddedDate(e.target.value)}

              dateFormat="yyyy-MM-dd"


            />


        </Row>


        <br />
        <Row>

          <Label className='form-label' for='unit_status'>
            {t('Unit Status')} <span className='text-danger'>*</span>
          </Label>
          <select className='form-control' onChange={(e) => setUnitStatus(e.target.value)}>
            <option value="0"> {t('Select Status')}
            </option>
            <option value="1"> {t('Active')}</option>

          </select>

          <br />
        </Row>
        <br />
        <Row>

          <Label className='form-label' for='floor_id'>{t('Select Floor')}</Label>
          <select id='floor_id' className='form-control' onChange={(e) => setFloor(e.target.value)}
          >


            <option  >{t('Select Floor')}</option>
            {floorList.map((item) => {
              return (<option value={item.floor_id}>{item.floor_name}</option>
              )

            })
            }
          </select>
        </Row>

        <br />


        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} id='unit_pictures' />
          <div className='d-flex align-items-center justify-content-center flex-column'>
            <DownloadCloud size={64} />
            <h5> {t('Drop Pictures here or click to upload')}</h5>
            <p className='text-secondary'>
             {t('Drop Pictures here or click')}{' '}
              <a href='/' onClick={e => e.preventDefault()}>
               {t('browse')}
              </a>{' '}
              {t('thorough your machine')}
            </p>
          </div>
        </div>
        {unit_pictures.length ? (
          <Fragment>
            <ListGroup className='my-2'>{fileList}</ListGroup>
            <div className='d-flex justify-content-end'>
              <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                {t('Remove All')}
              </Button>
            </div>
          </Fragment>
        ) : null}      <br />

        <Button onClick={addUnit} sh className='me-1' color='primary'>
          {t('Add Unit')}
        </Button>
        <Button type='reset' color='secondary'>
         {t('Cancel')}
        </Button>
      </Form>
    </Sidebar>
  )
}


export default SidebarNewUsers

