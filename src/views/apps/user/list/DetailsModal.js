import React, { useEffect, useState } from "react";
import { Home, Lock, Mail, Map, MapPin, Phone, User } from "react-feather";
import { Card, CardBody } from "reactstrap";
import './style.css'

const LoginForm = ({ id }) => {
  const [owner, setOwner] = useState()
  useEffect(async () => {
    if (id) {
      let result = await fetch("https://bmsbackendapp.herokuapp.com/api/getOwner/" + id);
      const response = await result.json();
      setOwner(response)

    }
  }, [id])

  console.log("Owner", owner)

  return (

    <Card>
      <CardBody>
      <div className='d-flex'>
            <div className='me-25'>
             <img  className="center" style={{ width: 150, height: 150 }} src={"https://bmsbackendapp.herokuapp.com/" + owner?.file_path} /><br />
       </div>
       </div> 
       <br/>
       <p><h4><b> &nbsp;&nbsp;Name :</b>&nbsp;&nbsp; <User color="red" size={17}/> {owner?.name} </h4></p>
        <p><h4> &nbsp;&nbsp;Email : &nbsp; <Mail color="blue" size={17}/>  {owner?.email}</h4></p>
        <p><h4> &nbsp;&nbsp; Phone number :  &nbsp;&nbsp;<Phone size={17} color="green"/> {owner?.telephone}</h4></p>
        <p><h4> &nbsp;&nbsp;Password : &nbsp;&nbsp; <Lock color="grey" size={17}/>{owner?.password}</h4></p>
        <p><h4> &nbsp;&nbsp;NID : &nbsp;&nbsp;  {owner?.cin}</h4></p>
        <p><h4> &nbsp;&nbsp;Present Address :  &nbsp;&nbsp;  <MapPin size={17} color='DarkCyan' />{owner?.presentAdress}</h4></p>
        <p><h4> &nbsp;&nbsp;Permenant Address : &nbsp;&nbsp; <MapPin size={17} color='CadetBlue'/>   {owner?.permenantAdress}</h4></p>
        <p><h4> &nbsp;&nbsp;Unit :  &nbsp;&nbsp;  <Home size={17} color='BlueViolet'/> {owner?.unit}</h4></p>



      </CardBody>

    </Card>
  );

}

export default LoginForm;