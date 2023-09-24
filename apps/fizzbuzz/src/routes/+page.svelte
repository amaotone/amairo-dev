<script lang="ts">
	import { browser } from "$app/environment";
	import { Button } from "$lib/components/ui/button";
	import { onMount } from "svelte";
	import Counter from "./Counter.svelte";
	import ItemList from "./ItemList.svelte";
	import { ownedItemsStore, totalCpsStore } from './items';
	import { scoreStore } from './scores';

	onMount(() => {
		if (browser) {
			const score = localStorage.getItem('score');
			if (score) scoreStore.set(parseInt(score));

			const ownedItems = localStorage.getItem('ownedItems');
			if (ownedItems) ownedItemsStore.set(JSON.parse(ownedItems));
		}

		scoreStore.subscribe(score => {
			if (browser) localStorage.setItem('score', score.toString());
		})

		ownedItemsStore.subscribe(ownedItems => {
			if (browser) localStorage.setItem('ownedItems', JSON.stringify(ownedItems));
		})
	})

	const increment = () => scoreStore.update((n)=>n+1);

	let totalCps: number;
	totalCpsStore.subscribe(value => {
		totalCps = value;
	})

	let interval: NodeJS.Timer;
	let delay = 1000;
	$: if (totalCps > 0) {
		clearInterval(interval);
		delay = Math.max(1000/totalCps, 1);
		const increaseAmount = totalCps > 1000 ? totalCps / 1000 : 1;
		interval = setInterval(() => scoreStore.update((n)=>n+increaseAmount), delay);		
	}
</script>

<svelte:head>
	<title>FizzBuzz Clicker</title>
	<meta name="description" content="fizzbuzz clicker" />
</svelte:head>

<div class="container mx-auto p-4 grid gap-4 grid-col-1">
	<Counter />
	<ItemList />
	<Button on:click={increment} size="lg" class="w-full text-lg">+1</Button>
</div>
