import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import { Card, CardBody, Col, Form, Input, Label, Row } from "reactstrap"

const UserInfoEdit= ()=> {

    
    return (
  <Form>
      <Row>
        <Col>
        
        <Label>Owner Name</Label>
        <Input type="text" placeholder="Owner Name"> Owner Name </Input><br/>
        
        </Col>
        <Col>
        
        <Label>Owner Email</Label>
        <Input type="email" placeholder="Owner  Email"> Owner Email </Input><br/>
        
        </Col>


      </Row>
      <Row>
      <Col>
        
        <Label>Owner Password</Label>
        <Input type="password" placeholder="Owner Password"> Owner Password </Input><br/>
        
        </Col>
        <Col>
        
        <Label className='form-label' for='telephone'>
            Phone Number <span className='text-danger'>*</span>
          </Label>

            <PhoneInput  placeholder="enter phone number"/><br/>
        
        </Col>
       


      </Row>
      <Row>
      <Col>
        
        <Label>Owner Cin</Label>
        <Input type="number" placeholder="Owner Cin"> Owner Cin </Input><br/>
        
        </Col>
        <Col>

        
        <Label>Present Address</Label>
        <Input type="text" placeholder="Owner Present Address"> Present Address </Input><br/>
        
        </Col>
       


      </Row>
      <Row>
      <Col>
        
        <Label>Permenant Address</Label>
        <Input type="text" placeholder="Owner Permenant Address"> Permenant Address </Input><br/>
        
        </Col>
      </Row>
      <Row>
      <div className='mb-1'>
          <Label className='form-label' for='file'>
        Owner Picture<span className='text-danger'>*</span>
          </Label>
          <input type='file' className="form-control"
            placeholder="file" /><br />
        </div>
</Row>

  </Form>
    );
  
  }



export default UserInfoEdit