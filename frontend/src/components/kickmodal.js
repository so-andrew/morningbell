import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const KickModal = ({ selectedUser, setKickUsername, modalShow, onHide }) => {

    function handleKick(){
        setKickUsername(selectedUser);
        onHide();
    }

    return(
        <Modal show={modalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Kick {selectedUser}?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to kick {selectedUser}?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="danger" onClick={handleKick}>Kick</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default KickModal;