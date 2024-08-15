import axios from 'axios';

const apiURL = 'http://localhost:3000/';

/**
 * @param {string} url
 */
async function Query(url, method = 'get') {
	let response;
	try {
		switch (method) {
			case 'get':
				response = await axios.get(apiURL + url);
				break;
			case 'put':
				response = await axios.put(apiURL + url);
				break;
			case 'delete':
				response = await axios.delete(apiURL + url);
				break;
			case 'post':
				response = await axios.post(apiURL + url);
				break;
		}
		return response.data;
	} catch (error) {
		throw error;
	}
}

//Récupère toutes les tâches
async function GetTasks() {
	try {
		const resp = await Query(`tasks`);
		return resp;
	} catch (error) {
		throw error;
	}
}

//Récupère une tâche depuis un id
async function GetTaskById(id) {
	try {
		const resp = await Query(`task/${id}`);
		return resp;
	} catch (error) {
		throw error;
	}
}

//Permet d'ajouter une nouvelle tâche
async function AddNewTask(label) {
	try {
		const resp = await Query(`add/task/${label}`, 'post');
		console.log('resp= ', resp);
		return resp;
	} catch (error) {
		throw error;
	}
}

//Permet de supprimer une requête depuis un id
async function DeleteTaskById(id) {
	try {
		const resp = await Query(`delete/task/${id}`, 'delete');
		console.log('resp= ', resp);
		return resp;
	} catch (error) {
		throw error;
	}
}

export { GetTasks, GetTaskById, AddNewTask, DeleteTaskById };
