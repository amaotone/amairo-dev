export function formatNumber(n: number) {
	return Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n);
}

export function calcCost(baseCost: number, count: number) {
	return Math.floor(baseCost * Math.pow(1.1, count));
}
