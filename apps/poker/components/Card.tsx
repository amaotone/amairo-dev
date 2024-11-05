import { Box } from "@chakra-ui/react";
import anime from "animejs";
import { Coffee02Icon } from "hugeicons-react";
import { type FC, useEffect, useState } from "react";

interface CardProps {
	id: string;
	value: string | number;
	isOpen: boolean;
	name: string;
	isSorted: boolean;
}

const animateInitialAppearance = (id: string, onComplete: () => void) => {
	const timeline = anime.timeline({ easing: "easeOutCubic" });
	const element = document.getElementById(`card-container-${id}`);

	if (element) {
		element.style.opacity = "0";
		element.style.transform = "translateY(30px)";
	}

	timeline
		.add({
			targets: `#card-container-${id}`,
			translateY: [30, 0],
			opacity: [0, 1],
			duration: 400,
			complete: onComplete,
		})
		.add({
			targets: `#${id}-name`,
			opacity: [0, 1],
			duration: 300,
			begin: () => {
				const nameElement = document.getElementById(`${id}-name`);
				if (nameElement) nameElement.style.opacity = "0";
			},
			delay: 100,
		});
};

const animateSortedAppearance = (id: string) => {
	const element = document.getElementById(`card-container-${id}`);
	if (!element) return;

	element.style.opacity = "0";
	element.style.transform = "translateY(-50px)";

	anime({
		targets: element,
		translateY: [-50, 0],
		opacity: [0, 1],
		duration: 500,
		easing: "easeOutBounce",
	});
};

export const Card: FC<CardProps> = ({ id, value, isOpen, name, isSorted }) => {
	const [isAnimationComplete, setIsAnimationComplete] = useState(false);
	const [prevIsSorted, setPrevIsSorted] = useState(isSorted);

	useEffect(() => {
		animateInitialAppearance(id, () => setIsAnimationComplete(true));
	}, [id]);

	useEffect(() => {
		if (isSorted === prevIsSorted) return;
		setPrevIsSorted(isSorted);

		if (!isSorted) return;
		animateSortedAppearance(id);
	}, [isSorted, id, prevIsSorted]);

	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<Box
				id={`card-container-${id}`}
				opacity={0}
				style={{ willChange: "transform" }}
			>
				<Box
					id={id}
					position="relative"
					width="60px"
					height="90px"
					style={{ transformStyle: "preserve-3d" }}
					transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
					transform={
						isAnimationComplete
							? isOpen
								? "rotateY(0deg)"
								: "rotateY(180deg)"
							: "rotateY(180deg)"
					}
				>
					<Box
						position="absolute"
						w="100%"
						h="100%"
						style={{ backfaceVisibility: "hidden" }}
						display="flex"
						alignItems="center"
						justifyContent="center"
						border="2px solid"
						borderColor="gray.300"
						borderRadius="8px"
						transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
						bg="brand.500"
						transform="rotateY(180deg)"
					/>
					<Box
						position="absolute"
						w="100%"
						h="100%"
						style={{ backfaceVisibility: "hidden" }}
						display="flex"
						alignItems="center"
						justifyContent="center"
						border="2px solid"
						borderColor="gray.300"
						borderRadius="8px"
						transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
						bg="white"
						flexDirection="column"
						visibility={isOpen ? "visible" : "hidden"}
					>
						<Box fontSize="xl" fontWeight="bold">
							{value === "☕" ? <Coffee02Icon color="currentColor" /> : value}
						</Box>
					</Box>
				</Box>
			</Box>
			<Box
				id={`${id}-name`}
				fontSize="12px"
				mt="4px"
				color="gray.600"
				fontWeight="500"
				opacity={0}
			>
				{name}
			</Box>
		</Box>
	);
};
