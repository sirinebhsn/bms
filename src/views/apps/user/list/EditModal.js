import axios from "axios";
import { use } from "i18next";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";
import './style.css'

const EditModal = ({ user_id }) => {

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
    if (user_id) {
      axios.get(`https://bms-back.start-now.fr/public/api/auth/getUser/` + user_id).then(response =>
        setUser(response.data)
      )
    }

  }, [])
 
  //console.log("User", user)

  const [user_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_tel, setTelephone] = useState("");
  const [user_nid, setNid] = useState("");
  const [user_pre_address, setPresentAdress] = useState("");
  const [user_per_address, setPermenantAdress] = useState("");
  const [user_image, setImage] = useState("");

  //const [user_image, setImage] = useState("");
  const history=useHistory();
  const updateUser = (e) => {
    e.preventDefault();
    /*let newForm = new FormData();
    newForm.append('user_name', user_name);
    newForm.append('email', email);
    newForm.append('password', password);
    newForm.append('user_tel', user_tel);
    newForm.append('user_nid', user_nid);
    newForm.append('user_pre_address', user_pre_address);
    newForm.append('user_per_address', user_per_address);*/
    //this browser is slooooww hhhh
    let formData = {
      user_name : user_name,
      email : email,
      password : password,
      user_tel : user_tel,
      user_nid : user_nid,
      user_pre_address : user_pre_address,
      user_per_address : user_per_address,
      user_image: user_image
    }

    console.log(formData)
    if (user_id) {
      axios.put(`https://bms-back.start-now.fr/public/api/updateUser/${user_id}`, formData).then(response =>{
        console.log(response.data)

        if (response.data.status==200) {
          new Swal("Success", "User Updated successfully");
        }          
          //history.push('/apps/user/list')
       
        }
      
      )
    }
  }
  return (

    <Card>
      <CardBody>

        <Form>
          <Row>
            <Col>

              <Label for="user_name">User Name</Label>
              <Input type="text"  id="user_name" defaultValue={user?.user_name} onChange={(e) => setName(e.target.value)}> </Input><br />

            </Col>
            <Col>

              <Label for="email">User Email</Label>
              <Input type="email"  id="email" defaultValue={user?.email} onChange={(e) => setEmail(e.target.value)}>  </Input><br />

            </Col>


          </Row>
          <Row>
            <Col>

              <Label for="user_tel">Phone Number</Label>
              <Input type="text" id="user_tel" defaultValue={user?.user_tel} onChange={(e) => setTelephone(e.target.value)} > </Input><br />

            </Col>
            <Col>

              <Label for="user_nid">User NID</Label>
              <Input type="text" id="user_nid" defaultValue={user?.user_nid} onChange={(e) => setNid(e.target.value)}>  </Input><br />

            </Col>

          </Row>
          <Row>
          <Col>
        
        <Label for="user_pre_address"> Present Address</Label>
        <Input type="text" id="user_pre_address" defaultValue={user?.user_pre_address} onChange={(e) => setPresentAdress(e.target.value)}> </Input><br/>
        
        </Col>
        <Col>
        
        <Label for="user_per_address">User Permenant Address</Label>
        <Input type="text"id="user_per_address" defaultValue={user?.user_per_address} onChange={(e) => setPermenantAdress(e.target.value)}>  </Input><br/>
        
        </Col>

          </Row>
          <Row>
          <Col>
        
        <Label for="password">User Password</Label>
        <Input type="text"  id="password" defaultValue={user?.password} onChange={(e) => setPassword(e.target.value)}>  </Input><br/>
        
        </Col>

          </Row>
          <div className='d-flex'>
          <div className='d-flex align-items-end mt-75 ms-1'>
            <div>
              <div className="previewProfilePic">
                <img className="owner-picture" style={{ width: 150, height: 150 }} src={user?.user_image} />
              </div>
              <br />
              <input id="user_image"  type="file" onChange={onChangePicture} />

              <p className='mb-0'>Allowed JPG, GIF or PNG. Max size of 800kB</p>
            </div>
          </div>
        </div>
        <br />

       
          <Button color='primary' onClick={updateUser}className='me-1'>
            Edit
          </Button>

        </Form>

      </CardBody>

    </Card>
  );

}
export default EditModal;