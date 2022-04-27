import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Search } from "react-feather";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Input, InputGroup, Row } from "reactstrap";
import themeConfig from '@configs/themeConfig'

const Building = () => {
  const { t } = useTranslation()

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [buildingList, setBuildingList] = useState([])

  const [selectedBuilding, setSelectedBuilding] = useState([])
  useEffect(() => {
    getData();
  }, [])
  function getData() {
    axios.get(`${API_ENDPOINT}/api/listBuildings`).then(response =>
      setBuildingList(response.data),
    )
  }
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
  function bms() {
    window.localStorage.setItem('building_id', null);
    window.location.reload()
  }
  async function search(key) {
    if (key) {
      console.warn(key)
      let result = await fetch(`${API_ENDPOINT}/api/searchBuilding/` + key);
      result = await result.json();
      console.warn(result)
      setBuildingList(result)
    }
    else {
      getData();
    }

  }
  return (
    <Fragment>
      <Card width="100%">
        <CardBody>
          <Col className='mb-1' md='6' sm='12'>
            <InputGroup onChange={(e) => search(e.target.value)}>
              <Button color='primary' onClick={search} outline>
                <Search size={12} />
              </Button>
              <Input type='text' onChange={(e) => search(e.target.value)} placeholder={t('Search here')} />
              <Button color='primary' outline>
                {t('Search !')}
              </Button>
            </InputGroup>
          </Col>
          <div className='d-flex'>
            <div className='me-25'>
              <Row>
                <Col sm='3'>


                  <img style={{ width: 150, height: 150 }} src={themeConfig.app.appLogoImage} onClick={bms} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />

                  <span><b><center>{t('BMS')}</center></b>&nbsp;&nbsp;</span>

                </Col>
                {buildingList.map((item) => {
                  return (
                    <Col sm='3'>


                      <img style={{ width: 150, height: 150 }} src={item.building_image} onClick={() => handleShow(item.building_id)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />

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
