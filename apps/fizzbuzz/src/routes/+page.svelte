<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import Counter from "./Counter.svelte";
	import ItemList from "./ItemList.svelte";
	import { ownedItemsStore, totalCpsStore } from './items';
	import { scoreStore } from './scores';
	
	let ownedItems: { [key: string]: number };
	ownedItemsStore.subscribe(value => {
		ownedItems = value;
	})

	let score: number;
	scoreStore.subscribe(value => {
		score = value;
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
	<title>FizzBuzz</title>
	<meta name="description" content="fizzbuzz clicker" />
</svelte:head>

<div class="container mx-auto p-4 grid gap-4 grid-col-1">
	<Counter />
	<ItemList />
	<Button on:click={increment} size="lg" class="w-full text-lg">+1</Button>
</div>
