// ** Third Party Components
import axios from 'axios'
import { useEffect, useState, Fragment } from 'react'

import { useParams } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardText, Badge, Progress, ListGroup, ListGroupItem, Button, ModalHeader, ModalBody, Modal } from 'reactstrap'
import EditStatus from '../../../@core/layouts/components/navbar/EditStatus'

const PricingCards = () => {


  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  let { compl_id } = useParams()
  const [show, setShow] = useState(false);
  const [selectedComplain, setSelectedComplain] = useState(false);
  const [complain, setComplain] = useState([])
  useEffect(() => {
    getComplain(compl_id)
  }, [])
  const openModal = () => {
    // When the handler is invoked

    // inverse the boolean state of passwordShown
    setShow(true);
    setSelectedComplain(compl_id)
  };
  async function getComplain() {
    axios.get(`${API_ENDPOINT}/api/getComp/${compl_id}`).then(response =>
      setComplain(response.data)
    )
  }
  console.log(compl_id)
  console.log("Complain", complain)


  return (
    <Fragment>
      <Card size='sm'>
        <CardBody>

          <Row>
            <Col sm='3' className='mb-1'>
              <img width='150px' height='150px' src={complain.users?.user_image} className="rounded mb-0" />
            </Col>
            <Col sm='9' className='mb-1' >
              <CardText><p>Published By &nbsp;: &nbsp;{complain?.compl_name}</p> </CardText>
              <br />


              <span className='pricing-duration text-body font-medium-1 fw-bold ms-25'>{complain?.compl_description}</span>
              <br />
              <span className='pricing-duration text-body font-medium-1 fw-bold ms-25'>{complain?.compl_solution}</span>
              <br />
              <span className='pricing-duration text-body font-medium-1 fw-bold ms-25'>{complain?.compl_assigned_to}</span>
              <br />
              <span className='pricing-duration text-body font-medium-1 fw-bold ms-25'>{complain?.compl_complainBy}</span>
              <br />
              <br />
              {
                complain?.compl_job_status == '0' &&
                <>
                  <Progress value="30" color='danger' striped='true' animated='true' style={{ width: 200, height: 15 }} />

                  <div className='pricing-badge text-end'>
                    <span onClick={openModal}>
                      <Badge color='light-primary' pill>
                        Change Status
                      </Badge>
                    </span>
                  </div>
                </>
              }
            </Col>

          </Row>
        </CardBody>
      </Card>
      <Modal size="sm" isOpen={show} >

        <ModalBody>
          <EditStatus compl_id={selectedComplain} />
        </ModalBody>

      </Modal>
    </Fragment>
  )




}

export default PricingCards
