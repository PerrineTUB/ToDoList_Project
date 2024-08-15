import dayjs from "dayjs";
import mariadb from "mariadb";

let connectionParam = {
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist",
  connectTimeout: 5000,
  timezone: "local",
};

// Connexion à la base Infra
async function Connection() {
  try {
    const cnx = await mariadb.createConnection(connectionParam);
    console.log(cnx);
    return cnx;
  } catch (error) {
    Log(`Connection: ${error.message}.`, 2);
    throw error;
  }
}

// Execution d'une requête en lecture
async function Query(sql) {
  let cnx;
  try {
    cnx = await Connection();
    const result = await cnx.query(sql);
    if (cnx) cnx.end();
    return result;
  } catch (error) {
    if (cnx) cnx.end();
    // Log(`Query: ${error.message}`, 2);
    throw error;
  }
}

//Récupère toutes les tâches
async function GetTasks() {
  const sql = `SELECT * FROM tasks`;
  try {
    let tasks = await Query(sql);
    // console.log(tasks);
    return tasks;
  } catch (error) {
    console.log(error);
  }
}

//Récupère une tâche depuis un id
async function GetTaskById(id) {
  const sql = `SELECT * FROM tasks WHERE id = ${id}`;
  try {
    let task = await Query(sql);
    // console.log(task);
    return task;
  } catch (error) {
    console.log(error);
  }
}

//Permet d'ajouter une nouvelle tâche
async function AddNewTask(label) {
  const date = dayjs().format("YYYY-MM-DD HH:mm:ss");
  console.log("Date= ", date);
  const sql = `INSERT INTO tasks(task_name, task_date, task_done) VALUES ('${label}','${date}',0)`;
  try {
    let newTask = await Query(sql);
    console.log(newTask);
    return newTask;
  } catch (error) {
    console.log(error);
  }
}

//Permet de supprimer une tâche
async function DeleteTaskById(id) {
  const sql = `DELETE FROM tasks WHERE id=${id}`;
  try {
    let result = await Query(sql);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export { GetTasks, GetTaskById, AddNewTask, DeleteTaskById };
