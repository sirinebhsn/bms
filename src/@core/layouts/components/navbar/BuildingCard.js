import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import VerticalMenuHeader from "../menu/vertical-menu/VerticalMenuHeader";

const Building = () => {
  const { t } = useTranslation()

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [buildingList, setBuildingList] = useState([])
  const [selectedBuilding, setSelectedBuilding] = useState([])
  useEffect(() => {
    axios.get(`${API_ENDPOINT}/api/listBuildings`).then(response =>
      setBuildingList(response.data),
    )
  }, [])
  async function handleShow(building_id) {
    setSelectedBuilding(building_id)
    console.warn(building_id)
    let result = await fetch(`${API_ENDPOINT}/api/getBuilding/` + building_id)
    result = await result.json();
    localStorage.setItem("building_id", JSON.stringify(building_id));
    //navigate.push('/dashboard');
    window.location.reload()

    console.log(result)
  }

  return (
    <Fragment>
      <Card width="100%">
        <CardBody>
          <div className='d-flex'>
            <div className='me-25'>
              <Row>
                {buildingList.map((item) => {
                  return (
                    <Col sm='4'>
                      <Link to={`/dashboard/${item.building_id}`}
                        key={selectedBuilding.building_id}
                        onClick={() => handleShow(item.building_id)}>

                        <img style={{ width: 150, height: 150 }} src={item.building_image} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />

                      </Link>
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
    </Fragment>
  );

}
export default Building;
