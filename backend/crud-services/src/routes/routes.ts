import { Router } from "express";

import { validateRequest } from '../middleware/validator';
import { TaskSchema,TaskUpdateSchema} from '../shemas/task.interface';
import TaskController from "../controllers/TaskController";

const router = Router();

router.get('/:userproperty', TaskController.getAllTasks);


router.post('/',validateRequest(TaskSchema), TaskController.createTask);


router.delete('/:id', TaskController.deleteTask);


const  TaskRoute = router;

export default TaskRoute;