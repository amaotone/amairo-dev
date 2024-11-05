import { Grid, GridItem } from "@chakra-ui/react";
import type { CardType } from "../types";
import { Card } from "./Card";

interface CardGridProps {
	cards: CardType[];
}

export const CardGrid = ({ cards }: CardGridProps) => (
	<Grid
		templateColumns={{
			base: "repeat(5, 60px)",
			md: "repeat(5, 80px)",
		}}
		templateRows="repeat(3, 1fr)"
		gap={4}
		justifyContent="center"
		maxW={{
			base: "calc(60px * 5 + var(--chakra-space-4) * 4)",
			md: "calc(80px * 5 + var(--chakra-space-4) * 4)",
		}}
		h={{
			base: "calc(110px * 3 + var(--chakra-space-4) * 2)",
			md: "calc(150px * 3 + var(--chakra-space-4) * 2)",
		}}
		mx="auto"
	>
		{cards.slice(0, 15).map((card) => (
			<GridItem
				key={card.id}
				h={{ base: "110px", md: "150px" }}
				display="flex"
				alignItems="flex-start"
			>
				<Card
					id={card.id}
					value={card.value}
					isOpen={card.isOpen}
					name={card.name}
					isSorted={card.isSorted}
					width={{ base: "60px", md: "80px" }}
				/>
			</GridItem>
		))}
	</Grid>
);
