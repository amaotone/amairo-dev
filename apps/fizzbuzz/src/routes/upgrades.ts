type Upgrade = {
	name: string;
	cps: number;
	cost: number;
};

export const upgrades: Upgrade[] = [
	{
		name: 'Cursor',
		cps: 0.1,
		cost: 1
	},
	{
		name: 'Grandma',
		cps: 1,
		cost: 10
	},
	{
		name: 'Farm',
		cps: 8,
		cost: 110
	},
	{
		name: 'Mine',
		cps: 47,
		cost: 1200
	},
	{
		name: 'Factory',
		cps: 260,
		cost: 13000
	},
	{
		name: 'Bank',
		cps: 1400,
		cost: 140000
	}
];
