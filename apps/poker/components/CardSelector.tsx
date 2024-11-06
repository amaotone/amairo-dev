import { Box, Button, Container, HStack } from "@chakra-ui/react";
import { Coffee02Icon } from "hugeicons-react";
import { CARD_VALUES, type CardValue } from "../utils/types";

interface CardSelectorProps {
	onSelect: (value: CardValue) => void;
}

const getButtonStyle = (value: CardValue) => {
	if (value === "☕") {
		return {
			border: "2px solid",
			borderColor: "brown.300",
			bg: "#FDF6E3",
			color: "#5D4037",
			transition: "all 0.2s ease-in-out",
			_hover: {
				bg: "#F5EBD7",
				transform: "translateY(-4px)",
				boxShadow: "lg",
			},
		};
	}
	if (value === "?") {
		return {
			border: "2px solid",
			borderColor: "purple.100",
			bg: "#FAF5FF",
			color: "purple.700",
			transition: "all 0.2s ease-in-out",
			_hover: {
				bg: "#F3E8FF",
				transform: "translateY(-4px)",
				boxShadow: "lg",
			},
		};
	}
	return {
		border: "2px solid",
		borderColor: "brand.100",
		bg: "white",
		color: "brand.700",
		transition: "all 0.2s ease-in-out",
		_hover: {
			bg: "gray.50",
			transform: "translateY(-4px)",
			boxShadow: "lg",
		},
	};
};

export const CardSelector: React.FC<CardSelectorProps> = ({ onSelect }) => (
	<Box bg="white" py={4} px={4} flexShrink={0}>
		<Container maxW="container.lg">
			<HStack gap={2} justify="center" flexWrap="wrap">
				{CARD_VALUES.map((value) => {
					const buttonStyle = getButtonStyle(value);
					return (
						<Button
							key={value}
							onClick={() => onSelect(value)}
							size="md"
							w="16"
							h="12"
							fontSize="xl"
							{...buttonStyle}
						>
							{value === "☕" ? <Coffee02Icon color="currentColor" /> : value}
						</Button>
					);
				})}
			</HStack>
		</Container>
	</Box>
);
