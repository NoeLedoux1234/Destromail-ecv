import { Request, Response } from 'express';
import db from '../db/memoryDB';
import { sendMail } from '../services/mailService';
import { v4 as uuidv4 } from 'uuid';

export const createTask = (req: Request, res: Response) => {
  const { title, description } = req.body;
  const newTask = { id: uuidv4(), title, description, completed: false };
  db.create(newTask);
  sendMail(`Task Created: ${newTask.title}`, 'A new task was created', 'noe.ledoux0321@gmail.com');
  res.status(201).json(newTask);
};

export const getTasks = (req: Request, res: Response) => {
  const tasks = db.readAll();
  res.json(tasks);
};

export const getTask = (req: Request, res: Response) => {
  const task = db.readById(req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
};

export const updateTask = (req: Request, res: Response) => {
  const updatedTask = db.update(req.params.id, req.body);
  if (updatedTask) {
    sendMail(`Task Updated: ${updatedTask.title}`, 'A task was updated', 'noe.ledoux0321@gmail.com');
    res.json(updatedTask);
  } else {
    res.status(404).send('Task not found');
  }
};

export const deleteTask = (req: Request, res: Response) => {
  const success = db.delete(req.params.id);
  if (success) {
    sendMail(`Task Deleted`, 'A task was deleted', 'noe.ledoux0321@gmail.com');
    res.status(204).send();
  } else {
    res.status(404).send('Task not found');
  }
};
