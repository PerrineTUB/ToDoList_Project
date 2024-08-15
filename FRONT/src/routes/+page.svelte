<script>
	import { onMount } from 'svelte';
	import { AddNewTask, GetTasks, DeleteTaskById } from '../services/apiFront.js';

	let tasks;
	let task = {};
	let loading = true;

	async function AddTask(taskLabel) {
		console.log('TaskLabel= ', taskLabel);
		await AddNewTask(taskLabel);
	}

	onMount(async () => {
		tasks = await GetTasks();
		loading = false;
	});
</script>

<div class="flex flex-col gap-7">
	<h1 class="flex justify-center">PROJET TO DO LIST</h1>

	<div>
		<span>Ajouter une nouvelle tâche</span>
		<form action="">
			<label for="">Nom de la tâche</label>
			<input type="text" bind:value={task.label} />
			<button on:click={() => AddTask(task.label)}>Enregistrer</button>
		</form>
	</div>
	{#if !loading}
		<div class="flex flex-col gap-5">
			{#each tasks as task}
				<div>
					<input type="checkbox" />
					<span>{task.id} - {task.task_name}</span>
					<button>Modifier</button>
					<button on:click={() => DeleteTaskById(task.id)}>Supprimer</button>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
</style>
