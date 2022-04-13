import {db} from '../../../Firebase/Firebase'
import { collection, addDoc, Timestamp, getDocs, deleteDoc, doc, query, where, updateDoc} from 'firebase/firestore'

export const createTask = async (data) => {
 try {
     await addDoc(collection(db, 'tasks'), { 
         body: data.body,
         group: data.group
     })
 }catch(err) {
     console.log(err)
 }

}

export const listTasks = async (id) => { 
    try{
        const taskByGroup = query(collection(db, "tasks"),
        // where("group", "==", id)
        )
        const resp = await getDocs(taskByGroup)

        return resp.docs.map(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        })
    } catch(err) {
        console.log(err)
    }
}

export const removeTask = async (data) => {
    try {
        await deleteDoc(doc(db, 'tasks', data));
    }catch(err) {
        console.log(err)
    }
}


export const editTask = async (data) => {
    try {
        await updateDoc(doc(db, 'tasks', data.id), {
            body: data.body
        })
    }catch(err) { 
        console.log(err)
    }
}


export const moveTask = async (data) => {
    try {
        await updateDoc(doc(db, 'tasks', data.id), {
            group: data.group
        })
    }catch(err) { 
        console.log(err)
    }
}