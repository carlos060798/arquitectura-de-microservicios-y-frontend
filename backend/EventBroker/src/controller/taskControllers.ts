
import axios from "axios" 

const TaskApi= axios.create({
    baseURL: 'http://localhost:5002/tasks'

})
 type Task = {
    nombre: string,
    descripcion: string,
    estado: string
 }

export  const getTasks = async (owner:any) => {
    const {userproperty} = owner
    console.log('userproperty',userproperty)
    try {
        const {data} = await TaskApi.get(`/${userproperty}`)
        
        return data
    } catch (error) {
        console.error('Error fetching user:', error) 
        return{
            msg: 'internal server error',
            error
        }
    }
 }



export const  createTask = async (dataTask:Task) => {
    try {
        const {data} = await TaskApi.post('/', dataTask)
        return data
    } catch (error) {
        console.error('Error fetching user:', error)
        return{
            msg: 'internal server error',
            error
        }
    }
}


   

export const deleteTask= async (idtask:any) => {
    const {id} = idtask
    try {
        const {data} = await TaskApi.delete(`/${id}`)
        return data
    } catch (error) {
        console.error('Error fetching user:', error)
        return{
            msg: ' internal server error',
            error
        }
    }
}




