import { Box, Button, Container, HStack } from "@chakra-ui/react";
import { Coffee02Icon } from "hugeicons-react";
import { CARD_VALUES, type CardValue } from "../types";

interface CardSelectorProps {
	onSelect: (value: CardValue) => void;
}

export const CardSelector: React.FC<CardSelectorProps> = ({ onSelect }) => (
	<Box bg="white" py={4} px={4} flexShrink={0}>
		<Container maxW="container.lg">
			<HStack gap={2} justify="center" flexWrap="wrap">
				{CARD_VALUES.map((value) => (
					<Button
						key={value}
						onClick={() => onSelect(value)}
						size="md"
						colorScheme="brand"
						variant="outline"
						w="16"
						h="12"
						fontSize="xl"
					>
						{value === "☕" ? <Coffee02Icon color="currentColor" /> : value}
					</Button>
				))}
			</HStack>
		</Container>
	</Box>
);
