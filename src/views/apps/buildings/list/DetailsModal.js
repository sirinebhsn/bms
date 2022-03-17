import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Calendar, Globe, Home, Lock, Mail, Map, MapPin, Phone, Smile, User } from "react-feather";
import { Card, CardBody, Col, Row } from "reactstrap";
import './style.css'

const LoginForm = ({ user_id }) => {

  const [user, setUser] = useState([])
  useEffect(() => {
    if (user_id) {
      axios.get(`https://bms-back.start-now.fr/public/api/getUser/` + user_id).then(response =>
        setUser(response.data)
      )
    }

  }, [])

  console.log("User", user)

  return (

    <Card width="100%">
      <CardBody>
        <div className='d-flex'>
          <div className='me-25'>
            <Row>
              <Col sm='4'>
                <img className="center" style={{ width: 150, height: 150 }} src={"https://bms-back.start-now.fr/public/" + user.user_image} /><br />
              </Col>

              <Col sm='6'>
                <br /><br />
                <h3>&nbsp;&nbsp;{user?.user_name}</h3><br />
                <h4 color="red"> {user?.user_designation}&nbsp;&nbsp;<Smile color="blue" size={20} />
                </h4>

              </Col>

            </Row>

          </div>
        </div>
        <br />



        <p><h4> &nbsp;&nbsp;Email : &nbsp; <Mail color="blue" size={17} />  {user?.email}</h4></p>
        <hr />
        <p><h4> &nbsp;&nbsp; Phone number :  &nbsp;&nbsp;<Phone size={17} color="green" /> {user?.user_tel}</h4></p>
        <hr />
        <p><h4> &nbsp;&nbsp;Password : &nbsp;&nbsp; <Lock color="grey" size={17} />{user?.password}</h4></p>
        <hr />
        <p><h4> &nbsp;&nbsp;NID : &nbsp;&nbsp; <Lock color="BlueViolet" size={17} /> {user?.user_nid}</h4></p>
        <hr />
        <p><h4> &nbsp;&nbsp;Present Address :  &nbsp;&nbsp;  <MapPin size={17} color='DarkCyan' />{user?.user_pre_address}</h4></p>
        <hr />
        <p><h4> &nbsp;&nbsp;Permenant Address : &nbsp;&nbsp; <MapPin size={17} color='CadetBlue' />   {user?.user_per_address}</h4></p>
        <hr />
        <p><h4> &nbsp;&nbsp;Building :  &nbsp;&nbsp;  <Home size={17} color='BlueViolet' /> {user?.building_id}</h4></p>
        <hr />

        <p><h4> &nbsp;&nbsp;Starting Date : &nbsp; <Calendar color="blue" size={17} />  {user?.user_date_creation}</h4></p>
        <hr />
        <p><h4> &nbsp;&nbsp; Ending Date :  &nbsp;&nbsp;<Calendar size={17} color="green" /> {user?.user_ending_date}</h4></p>
        <hr />
        <p><h4> &nbsp;&nbsp;User Language : &nbsp;&nbsp; <Globe color="grey" size={17} />&nbsp;{user?.user_currlang}</h4></p>
        <hr />

      </CardBody>

    </Card>

  );

}
export default LoginForm;