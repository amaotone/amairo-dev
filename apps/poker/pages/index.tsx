import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { Cards01Icon } from "hugeicons-react";
import { useRouter } from "next/router";
import { createRoom } from "../utils/firebase";

const HomePage = () => {
	const router = useRouter();

	const handleCreateRoom = async () => {
		try {
			const roomId = await createRoom();
			router.push(`/r/${roomId}`);
		} catch (error) {
			console.error("Failed to create room:", error);
		}
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			minH="100dvh"
		>
			<Container centerContent>
				<Cards01Icon size={48} color="var(--chakra-colors-brand-500)" />
				<Heading color="brand.500" size="xl">
					PlanningPoker
				</Heading>
				<Button colorScheme="brand" size="md" onClick={handleCreateRoom} mt={8}>
					Create Room
				</Button>
			</Container>
		</Box>
	);
};

export default HomePage;
