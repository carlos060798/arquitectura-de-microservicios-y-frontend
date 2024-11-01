import { Request,Response } from "express";
import axios from "axios";


export const postEvent = async(
    req: Request,
    res: Response
) => {
    console.log(req.body);
    const { event,data:requestData} = req.body 
    console.log({
     msg: 'Event sending',
     event,
     data: requestData
     });
   
    if (!event)  return  res.status(400).send('Event is required'); 

    console.log(`http://localhost:${process.env.PORTEVENTBROKER}/events`);
        try {
            const { data } = await axios.post( `http://localhost:${process.env.PORTEVENTBROKER}/events`,{
                event,
                data:requestData

            });
            return res.status(200).send(data);
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                {
                    msg: 'internal server error',
                    error
                }
            );
        }
    
}