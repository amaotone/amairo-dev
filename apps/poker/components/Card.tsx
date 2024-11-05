import { Box } from "@chakra-ui/react";
import anime from "animejs";
import { Coffee02Icon } from "hugeicons-react";
import { type FC, useEffect, useState } from "react";
import type { CardValue } from "../types";

interface CardStyle {
	borderColor: string;
	background: string;
	textColor: string;
}

interface CardProps {
	id: string;
	value: CardValue;
	isOpen: boolean;
	name: string;
	isSorted: boolean;
	width?: { base: string; md: string };
}

const getCardStyle = (value: CardValue): CardStyle => {
	if (value === "☕") {
		return {
			borderColor: "brown.300",
			background: "#FDF6E3",
			textColor: "brown.700",
		};
	}
	if (value === "?") {
		return {
			borderColor: "purple.100",
			background: "#FAF5FF",
			textColor: "purple.700",
		};
	}
	return {
		borderColor: "brand.100",
		background: "white",
		textColor: "brand.700",
	};
};

const CardContent: FC<{ value: CardValue }> = ({ value }) => {
	if (value === "☕") {
		return (
			<Coffee02Icon
				style={{
					width: "1.2em",
					height: "1.2em",
				}}
				color="#5D4037"
			/>
		);
	}
	return (
		<Box
			fontSize={{ base: "lg", md: "3xl" }}
			fontWeight="bold"
			color={getCardStyle(value).textColor}
		>
			{value}
		</Box>
	);
};

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

export const Card: FC<CardProps> = ({
	id,
	value,
	isOpen,
	name,
	isSorted,
	width = { base: "60px", md: "80px" },
}) => {
	const [isAnimationComplete, setIsAnimationComplete] = useState(false);
	const [prevIsSorted, setPrevIsSorted] = useState(isSorted);
	const cardStyle = getCardStyle(value);

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
					width={width}
					height={{ base: "84px", md: "112px" }}
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
						borderColor="brand.300"
						borderRadius="8px"
						transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
						bgGradient="linear(to-br, brand.300, brand.500, brand.700)"
						boxShadow="inset 0 0 10px rgba(0, 0, 0, 0.1)"
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
						flexDirection="column"
						border="2px solid"
						borderColor={cardStyle.borderColor}
						borderRadius="8px"
						transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
						bg={cardStyle.background}
						visibility={isOpen ? "visible" : "hidden"}
						fontSize={{ base: "lg", md: "3xl" }}
					>
						<CardContent value={value} />
					</Box>
				</Box>
			</Box>
			<Box
				id={`${id}-name`}
				fontSize={{ base: "xs", md: "sm" }}
				color="gray.500"
				fontWeight="500"
				opacity={0}
				mt={2}
				maxW={width}
				textAlign="center"
				overflow="hidden"
				textOverflow="ellipsis"
				whiteSpace="nowrap"
				lineHeight="1.5"
			>
				{name}
			</Box>
		</Box>
	);
};
