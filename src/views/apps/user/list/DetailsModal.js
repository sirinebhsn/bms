import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import './style.css'

const LoginForm = ({ id }) => {
  const [owner, setOwner] = useState()
  useEffect(async () => {
    if (id) {
      let result = await fetch("http://localhost:8000/api/getOwner/" + id);
      const response = await result.json();
      setOwner(response)

    }
  }, [id])

  console.log("Owner", owner)

  return (

    <Card>
      <CardBody>
        <img className="center" style={{ width: 150, height: 150 }} src={"http://localhost:8000/" + owner?.file_path} /><br />
        
        <p><h4>Name :&nbsp;{owner?.name}</h4></p>
        <p><h4>Email : &nbsp;  {owner?.email}</h4></p>
        <p><h4>Phone number : &nbsp;  {owner?.telephone}</h4></p>
        <p><h4>Password : &nbsp;   {owner?.password}</h4></p>
        <p><h4>NID :&nbsp;   {owner?.cin}</h4></p>
        <p><h4>Present Address : &nbsp;  {owner?.presentAdress}</h4></p>
        <p><h4>Permenant Address :&nbsp;   {owner?.permenantAdress}</h4></p>


      </CardBody>

    </Card>
  );

}

export default LoginForm;