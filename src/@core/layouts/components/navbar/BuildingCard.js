import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Calendar, Globe, Home, Lock, Mail, Map, MapPin, Phone, Smile, User } from "react-feather";
import { Card, CardBody, Col, Row } from "reactstrap";

const Building = () => {

   const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT
  const [buildingList, setBuildingList] = useState([])
  useEffect(() => {
    
      axios.get(`${API_ENDPOINT}/api/listBuildings` ).then(response =>
        setBuildingList(response.data)
      )
    

  }, [])


  return (

    <Card width="100%">
      <CardBody>
        <div className='d-flex'>
          <div className='me-25'>
            <Row>
            {buildingList.map((item) => {
                  return( 
              <Col sm='4'>
             <img  style={{ width: 150, height: 150 }} src={item.building_image} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
             <span><b>{item.building_name}</b>&nbsp;&nbsp;</span>


             </Col>

                )

              })
              }

            </Row>

          </div>
        </div>
        <br />



     

      </CardBody>

    </Card>

  );

}
export default Building;
