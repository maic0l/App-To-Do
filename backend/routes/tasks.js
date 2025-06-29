const express = require('express');
const router = express.Router();
let tasks = require('../data/db.json');

router.get('/', (req, res) => res.json(tasks));

router.post('/', (req, res) => {
  const { title } = req.body;
  const newTask = { id: Date.now(), title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.map(task =>
    task.id == id ? { ...task, completed: !task.completed } : task
  );
  res.json({ message: 'Actualizado' });
});

router.delete('/:id', (req, res) => {
  tasks = tasks.filter(task => task.id != req.params.id);
  res.json({ message: 'Eliminado' });
});

router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

module.exports = router;
