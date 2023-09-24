import { derived, writable } from 'svelte/store';

export type Item = {
	name: string;
	cps: number;
	cost: number;
};

export const items: Item[] = [
	{
		name: 'Cursor',
		cps: 1,
		cost: 1
	},
	{
		name: 'Programmer',
		cps: 10,
		cost: 10
	},
	{
		name: 'Team',
		cps: 80,
		cost: 110
	},
	{
		name: 'Company',
		cps: 470,
		cost: 1200
	},
	{
		name: 'Country',
		cps: 2600,
		cost: 13000
	},
	{
		name: 'Planet',
		cps: 14000,
		cost: 140000
	},
	{
		name: 'Galaxy',
		cps: 78000,
		cost: 2000000
	}
];

const itemsObject = Object.fromEntries(items.map((items) => [items.name, items]));

export const ownedItemsStore = writable(Object.fromEntries(items.map((item) => [item.name, 0])));

export const totalCpsStore = derived([ownedItemsStore], ([$ownedItems]) => {
	return Object.entries($ownedItems).reduce((total, [name, count]) => {
		return total + itemsObject[name].cps * count;
	}, 0);
});

ownedItemsStore.subscribe(console.log);
totalCpsStore.subscribe(console.log);
