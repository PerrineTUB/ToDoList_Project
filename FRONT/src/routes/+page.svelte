<script>
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { faTrash, faPen, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
	import { AddNewTask, GetTasks, DeleteTaskById } from '../services/apiFront.js';

	let tasks;
	let task = {};
	let loading = true;

	async function AddTask(taskLabel) {
		loading = true;
		await AddNewTask(taskLabel);
		tasks = await GetTasks();
		task.label = '';
		loading = false;
	}

	async function DeleteTask(idTask) {
		loading = true;
		await DeleteTaskById(idTask);
		tasks = await GetTasks();
		loading = false;
	}

	async function updateStatus(taskStatus) {
		console.log('taskStaus=', taskStatus);
	}

	onMount(async () => {
		tasks = await GetTasks();
		loading = false;
	});
</script>

<div class="flex flex-col gap-7 p-10 h-[100vh] font-mono">
	<h1 class="flex justify-center items-center font-semibold text-xl gap-5">
		<span class="text-green-600">
			<Fa icon={faCheck} />
		</span>
		PROJET TO DO LIST
		<span class="text-red-700">
			<Fa icon={faXmark} />
		</span>
	</h1>

	<hr />
	<div class="flex flex-col items-center">
		<form action="">
			<label for="" class="italic">Ajouter une nouvelle tâche : </label>
			<input type="text" class="rounded-sm" bind:value={task.label} />
			<button title="Enregistrer une nouvelle têche" on:click={() => AddTask(task.label)}
				>Enregistrer</button
			>
		</form>
	</div>
	<hr />

	{#if !loading}
		<div class="flex justify-evenly">
			<div>
				<h2 class="italic mb-8">Liste des tâches à réaliser :</h2>

				<div class="flex flex-col space-between gap-3">
					{#each tasks as task}
						<div class="items-center row">
							<input
								type="checkbox"
								class="h-4 w-4"
								checked={task.task_done === 1 ? 'checked' : ''}
								on:click={() => updateStatus(task.task_done)}
							/>
							<span>{task.id} - {task.task_name}</span>
							<button title="Supprimer" class="icon flex" on:click={() => DeleteTask(task.id)}>
								<Fa icon={faTrash} />
							</button>
						</div>
					{/each}
				</div>
			</div>
			<div>
				<h2 class="italic">Liste des tâches réalisées :</h2>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.icon {
		color: #7b6572;
	}

	.row {
		display: grid;
		grid-template-columns: 30px 250px 25px;
	}
</style>
