<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Table from "$lib/components/ui/table";
	import type { Item } from './items';
	import { items, ownedItemsStore } from './items';
	import { scoreStore } from './scores';
	import { FIZZBUZZ } from "./settings";
	import { calcCost, formatNumber } from "./utils";

	let ownedItems: { [key: string]: number };
	ownedItemsStore.subscribe(value => {
		ownedItems = value;
	})

	let count=0;
	let fizzbuzz=0;
	scoreStore.subscribe(value => {
		count = value
		fizzbuzz = Math.floor(count / FIZZBUZZ);
	})

	function buyItem(item: Item) {
		const cost = calcCost(item.cost, ownedItems[item.name] || 0) * FIZZBUZZ
		if (count < cost) return;
		scoreStore.update((n) => n - cost);
		ownedItemsStore.update((ownedItems) => {
			ownedItems[item.name] = ownedItems[item.name] + 1 || 1;
			return ownedItems;
		});
	}
</script>

<Card.Root>
	<Table.Root>
		<Table.Header>
			<Table.Row class="font-light">
				<Table.Cell>Name</Table.Cell>
				<Table.Cell>Count</Table.Cell>
				<Table.Cell class="text-right">Cost(FB)</Table.Cell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
		{#each items as item}
			<Table.Row>
				<Table.Cell class="font-extrabold">{item.name} ({formatNumber(item.cps)}/s)</Table.Cell>
				<Table.Cell>{ownedItems[item.name]}</Table.Cell>
				<Table.Cell class="text-right">
					<Button on:click={()=>buyItem(item)} variant={fizzbuzz < calcCost(item.cost, ownedItems[item.name]) ? 'outline' : 'default'}>
						{formatNumber(calcCost(item.cost, ownedItems[item.name]))}
					</Button>
				</Table.Cell>
			</Table.Row>
		{/each}
		</Table.Body>
	</Table.Root>
</Card.Root>
