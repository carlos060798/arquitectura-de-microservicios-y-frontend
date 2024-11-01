import {Router} from 'express';
import { eventController } from '../controller/eventController';

const router = Router();

// GET /users
router.post('/',eventController);


const eventRouter = router;

export default eventRouter;