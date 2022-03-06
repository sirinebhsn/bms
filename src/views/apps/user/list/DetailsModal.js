import React, { useEffect, useState } from "react";
import { Home, Lock, Mail, Map, MapPin, Phone, User } from "react-feather";
import { Card, CardBody } from "reactstrap";
import './style.css'

const LoginForm = ({ id_user }) => {
  const [user, setUser] = useState()
  useEffect(async () => {
    if (id_user) {
      let result = await fetch("https://bmsback.herokuapp.com/api/getUser/" + id_user);
      const response = await result.json();
      setUser(response)

    }
  }, [id_user])

  console.log("User", user)

  return (

    <Card>
      <CardBody>
      <div className='d-flex'>
            <div className='me-25'>
             <img  className="center" style={{ width: 150, height: 150 }} src={"https://bmsback.herokuapp.com/" + user?.user_image} /><br />
       </div>
       </div> 
       <br/>
       <p><h4><b> &nbsp;&nbsp;Name :</b>&nbsp;&nbsp; <User color="red" size={17}/> {user?.user_name} </h4></p>
        <p><h4> &nbsp;&nbsp;Email : &nbsp; <Mail color="blue" size={17}/>  {user?.user_email}</h4></p>
        <p><h4> &nbsp;&nbsp; Phone number :  &nbsp;&nbsp;<Phone size={17} color="green"/> {user?.user_tel}</h4></p>
        <p><h4> &nbsp;&nbsp;Password : &nbsp;&nbsp; <Lock color="grey" size={17}/>{user?.user_password}</h4></p>
        <p><h4> &nbsp;&nbsp;NID : &nbsp;&nbsp;  {user?.user_nid}</h4></p>
        <p><h4> &nbsp;&nbsp;Present Address :  &nbsp;&nbsp;  <MapPin size={17} color='DarkCyan' />{user?.user_pre_address}</h4></p>
        <p><h4> &nbsp;&nbsp;Permenant Address : &nbsp;&nbsp; <MapPin size={17} color='CadetBlue'/>   {user?.user_per_address}</h4></p>
        <p><h4> &nbsp;&nbsp;Building :  &nbsp;&nbsp;  <Home size={17} color='BlueViolet'/> {user?.building_id}</h4></p>



      </CardBody>

    </Card>
  );

}

export default LoginForm;