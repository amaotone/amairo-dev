import { Grid, GridItem } from "@chakra-ui/react";
import anime from "animejs";
import { useCallback, useEffect } from "react";
import type { Member, Room } from "../models/room";
import type { CardType } from "../utils/types";
import { Card } from "./Card";

interface CardGridProps {
	members: Member[];
	room: Room | null;
	cards?: CardType[];
}

export const CardGrid = ({ members, room, cards = [] }: CardGridProps) => {
	const handleFlipAll = useCallback(() => {
		if (!room?.isOpen) return;

		anime({
			targets: ".card-flip",
			rotateY: [180, 0],
			duration: 400,
			delay: anime.stagger(50, { from: "first" }),
			easing: "easeInOutQuad",
		});
	}, [room?.isOpen]);

	useEffect(() => {
		handleFlipAll();
	}, [handleFlipAll]);

	return (
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
			{members.map((member) => (
				<GridItem
					key={member.id}
					h={{ base: "110px", md: "150px" }}
					display="flex"
					alignItems="flex-start"
				>
					{member.selectedCard && (
						<Card
							id={member.id}
							value={member.selectedCard}
							isOpen={room?.isOpen ?? false}
							name={member.name}
							isSorted={false}
							width={{ base: "60px", md: "80px" }}
							className="card-flip"
						/>
					)}
				</GridItem>
			))}
		</Grid>
	);
};
