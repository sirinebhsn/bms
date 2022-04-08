import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";

const UpdateProfile = ({ user_id }) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

  const [user, setUser] = useState([])
  const [imgData, setImgData] = useState('https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png');
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
  useEffect(() => {
    getUser()
  
  }, [])
  const timeout=(ms)=>{
    return new Promise((resolve) =>setTimeout(resolve(), ms))
  }
  const getUser=async()=>{
    timeout(1000)
    axios.get(`${API_ENDPOINT}/api/auth/user`).then(response =>
      setUser(response.data)
    )
  }

  //console.log("User", user)

  const [user_name, setName] = useState('');
  const [user_currlang, setCurrLang] = useState('');
  const [user_tel, setTelephone] = useState('');
  const [user_nid, setNid] = useState('');
  const [user_pre_address, setPresentAdress] = useState('');
  const [user_per_address, setPermenantAdress] = useState('');
 
 /* const updateUser = () => {
    let formData = {
      user_name: user_name,
      user_currlang: user_currlang,
      user_tel: user_tel,
      user_nid: user_nid,
      user_pre_address: user_pre_address,
      user_per_address: user_per_address,
    }

    console.log(formData)
    axios.put(`${API_ENDPOINT}/api/updateUser/${user_id}`, formData).then(response => {
      console.log(response.data)
      if (response.data.status == true) {

        new Swal("Success", "User Updated successfully");
        window.location.reload()
      }
    }

    )

  }*/


const updateInfo= async()=>{
   await axios.put(`${API_ENDPOINT}/api/updateUser/${user_id}`,{
      user_name: user_name ? user_name: user.user_name,
      user_tel: user_tel ? user_tel: user.user_tel,
      user_nid: user_nid ? user_nid: user.user_nid,
      user_per_address: user_per_address ? user_per_address: user.user_per_address,
      user_pre_address: user_pre_address ? user_pre_address: user.user_pre_address,
      user_currlang: user_currlang ? user_currlang: user.user_currlang,
    }).then(response => {
      console.log(response.data)
      if (response.data.status == 200) {
        new Swal("Success", "User Updated successfully");
        window.location.reload()
      }
    }
    )
  
}
   const handleUpdate = (e) => {
    e.preventDefault();

    if (user_name || user_currlang || user_tel || user_nid || user_per_address || user_per_address)
      updateInfo();      

  }
  return (

    <Card>
      <CardBody>

        <Form>
          <Row>
            <Col>

              <Label for="user_name">User Name</Label>
              <input type="text" id="user_name" name="user_name" className="form-control"
                defaultValue={user?.user_name} onChange={(e) => setName(e.target.value)} /><br />

            </Col>

            <Col>

              <Label for="user_currlang">User Current Language</Label>
              <input type="text" name="user_currlang" id="user_currlang" className="form-control"
                onChange={(e) => setCurrLang(e.target.value)} defaultValue={user.user_currlang} /><br />

            </Col>

          </Row>
          <Row>
            <Col>

              <Label for="user_tel">Phone Number</Label>
              <input type="text" name="user_tel" className="form-control" id="user_tel" defaultValue={user.user_tel} onChange={(e) => setTelephone(e.target.value)} /><br />

            </Col>
            <Col>

              <Label for="user_nid">User NID</Label>
              <input type="text" name="user_nid" className="form-control" id="user_nid" defaultValue={user.user_nid} onChange={(e) => setNid(e.target.value)} /><br />

            </Col>

          </Row>
          <Row>
            <Col>

              <Label for="user_pre_address"> Present Address</Label>
              <input type="text" name="user_pre_address" className="form-control" id="user_pre_address" defaultValue={user.user_pre_address} onChange={(e) => setPresentAdress(e.target.value)} /><br />

            </Col>
            <Col>

              <Label for="user_per_address">User Permenant Address</Label>
              <input type="text" name="user_per_address" className="form-control" id="user_per_address" defaultValue={user.user_per_address} onChange={(e) => setPermenantAdress(e.target.value)} /><br />

            </Col>

          </Row>

          <div className='d-flex'>
            <div className='d-flex align-items-end mt-75 ms-1'>
              <div>
                <div className="previewProfilePic">
                  <img className="owner-picture" style={{ width: 150, height: 150 }} src={user?.user_image} />
                </div>
                <br />
                <input id="user_image" type="file" onChange={onChangePicture} />

                <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
              </div>
            </div>
          </div>
          <br />


          <Button color='primary' onClick={handleUpdate} className='me-1'>
            Edit
          </Button>

        </Form>

      </CardBody>

    </Card>
  );

}
export default UpdateProfile