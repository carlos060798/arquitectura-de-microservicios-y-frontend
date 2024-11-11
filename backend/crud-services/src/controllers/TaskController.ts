

import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Tarea } from '../db/taskModel';
import { AppDataSource } from '../db/connection';
import { console } from 'inspector';

class TaskController {
    private static tareaRepository: Repository<Tarea>;

    private static getRepository() {
        if (!TaskController.tareaRepository) {
            if (!AppDataSource.isInitialized) {
                throw new Error('AppDataSource no está inicializado. Asegúrate de inicializarlo antes de usar TaskController.');
            }
            TaskController.tareaRepository = AppDataSource.getRepository(Tarea);
        }
        return TaskController.tareaRepository;
    }

    public static async getAllTasks(req: Request, res: Response) {
        const  {userproperty} = req.params
        console.log(userproperty)

        try {
            const tasks = await TaskController.getRepository().find({where: {userproperty}});

            if (!tasks || tasks.length === 0) {
                return res.status(404).send({ msg: 'No hay tareas en la base de datos' });
            }

            return res.send({
                msg: 'Get all tasks',
                tasks,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ msg: 'Error al obtener las tareas', err });
        }
    }


    
    

    public static async createTask(req: Request, res: Response) {
        const { nombre, descripcion, estado, userproperty} = req.body;
        const task = TaskController.getRepository().create({
            nombre,
            descripcion,
            estado,
            userproperty,
        });

        try {
            await TaskController.getRepository().save(task);
            return res.status(201).send({
                msg: 'Task created',
                task,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ msg: 'Error al crear la tarea', err });
        }
    }

   
    public static async deleteTask(req: Request, res: Response) {
        const { id } = req.params;
    
        try {
            // Intentamos eliminar la tarea con el ID proporcionado
            const result = await TaskController.getRepository().delete(id);
    
            // Verificamos si la tarea existía y fue eliminada
            if (result.affected === 0) {
                return res.status(404).send({ msg: 'Tarea no encontrada' });
            }
    
            // Si la tarea fue eliminada con éxito, enviamos la respuesta
            return res.send({
                msg: 'Task deleted successfully',
                result,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ msg: 'Error al eliminar la tarea', err });
        }
    }
    

   
    

    
}

export default TaskController;
