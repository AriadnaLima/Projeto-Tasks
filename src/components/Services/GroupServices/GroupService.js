import {db} from '../../../Firebase/Firebase'
import { collection, addDoc, Timestamp, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'


export const createGroup = async (data) => {
    try {
        await addDoc(collection(db, 'groups'), {
            title: data.title
        })
       
    }catch(err) {
        console.log(err)
    }

}

export const listGroups = async () => {
    try{
        const resp = await getDocs(collection(db, 'groups'))
        return resp.docs.map(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        })
    } catch(err) {
        console.log(err)
    }
}


export const removeGroup = async (id) => {
    
    try {
        await deleteDoc(doc(db, 'groups', id))       
    }catch(err) {
        console.log(err)
    }

}


export const editGroup = async (data) => {
    try {
        await updateDoc(doc(db, 'groups', data.id), {
            title: data.title
        })
    }catch(err) { 
        console.log(err)
    }
}