import React, { useState, useEffect } from "react";
import './Content.css';
import ContentCard from "./ContentCard/ContentCard";
import { Modal, Button } from "react-bootstrap";
import { createGroup, listGroups, removeGroup } from "../Services/GroupServices/GroupService";
import {listTasks} from "../Services/TaskServices/TaskService"


export default function Content() {
    const [show, setShow] = useState(false);
    const [groupTitle, setGroupTitle] = useState('')
    const [groupList, setGroupList] = useState()
    const [taskList, setTaskList] = useState()
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

    async function handleListTask() {
        if (refList) {
          const resp = await listTasks();
          setTaskList(resp)
    
        }
      }

    useEffect(() => {
        handleList()
    }, [refList])

    useEffect(() => {
        handleListTask()
    }, [])


    function refreshGroupList(value) {
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

    function moveTask(task, groupId){
        let newArray = [...taskList]
        const index = newArray.map(object => object.id).indexOf(task.id)
        newArray[index] = {...newArray[index], group: groupId}
        setTaskList(newArray)
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
                         value={groupTitle}
                        onChange={e => setGroupTitle(e.target.value)}></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Voltar
                    </Button>
                    <Button variant="primary" onClick={() => { 
                        handleClose(); 
                        addGroup(); 
                        }}>
                        Salvar Novo Grupo
                    </Button>
                </Modal.Footer>
            </Modal>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {
                    groupList?.map((item, index) => {
                        return <ContentCard 
                        key={index} 
                        title={item.title} 
                        id={item.id} 
                        refreshGroupList={refreshGroupList}
                        taskList={taskList}
                        moveTask={moveTask} />
                    })
                }
                <div className="m-3">
                    <Button variant="primary" onClick={handleShow}>Novo Grupo</Button>

                </div>
            </div>

        </div>
    )

}