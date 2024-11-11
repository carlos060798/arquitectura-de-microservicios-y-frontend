import { Request, Response } from 'express';
import { CrudEnum } from '../enums/Crud-enum';
import { UserEnum } from '../enums/User-enum';
import { createUser } from './userController';
import { loginuser } from './userController';
import { createTask, deleteTask, getTasks} from './taskControllers';
export const eventController = async (req: Request, res: Response) => {
    const { event, data: requestData } = req.body;
    console.log({
        msg: 'Event sending',
        event,
        data: requestData
    });

    if (!event) return res.status(400).send('Event is required');
    switch (event) {
        case  UserEnum.CREATE:
            console.log('User created data', requestData);
            const user =await createUser(requestData);
        return res.status(201).send(user);
        
        case UserEnum.LOGIN:
            console.log('User logged');
            const userLogged =await loginuser(requestData);
            return res.status(200).send(userLogged);
    
   
        case CrudEnum.CREATETASK:
             const task = await createTask(requestData);
            return res.status(201).send(task);

        case CrudEnum.READALL:
        const  tasks= await getTasks(requestData);
        return res.status(200).send(tasks);

        case CrudEnum.DELETETASK:
            const deletetask = await deleteTask(requestData);
            console.log('Event deleted');
            return res.status(200).send(deletetask);
      
    }



    return res.status(404).send('Event not found');

}



