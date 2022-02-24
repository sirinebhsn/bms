import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap";
import './style.css'

const EditModal  = async (e) => {
  e.preventDefault();

    const [owner, setOwner] = useState()
    useEffect(async () => {
      if (id) {
        let result = await fetch("https://bmsback.herokuapp.com/api/getOwner/" + id);
        const response = await result.json();
        setOwner(response)
  
      }
    }, [id])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [cin, setCin] = useState("");
  const [presentAdress, setPresentAdress] = useState("");
  const [permenantAdress, setPermenantAdress] = useState("");
  const [file, setFile] = useState("");
  async function updateOwner(id) {
  console.warn(name, email, password, telephone, cin, presentAdress, permenantAdress, file)
    const formData= new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('telephone', telephone);
    formData.append('cin', cin);
    formData.append('presentAdress', presentAdress);
    formData.append('permenantAdress', permenantAdress);
    formData.append('file', file);
   console.log(formData)
   let result = await fetch("https://bmsback.herokuapp.com/api/updateOwner/"+id,{
      method: 'PUT',
      body: formData
    });

    alert("Success")
    window.location.reload(false);
  }

 

 
  return (

    <Card>
      <CardBody>

      <Form>
      <Row>
        <Col>
        
        <Label>Owner Name</Label>
        <Input type="text" placeholder={owner?.name}  onChange={(e) => setName(e.target.value)}> Owner Name </Input><br/>
        
        </Col>
        <Col>
        
        <Label>Owner Email</Label>
        <Input type="email" placeholder={owner?.email} onChange={(e) => setEmail(e.target.value)}> Owner Email </Input><br/>
        
        </Col>


      </Row>
      <Row>
      <Col>
        
        <Label>Owner Password</Label>
        <Input type="password" placeholder={owner?.password}  onChange={(e) => setPassword(e.target.value)}> Owner Password </Input><br/>
        
        </Col>
        <Col>
        
        <Label className='form-label' for='telephone'>
            Phone Number <span className='text-danger'>*</span>
          </Label>

            <Input  type="text" placeholder={owner?.telephone}  onChange={(e) => setTelephone(e.target.value)}/><br/>
        
        </Col>
       


      </Row>
      <Row>
      <Col>
        
        <Label>Owner Cin</Label>
        <Input type="number" placeholder={owner?.cin} onChange={(e) => setCin(e.target.value)}> Owner Cin </Input><br/>
        
        </Col>
        <Col>

        
        <Label>Present Address</Label>
        <Input type="text" placeholder={owner?.presentAdress}  onChange={(e) => setPresentAdress(e.target.value)}> Present Address </Input><br/>
        
        </Col>
       


      </Row>
      <Row>
      <Col>
        
        <Label>Permenant Address</Label>
        <Input type="text" placeholder={owner?.permenantAdress} onChange={(e) => setPermenantAdress(e.target.value)}> Permenant Address </Input><br/>
        
        </Col>
      </Row>
      <Row>
      <div className='mb-1'>
      <Label className='form-label' for='file'>
        Owner Picture<span className='text-danger'>*</span>
          </Label>
      <img className="owner-picture" style={{ width: 150, height: 150 }} src={"https://bmsback.herokuapp.com/" + owner?.file_path} /><br /> 
          <input type='file' className="form-control"
            placeholder="file" onChange={(e) => setFile(e.target.files[0])}
            /><br />
        </div>
</Row>
<Button onClick={updateOwner} className='me-1' color='primary'>
          Submit
        </Button>

  </Form>

      </CardBody>

    </Card>
  );

}
export default EditModal;