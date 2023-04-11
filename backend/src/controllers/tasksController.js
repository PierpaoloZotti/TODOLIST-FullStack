const tasksModel = require("../models/tasksModel");

const getAll = async (req, res) => {
   const tasks = await tasksModel.getAll();
   return res.status(200).json(tasks);
};

const createTask = async (req, res) => {
   const createdTask = await tasksModel.createTask(req.body);
   return res.status(201).json(createdTask);
};

const deleteTask = async (req, res) => {
   const deletedTask = await tasksModel.deleteTask(req.params.id);
   return res.status(204).json(); //204 significa que a requisiçao correu bem mas nao tem nenhum retorno
};

const updateTask = async (req, res) => {
   const updatedTask = await tasksModel.updateTask(req.params.id, req.body);
   return res.status(200).json(updatedTask);
};

module.exports = {
   getAll,
   createTask,
   deleteTask,
   updateTask
};
