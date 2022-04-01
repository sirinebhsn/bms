import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap";
import Swal from "sweetalert2";

const UpdateProfile = ({ user_id }) => {
    const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT
  
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
        axios.get(`${API_ENDPOINT}/api/auth/user`).then(response =>
          setUser(response.data)
        )
      }, [])
   
    //console.log("User", user)
  
    const [user_name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [user_currlang, setCurrLang] = useState("");
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
      let formData = {
        user_name : user_name,
        user_currlang : user_currlang,
        user_tel : user_tel,
        user_nid : user_nid,
        user_pre_address : user_pre_address,
        user_per_address : user_per_address,
      }
  
      console.log(formData)
        axios.put(`${API_ENDPOINT}/api/updateUser/${user_id}`, formData).then(response =>{
          console.log(response.data)
  
            new Swal("Success", "User Updated successfully");
            window.location.reload()
         
          }
        
        )
      
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
          
          <Label for="user_currlang">User Current Language</Label>
          <Input type="text" id="user_currlang" defaultValue={user?.user_currlang} onChange={(e) => setCurrLang(e.target.value)}>  </Input><br/>
          
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
  export default UpdateProfile