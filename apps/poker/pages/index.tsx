import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Cards01Icon } from "hugeicons-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { generateId } from "../utils/id";
import { createRoom } from "../utils/room";

const HomePage = () => {
	const router = useRouter();
	const toast = useToast();

	useEffect(() => {
		const { error } = router.query;

		if (error === "invalid_room_id") {
			toast({
				title: "Invalid Room ID",
				status: "error",
				duration: 5000,
				position: "top",
			});
			router.replace("/", undefined, { shallow: true });
		}
		if (error === "create_room_failed") {
			toast({
				title: "Failed to create room",
				status: "error",
				duration: 5000,
				position: "top",
			});
			router.replace("/", undefined, { shallow: true });
		}
	}, [router.query, toast, router]);

	const handleCreateRoom = async () => {
		try {
			const roomId = generateId();
			await createRoom(roomId);
			router.push(`/r/${roomId}`);
		} catch (error) {
			console.error("Failed to create room:", error);
			router.push("/?error=create_room_failed");
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
