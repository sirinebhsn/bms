import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardBody, Col, Label } from "reactstrap";
import Swal from "sweetalert2";
import { isUserLoggedIn } from '@utils'

const EditStatus = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [compl_status, setStatus] = useState("");
  const [complain_id, setComplId] = useState("");
  const [user_id, setUserId] = useState("");
  const [userData, setUserData] = useState([]);
  let { compl_id } = useParams()
  useEffect(() => {
    getUser();
  }, [])
 function getUser(){
    if (isUserLoggedIn() !== null) {
      axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
        setUserData(response.data)
      })}
  }
 const addStatus = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('compl_status', compl_status);
    formData.append('complain_id', complain_id);
    formData.append('user_id', user_id);

    console.log(formData)
    axios.post(`${API_ENDPOINT}/api/addStatus`, formData).then(res => {
 
      if(res.data.status==200){
      new Swal("Success",res.data.message, "success");
      window.location.reload()

      }
     

    });

  }

  return (

    <Card>
      <CardBody>
      <h4 align="center">Edit Status</h4>
      <br/>
        <select id='compl_status'  className='form-control' onChange={(e) => setStatus(e.target.value)}>
          <option>Select Status</option>
          <option value="0"> Pending </option>
          <option value="1"> In Progress </option>
          <option value="2"> On Hold </option>
          <option value="3"> Completed </option>
        </select>
        <br/>

        <input type='hidden' id='complain_id' name='complain_id' value={compl_id} ref={() => setComplId(compl_id)} />
        <input type='hidden' id='user_id' name='user_id' value={(userData && userData?.user_id)} ref={() => setUserId(userData && userData?.user_id)} />

        <Button className='me-1' color='secondary' style={{float:'right'}}>
            Close
         </Button>
        <Button className='me-1' color='primary' style={{float:'right'}} onClick={addStatus}>
            Edit
         </Button>
         
      </CardBody>

    </Card>
  );

}

export default EditStatus;