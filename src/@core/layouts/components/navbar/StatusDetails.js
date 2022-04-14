import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, Progress } from "reactstrap";

const StatusDetails = ({ status_id,compl_id }) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const history=useHistory();
  const [status, setStatus] = useState([])
  const [complain, setComplain] = useState([])
  function getComplain() {
  foreach(status_id==compl_id)
  
      axios.get(`${API_ENDPOINT}/api/getComp/`+compl_id).then(response =>
        setComplain(response.data)
      )
 
  }
  const[compl_job_status, setComplId]=useState("")
  useEffect(() => {
    if (status_id) {
      axios.get(`${API_ENDPOINT}/api/getStatus/`+status_id).then(response =>
        setStatus(response.data)
      )
    }
    getComplain()

 }, [])
 console.log(status_id)
 async function updateInfo () {

    await axios.put(`${API_ENDPOINT}/api/updateComplain/`+ compl_id, {
    
      compl_job_status: compl_job_status ? compl_job_status : complain.compl_job_status,

    }).then(response => {
      console.log(response.data)
      if (response.data.status == 200) {
    
       history.push('/complain/list')
        console.log(response.data)
      }
    }
    )
  }
  console.log(compl_id)
  const handleUpdate = (e) => {
    e.preventDefault();

    if ( compl_job_status)
      updateInfo();

  }
  return (

    <Card>
      <CardBody>
        <h4 align="center"> Status</h4>
        <br />
        {
          status?.compl_status == '1' &&
          <>
            <Progress value="50" color='warning' striped='true' animated='true' style={{ width: 130, height: 15 }} />

          </>
        }
        <input type='hidden' id='compl_job_status' name='compl_job_status' value={status.status_id} ref={() => setComplId(status.status_id)} />
        <Button className='me-1' color='danger' style={{ float: 'right' }} >
          Refuser
        </Button>
        <Button className='me-1' color='success' style={{ float: 'right' }} onClick={handleUpdate}>
          Accepter
        </Button>


      </CardBody>

      </Card>
  );

}

export default StatusDetails;