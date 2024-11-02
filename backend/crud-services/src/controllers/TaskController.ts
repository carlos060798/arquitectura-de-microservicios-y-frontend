import { Request, Response } from 'express';
class  TaskController {

    public static  async getAllTasks(req: Request, res: Response) {
        res.send('Get all tasks');
    }
    public static  async getTaskById(req: Request, res: Response) {
        res.send(`Get task by id: ${req.params.id}`);
    }
    public static  async createTask(req: Request, res: Response) {
        res.send('Create task');
    }
    public static  async updateTask(req: Request, res: Response) {
        res.send(`Update task by id: ${req.params.id}`);
    }
    public static  async deleteTask(req: Request, res: Response) {
        res.send(`Delete task by id: ${req.params.id}`);
    }
    

}

export  default  TaskController;