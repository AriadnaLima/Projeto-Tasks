import React, { useState, useEffect } from "react";
import './Content.css';
import ContentCard from "./ContentCard/ContentCard";
import { Modal, Button } from "react-bootstrap";
import { createTask, listTasks, removeTask } from "../Services/TaskServices/TaskService";


export default function Content() {
    const [show, setShow] = useState(false);
    const [groupTitle, setGroupTitle] = useState('')
    const [groupList, setGroupList] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(async () => {
        const resp = await listTasks(); 
        await removeTask();
        setGroupList(resp)

    }, [])

    async function addTask() {
        let data = {
            title: groupTitle
        }
        await createTask(data)
        setGroupTitle('')
    }

    return (
        <div className="body-content">

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Novo Grupo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Nome do Grupo de Atividades</span>
                    <input className="form-control" placeholder="Nome do Grupo"
                        name="groupName" value={groupTitle}
                        onChange={e => setGroupTitle(e.target.value)}></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Voltar
                    </Button>
                    <Button variant="primary" onClick={() => { handleClose(); addTask(); }}>
                        Salvar Novo Grupo
                    </Button>
                </Modal.Footer>
            </Modal>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {
                    groupList?.map(item => {
                        return <ContentCard title={item.title} id={item.id}/>
                    })
                }
                <div>
                    <Button variant="primary" onClick={handleShow}>Novo Grupo</Button>

                </div>
            </div>

        </div>
    )

}