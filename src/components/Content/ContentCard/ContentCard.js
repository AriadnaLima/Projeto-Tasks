import React, { useState, useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";
import Card from './Card/Card'

export default function ContentCard() {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const taskInitial = {
    taskName: ' '
  }

  let [task, setTask] = useState(taskInitial)

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Nome da tarefa</span>
          <input className="form-control" placeholder="Nome do Grupo"
            name="taskName" value={task.taskName}
            onChange={e => setTask(+(e.target.value))}></input>  
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
        <div className='p-2 mb-0 bg-primary text-white'>
          Nome do grupo
        </div>

        <div className="p-2 m-2" >
          <Button variant="primary" onClick={handleShow}>Novo Tarefa</Button>
        </div>

      </div>
    </div>
  )
}
