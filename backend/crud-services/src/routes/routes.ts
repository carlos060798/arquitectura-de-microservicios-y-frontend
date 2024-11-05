import { Router } from "express";

import { validateRequest } from '../middleware/validator';
import { TaskSchema,TaskUpdateSchema} from '../shemas/task.interface';
import TaskController from "../controllers/TaskController";

const router = Router();

router.get('/', TaskController.getAllTasks);

router.get('/:id', TaskController.getTaskById);

router.post('/',validateRequest(TaskSchema), TaskController.createTask);

router.put('/:id', validateRequest(TaskUpdateSchema), TaskController.updateTask);

router.delete('/:id', TaskController.deleteTask);

router.delete('/', TaskController.deleteAllTasks);

const  TaskRoute = router;

export default TaskRoute;