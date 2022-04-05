import {db} from '../../../database/firebase'
import { collection, addDoc, Timestamp, getDocs } from 'firebase/firestore'


export const createTask = async (data) => {
    try {
        await addDoc(collection(db, 'tasks'), {
            title: 'Task'
        })
       
    }catch(err) {
        console.log(err)
    }

}

export const listTasks = async () => {
    try{
        const resp = await getDocs(collection(db, 'tasks'))
        return resp.docs.map(doc => doc.data())
    } catch(err) {
        console.log(err)
    }
}