import React, { useState, useEffect } from "react";
import './Content.css';
import ContentCard from "./ContentCard/ContentCard";
import { Modal, Button } from "react-bootstrap";
import { createTask, listTasks } from "../Services/TaskServices/TaskService";


export default function Content () {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(async () =>{
    // await createTask()
        const resp = await listTasks ();
        console.log(resp)

    }, [])

    const groupInitial = {
        groupName: ' '
    }

    let [group, setGroup] = useState(groupInitial)

    return (
        <div className="body-content">

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Novo Grupo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Nome do Grupo de Atividades</span>
                    <input className="form-control" placeholder="Nome do Grupo"
                        name="groupName" value={group.groupName}></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Voltar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Salvar Novo Grupo
                    </Button>
                </Modal.Footer>
            </Modal>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <ContentCard />
                <ContentCard />

                <div>
                    <Button variant="primary" onClick={handleShow}>Novo Grupo</Button>
                   
                </div>
            </div>

        </div>
    )

}