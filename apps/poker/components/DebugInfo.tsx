import { Box, Text, VStack } from "@chakra-ui/react";
import type { Member, Room } from "../models/room";

interface DebugInfoProps {
	room: Room | null;
	members: Member[];
	currentMember: Member | null;
}

export function DebugInfo({ room, members, currentMember }: DebugInfoProps) {
	if (process.env.NODE_ENV === "production") return null;

	return (
		<Box
			position="fixed"
			top={2}
			left={2}
			bg="blackAlpha.700"
			color="white"
			p={4}
			borderRadius="md"
			fontSize="sm"
			maxW="300px"
			zIndex={1000}
		>
			<VStack align="start" spacing={1}>
				<Text>🔧 Debug Info:</Text>
				<Text>{JSON.stringify(room, undefined, 2)}</Text>
				<Text>{JSON.stringify(members, undefined, 2)}</Text>
				<Text>{JSON.stringify(currentMember, undefined, 2)}</Text>
			</VStack>
		</Box>
	);
}
