import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { AlignLeft, Calendar, Eye, Globe, Home, Lock, Mail, Map, MapPin, Package, Phone, PhoneCall, Settings, Smile, User, UserCheck } from "react-feather";
import { Card, CardBody, Col, Progress, Row } from "reactstrap";
import './style.css'

const ComplainDetails = ({ compl_id }) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

  const [complain, setComplain] = useState([])
  useEffect(() => {
    if (compl_id) {
      axios.get(`${API_ENDPOINT}/api/getComp/` + compl_id).then(response =>
        setComplain(response.data)
      )
    }

  }, [])

  console.log("Complain", complain)


  return (

    <Card width="100%">
      <CardBody>

        <h1 align='center'>{complain?.compl_title}</h1>
        <div className="small" >
          <small style={{ color: 'Tomato' }}>{complain?.compl_description}</small>
        </div>
        <br />
        <Row>
          <Col>
            <p><h4>Email : &nbsp; <Mail color="red" size={17} />  {complain?.compl_email}</h4></p>
          </Col>
          <Col>
            <div className="grid-container-element" >

              <p><h4>Status : &nbsp;<Package color="blue" size={17} /></h4></p>
              {complain.compl_job_status == '0' &&
                <>

                  <Progress value="30" color='danger' striped='true' animated='true' style={{ width: 130, height: 15 }} />

                </>}
              {complain.compl_job_status == '1' &&

                <>

                  <Progress value="50" color='warning' striped='true' animated='true' style={{ width: 130, height: 15 }} />
                </>}
            </div>
          </Col>

        </Row>

        <Row>

          <Col>
            <p><h4> Assigned To : &nbsp; <User color="SlateBlue" size={17} /> {complain?.compl_assigned_to}</h4></p>


          </Col>
          <Col>
            <p><h4> Completed By : &nbsp; <UserCheck color="SlateBlue" size={17} /> {complain?.compl_complainBy}</h4></p>


          </Col>

        </Row>
        <Row>

          <Col>
            <p><h4> Date : &nbsp;<Calendar color="Orange" size={17} /> {complain?.compl_date}</h4></p>


          </Col>
          <Col>
            <p><h4> Phone : &nbsp; <Phone color="MediumSeaGreen" size={17} /> {complain?.compl_phone}</h4></p>


          </Col>


        </Row>
        <Row>

          <Col>
            <p><h4 > Complainer : &nbsp; <User color="DodgerBlue" size={17} /> {complain?.compl_name}</h4></p>


          </Col>

          <Col>
            <p><h4> Solution : &nbsp;&nbsp; <Settings color="BlueViolet" size={17} /> {complain?.compl_solution}</h4></p>
          </Col>
        </Row>









        <br />





      </CardBody>

    </Card>

  );

}
export default ComplainDetails;