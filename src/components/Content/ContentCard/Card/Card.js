import React, { useState, useEffect } from 'react'
import { useDrag } from "react-dnd"
import "./Card.css"
import { Modal, Button } from "react-bootstrap";
import { removeTask, editTask } from "../../../Services/TaskServices/TaskService"

export default function Card(props) {
  const [show, setShow] = useState(false);
  const [updateTask, setUpdateTask] = useState(props.body)

  const [{isDragging}, dragRef] = useDrag({
    type: "TASK", 
    item: {id: props.id, body: props.body},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  }) 


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleRemoveTask() {
    await removeTask(props.id)
    props.refreshTaskList(true)
  }

  async function handleEditTask() {
    let data = {
      id: props.id,
      body: updateTask,
    }
    await editTask(data)
    props.refreshTaskList(true)
  }


  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className="form-control" placeholder=" "
            value={updateTask} onChange={e => setUpdateTask(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            handleClose();
            handleRemoveTask();
          }}>
            Excluir Tarefa
          </Button>
          <Button variant="primary" onClick={() => {
            handleClose();
            handleEditTask();
          }}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='Card m-2 card' onClick={handleShow} ref={dragRef} isDragging={isDragging}>
        <div className='card-body'>{props.body}</div>
      </div>

    </div>


  )
}
