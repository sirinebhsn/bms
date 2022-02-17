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
      <div className='d-flex'>
            <div className='me-25'>
             <img  className="center" style={{ width: 150, height: 150 }} src={"http://localhost:8000/" + owner?.file_path} /><br />
       </div>
       </div> 
       <br/>
       <p><h4><b> &nbsp;&nbsp;Name :</b>&nbsp;&nbsp; {owner?.name} </h4></p>
        <p><h4> &nbsp;&nbsp;Email : &nbsp;  {owner?.email}</h4></p>
        <p><h4> &nbsp;&nbsp;Phone number :  &nbsp;&nbsp; {owner?.telephone}</h4></p>
        <p><h4> &nbsp;&nbsp;Password : &nbsp;&nbsp;  {owner?.password}</h4></p>
        <p><h4> &nbsp;&nbsp;NID : &nbsp;&nbsp;  {owner?.cin}</h4></p>
        <p><h4> &nbsp;&nbsp;Present Address :  &nbsp;&nbsp; {owner?.presentAdress}</h4></p>
        <p><h4> &nbsp;&nbsp;Permenant Address :  &nbsp;&nbsp;   {owner?.permenantAdress}</h4></p>


      </CardBody>

    </Card>
  );

}

export default LoginForm;