import React, { useState, useEffect } from 'react'
import { Modal, Button, CloseButton } from "react-bootstrap";
import Card from './Card/Card'
import {removeGroup } from "../../Services/GroupServices/GroupService"
import {createTask, listTasks, removeTask } from "../../Services/TaskServices/TaskService"


export default function ContentCard(props) {
  const [show, setShow] = useState(false);
  const [taskTitle, setTaskTitle] = useState('')
  const [taskList, setTaskList] = useState()
  const [refList, setRefList] = useState(true)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  async function handleList() {
    if (refList) {
      const resp = await listTasks();
      setTaskList(resp)
      setRefList(false)

    }
  }

  useEffect(() => {
    handleList()

  }, [refList])

  function refresh(value) {
    setRefList(value)
  }

  async function handleRemoveGroup() {
    await removeGroup(props.id)
    props.refresh(true)
  }

  async function addTask() {
    let data = {
      body: taskTitle
    }
    await createTask(data)
    setTaskTitle('')
    setRefList(true)
  }

  return (
    <div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Nome da tarefa</span>
          <input className="form-control" placeholder="Nome da Tarefa"
            name="taskName" value={taskTitle}
            onChange={e => setTaskTitle(e.target.value)}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Salvar Nova Tarefa
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="m-3 bg-light text-dark border border-dark" style={{ width: "200px" }}>

        <div className='p-2 mb-0 bg-primary text-white '>
          {props.title}
          <CloseButton variant="white" aria-label="Hide" style={{ float: "right" }} onClick={handleRemoveGroup} />

        </div>

        <div className="p-2 m-2" >
          {taskList?.map((item, index) => {
            return <Card key={index} body={item.body} group={item.group} id={item.id} refresh={refresh} />
          })
          }
          <Button variant="primary" onClick={handleShow}>Novo Tarefa</Button>
        </div>

      </div>
    </div>

  )
}


//falta apenas criar a lógica de criar a task 