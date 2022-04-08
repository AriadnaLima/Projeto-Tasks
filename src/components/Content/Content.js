import React, { useState, useEffect } from "react";
import './Content.css';
import ContentCard from "./ContentCard/ContentCard";
import { Modal, Button } from "react-bootstrap";
import { createGroup, listGroups, removeGroup } from "../Services/GroupServices/GroupService";


export default function Content() {
    const [show, setShow] = useState(false);
    const [groupTitle, setGroupTitle] = useState('')
    const [groupList, setGroupList] = useState()
    const [refList, setRefList] = useState(true)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleList() {
        if (refList) {
            const resp = await listGroups();
            setGroupList(resp)
            setRefList(false)
            
        }
    }


    useEffect(() => {
        handleList()

    }, [refList])



    function refresh(value) {
        setRefList(value)
    }


    async function addGroup() {
        let data = {
            title: groupTitle
        }
        await createGroup(data)
        setGroupTitle('')
        setRefList(true)
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
                    <Button variant="primary" onClick={() => { handleClose(); addGroup(); }}>
                        Salvar Novo Grupo
                    </Button>
                </Modal.Footer>
            </Modal>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {
                    groupList?.map((item, index) => {
                        return <ContentCard key={index} title={item.title} id={item.id} refresh={refresh} />
                    })
                }
                <div className="m-3">
                    <Button variant="primary" onClick={handleShow}>Novo Grupo</Button>

                </div>
            </div>

        </div>
    )

}