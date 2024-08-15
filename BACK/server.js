import express from "express";
import cors from "cors";
import {
  GetTasks,
  GetTaskById,
  AddNewTask,
  DeleteTaskById,
} from "./apiBack.js";

const port = 3000;
const app = express();
app.use(cors());

// app.get('/', (req, res) => res.send('Hello, welcome on my To Do List !'));

//Récupère la liste de toutes les tâches
app.get("/tasks", async (req, res) => {
  try {
    const result = await GetTasks();
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

//Récupère une tâche depuis un id
app.get("/task/:id", async (req, res) => {
  try {
    const result = await GetTaskById(req.params.id);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

//Permet d'ajouter une nouvelle tâche
app.post("add/task/:label", async (req, res) => {
  try {
    const result = await AddNewTask(req.params.label);
    console.log("result= ", result);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

//Permet de supprimer une tâche
app.delete("delete/task/:id", async (req, res) => {
  try {
    const result = await DeleteTaskById(req.params.id);
    console.log("result= ", result);
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () =>
  console.log(`Projet TO_DO_LIST démarré sur le port ${port}`)
);
