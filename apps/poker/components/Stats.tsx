import { Box, HStack } from "@chakra-ui/react";
import type { CardType } from "../types";

interface StatsProps {
	cards: CardType[];
}

interface StatsData {
	average: string;
	median: string;
	max: string;
}

const calculateStats = (cards: CardType[]): StatsData | null => {
	const numericValues = cards
		.filter((card) => typeof card.value === "number")
		.map((card) => card.value as number);

	if (numericValues.length === 0) return null;

	const average =
		numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
	const sorted = [...numericValues].sort((a, b) => a - b);
	const median =
		sorted.length % 2 === 0
			? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
			: sorted[Math.floor(sorted.length / 2)];
	const max = Math.max(...numericValues);

	return {
		average: average.toFixed(1),
		median: median.toFixed(1),
		max: max.toString(),
	};
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
	<Box textAlign="center" minW={{ base: "80px", md: "100px" }}>
		<Box
			fontSize={{ base: "sm", md: "md" }}
			color="gray.500"
			mb={{ base: 1, md: 2 }}
		>
			{label}
		</Box>
		<Box
			fontSize={{ base: "2xl", md: "3xl" }}
			fontWeight="bold"
			color="brand.500"
		>
			{value}
		</Box>
	</Box>
);

export const Stats = ({ cards }: StatsProps) => {
	const stats = calculateStats(cards.filter((card) => card.isOpen));

	return (
		<HStack gap={{ base: 6, md: 12 }} justify="center" mt={8}>
			<StatItem label="Average" value={stats?.average ?? "--"} />
			<StatItem label="Median" value={stats?.median ?? "--"} />
			<StatItem label="Max" value={stats?.max ?? "--"} />
		</HStack>
	);
};
