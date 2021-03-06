import React, { useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { Modal, Button, CloseButton } from "react-bootstrap";
import Card from './Card/Card'
import { removeGroup, editGroup } from "../../Services/GroupServices/GroupService"
import { createTask, listTasks, moveTask, removeTask } from "../../Services/TaskServices/TaskService"


export default function ContentCard(props) {
  const [show, setShow] = useState(false);
  const [showM, setShowM] = useState(false);
  const [taskBody, setTaskBody] = useState('')
  const [updateGroup, setUpdateGroup] = useState()
  const [editTitleGroup, setEditTitleGroup] = useState(false)


  async function handleMoveTask(task) {
    props.moveTask(task, props.id)
    await moveTask({ id: task.id, group: props.id });
  }

  const [, dropRef] = useDrop({
    accept: 'TASK',
    drop: (item) => handleMoveTask(item)

  })


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseM = () => setShowM(false);
  const handleShowM = () => setShowM(true);


  //Informar para o pai(Content) atualizar a listagem de grupos 
  async function handleRemoveGroup() {
    await removeGroup(props.id)
    props.refreshGroupList(true)
  }

  async function addTask() {
    let data = {
      body: taskBody,
      group: props.id
    }
    await createTask(data)
    setTaskBody('')
    props.refreshTaskList(true)
  }


  async function handleEditGroup() {
    let data = {
      id: props.id,
      title: updateGroup,
    }
    await editGroup(data)
    props.refreshGroupList(true)
  }


  async function handleKey(e) {
    if (e.key === 'Escape') {
      setEditTitleGroup(false)
    } else if (e.key === 'Enter') {
      handleEditGroup()
      setEditTitleGroup(false)
    }
  }


  return (
    <div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <span>Nome da tarefa</span>
          <input className="form-control" placeholder="Nome da Tarefa"
            name="taskName" value={taskBody}
            onChange={e => setTaskBody(e.target.value)}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="primary" onClick={() => {
            handleClose();
            addTask();
          }}>
            Salvar Nova Tarefa
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showM} onHide={handleCloseM}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja excluir o Grupo?</Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
              </Modal.Body> */}
        <Modal.Footer>

          <Button variant="secondary" onClick={() => {
            handleCloseM();
          }}>Voltar
          </Button>

          <Button variant="primary" onClick={() => {
            handleCloseM();
            handleRemoveGroup();
          }}> Excluir
          </Button>

        </Modal.Footer>
      </Modal>

      <div
        className="m-3 bg-light text-dark border border-dark rounded-3"
        style={{ width: "200px" }}
        ref={dropRef}
      >

        <div className='p-2 mb-0 bg-primary text-white '>

          <div onClick={() => { setEditTitleGroup(true); setUpdateGroup(props.title); }}>
            {editTitleGroup ?
              <input
                value={updateGroup}
                onKeyUp={handleKey}
                onChange={(e) => setUpdateGroup(e.target.value)}
                className='bg-primary text-white'
                style={{ width: '75%', border: "none" }}
              /> :
              props.title}

            <CloseButton
              variant="white"
              aria-label="Hide"
              style={{ float: "right" }}
              onClick={handleShowM}>
            </CloseButton>


          </div>
        </div>

        <div className="p-2 m-2" >
          {props?.taskList?.map((item, index) => {
            if (item.group === props.id) {
              return <Card
                key={index}
                body={item.body}
                group={item.group}
                id={item.id}
                refreshTaskList={props.refreshTaskList} />
            }
          })
          }
          <div className="mt-3 d-flex justify-content-center">
            <Button variant="primary" onClick={handleShow}>Novo Tarefa</Button>
          </div>
        </div>

      </div>
    </div>

  )
}


