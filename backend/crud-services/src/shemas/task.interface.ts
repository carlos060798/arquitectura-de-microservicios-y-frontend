import Joi from "joi";

const TaskSchema = Joi.object({
    nombre: Joi.string().required(),
    descripcion: Joi.string().required(),
    estado: Joi.string().required()

});

const  TaskUpdateSchema = Joi.object({
    
    nombre: Joi.string(),
    descripcion: Joi.string(),
    estado: Joi.string()
    
}); 

export { TaskSchema, TaskUpdateSchema };