import {Router}  from 'express';
import { postEvent } from '../controller/apigatewayController';

const router = Router();

router.post('/',postEvent); 


const  gatewayRouter = router;

export default gatewayRouter;