<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import Counter from "./Counter.svelte";
	import { score } from './scores';
	import { upgrades } from './upgrades';

	// function autoClick({upgrade}) {
	// 	const delay = Math.max(1000/upgrade.cps, 1);
	// 	const increaseAmount = upgrade.cps > 1000 ? upgrade.cps / 1000 : 1;

	// }

	const increment = () => score.update((n)=>n+1);

	let clear: NodeJS.Timer;
	$: {
		clearInterval(clear);
		clear = setInterval(increment, 1000);
	}
</script>

<svelte:head>
	<title>FizzBuzz</title>
	<meta name="description" content="fizzbuzz clicker" />
</svelte:head>

<div class="container mx-auto p-4">
	<Counter />
	<Button on:click={increment}>+1</Button>
	<Card.Root>
		<Table.Root>
			<Table.Header>
				<Table.Row class="font-light">
					<Table.Cell>Name</Table.Cell>
					<Table.Cell>Count</Table.Cell>
					<Table.Cell  class="text-right">Cost(fb)</Table.Cell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
			{#each upgrades as item}
				<Table.Row>
					<Table.Cell class="font-extrabold">{item.name} ({item.cps}/s)</Table.Cell>
					<Table.Cell>0</Table.Cell>
					<Table.Cell class="text-right"><Button class="">{Intl.NumberFormat("en-US", {notation: 'compact', maximumFractionDigits: 1}).format(item.cost)}</Button></Table.Cell>
				</Table.Row>
			{/each}
			</Table.Body>
		</Table.Root>
	</Card.Root>
</div>
