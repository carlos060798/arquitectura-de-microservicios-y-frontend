import { Request, Response } from 'express';
import { CrudEnum } from '../enums/Crud-enum';
export const eventController = async (req: Request, res: Response) => {
    const { event, data: requestData } = req.body;
    console.log({
        msg: 'Event sending',
        event,
        data: requestData
    });
     

    if (!event) return res.status(400).send('Event is required');
    switch (event) {
        case CrudEnum.CREATE:
            return res.send('CREATE event');
            
        case CrudEnum.READ:
           return  res.send('READ event');
           
        case CrudEnum.UPDATE:
           return   res.send('UPDATE event');
        case CrudEnum.DELETE:
            return res.send('DELETE event');

        default:
            return res.status(400).send('Invalid event');
    }



    return res.status(404).send('Event not found');

}



