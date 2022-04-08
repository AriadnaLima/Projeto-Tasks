import {db} from '../../../Firebase/Firebase'
import { collection, addDoc, Timestamp, getDocs, deleteDoc, doc } from 'firebase/firestore'

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

export const listTasks = async () => { 
    try{
        const resp = await getDocs(collection(db, 'tasks'))
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
        await deleteDoc(doc(db, 'tasks', id));
    }catch(err) {
        console.log(err)
    }
}