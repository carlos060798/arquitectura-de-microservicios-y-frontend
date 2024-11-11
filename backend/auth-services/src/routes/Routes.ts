import {  Router } from 'express';
import UserController from '../controller/userController';

const router = Router();



router.post('/', UserController.createUser);


router.post('/login', UserController.loginUser);


const userRouter = router;

export default userRouter;