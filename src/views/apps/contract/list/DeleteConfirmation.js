import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
 
const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, visit_name, message }) => {
    return (
        <Modal show={showModal} onHide={hideModal}>
        <ModalHeader closeButton>
          <ModalTitle>Delete Confirmation</ModalTitle>
        </ModalHeader>
        <ModalBody><div className="alert alert-danger">{message}</div></ModalBody>
        <ModalFooter>
          <Button variant="default" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => confirmModal(visit_name, id) }>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    )
}
 
export default DeleteConfirmation;