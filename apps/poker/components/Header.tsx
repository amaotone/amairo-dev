import { Box, Button, HStack, Heading } from "@chakra-ui/react";
import { AddTeamIcon, Cards01Icon, Share01Icon } from "hugeicons-react";

export const Header: React.FC = () => (
	<Box
		py={2}
		px={8}
		display="flex"
		justifyContent="space-between"
		alignItems="center"
		h="52px"
		flexShrink={0}
	>
		<HStack spacing={2}>
			<Cards01Icon size={24} color="var(--chakra-colors-brand-500)" />
			<Heading color="brand.500" size="md">
				Planning Poker
			</Heading>
		</HStack>
		<HStack gap={2}>
			<Button
				colorScheme="brand"
				variant="ghost"
				size="sm"
				onClick={() => {
					console.log("Invite team members");
				}}
				w={{ base: "8", md: "auto" }}
				minW={{ base: "8", md: "auto" }}
				p={{ base: "0", md: "2" }}
			>
				<AddTeamIcon size={20} />
				<Box display={{ base: "none", md: "block" }} ml={{ md: 2 }}>
					Invite
				</Box>
			</Button>
			<Button
				colorScheme="brand"
				variant="ghost"
				size="sm"
				onClick={() => {
					navigator.clipboard.writeText(window.location.href);
				}}
				w={{ base: "8", md: "auto" }}
				minW={{ base: "8", md: "auto" }}
				p={{ base: "0", md: "2" }}
			>
				<Share01Icon size={20} />
				<Box display={{ base: "none", md: "block" }} ml={{ md: 2 }}>
					Share
				</Box>
			</Button>
		</HStack>
	</Box>
);
