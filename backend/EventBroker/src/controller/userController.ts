
import axios from "axios" 

const userApi= axios.create({
    baseURL: 'http://localhost:5004/users'

})

type User = {
    nombre: string,
    email: string,
    password: string,
  
}

type  Login = {
    email: string,
    password: string
}


export const  loginuser = async (loginData:Login) => {
    try {
        const {data} = await userApi.post('/login', loginData)
        return data
    } catch (error) {
        console.error('Error fetching user:', error)
        return{
            msg: 'internal server error',
            error
        }
    }
}



export const createUser = async (userdata:User) => {
    try {
        const {data} = await userApi.post('/', userdata)
        return data
    } catch (error) {
        console.error('Error fetching user:', error)
        return{
            msg: 'internal server error',
            error
        }
    }
}

