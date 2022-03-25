import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Calendar, Globe, Home, Lock, Mail, Map, MapPin, Phone, Smile, User } from "react-feather";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import VerticalMenuHeader from "../menu/vertical-menu/VerticalMenuHeader";

const Building = ({ building_id }) => {
  const { t } = useTranslation()

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [buildingList, setBuildingList] = useState([])
  const [selectedBuilding, setSelectedBuilding] = useState()
  useEffect(() => {

    axios.get(`${API_ENDPOINT}/api/listBuildings`).then(response =>
      setBuildingList(response.data),


    )
    if (building_id) {
      axios.get(`${API_ENDPOINT}/api/getBuilding/` + building_id).then(response =>
        setBuilding(response.data),
        localStorage.setItem("building_id", response.data.building_id)


      )
    }

  }, [])
  async function handleShow(building_id) {
    setSelectedBuilding(building_id)
    console.warn(building_id)
    let result = await fetch(`${API_ENDPOINT}/api/getBuilding/` + building_id);
    result = await result.json();
    console.warn(result)

  }


  return (
    <Card width="100%">
      <CardBody>
        <div className='d-flex'>
          <div className='me-25'>
            <Row>
              {buildingList.map((item) => {
                return (
                  <Col sm='4'>

                      <img onClick={() => handleShow(item.building_id)} style={{ width: 150, height: 150 }} src={item.building_image} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
                      <span><b>{t(item.building_name)}</b>&nbsp;&nbsp;</span>


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
