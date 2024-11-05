

import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Tarea } from '../db/taskModel';
import { AppDataSource } from '../db/connection';

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
        try {
            const tasks = await TaskController.getRepository().find();

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

    public static async getTaskById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const task = await TaskController.getRepository().findOneBy({ id: parseInt(id) });

            if (!task) {
                return res.status(404).send({ msg: 'No se encontró la tarea con el ID proporcionado' });
            }

            return res.send({
                msg: 'Get task by id',
                task,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ msg: 'Error al obtener la tarea', err });
        }
    }

    public static async createTask(req: Request, res: Response) {
        const { nombre, descripcion, estado } = req.body;
        const task = TaskController.getRepository().create({
            nombre,
            descripcion,
            estado,
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

    public static async updateTask(req: Request, res: Response) {
        const { id } = req.params;
        const { nombre, descripcion, estado } = req.body;

        try {
            const task = await TaskController.getRepository().findOneBy({ id: parseInt(id) });

            if (!task) {
                return res.status(404).send({ msg: 'No se encontró la tarea con el ID proporcionado' });
            }

            task.nombre = nombre || task.nombre;
            task.descripcion = descripcion || task.descripcion;
            task.estado = estado || task.estado;

            await TaskController.getRepository().save(task);
            return res.send({
                msg: 'Task updated',
                task,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ msg: 'Error al actualizar la tarea', err });
        }
    }

    public static async deleteTask(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const result = await TaskController.getRepository().delete(id);

            if (result.affected === 0) {
                return res.status(404).send({ msg: 'No se encontró la tarea con el ID proporcionado' });
            }

            return res.send({
                msg: 'Task deleted',
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ msg: 'Error al eliminar la tarea', err });
        }
    }

    public static async deleteAllTasks(req: Request, res: Response) {
        try {
            await TaskController.getRepository().clear();
            return res.send({ msg: 'All tasks deleted' });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ msg: 'Error al eliminar todas las tareas', err });
        }
    }
}

export default TaskController;
