import {
	Box,
	Center,
	Container,
	Spinner,
	VStack,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
import { useAtom } from "jotai";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ActionButtons } from "../../components/ActionButtons";
import { CardGrid } from "../../components/CardGrid";
import { CardSelector } from "../../components/CardSelector";
import { Header } from "../../components/Header";
import { JoinRoomDialog } from "../../components/JoinRoomDialog";
import { ResetDialog } from "../../components/ResetDialog";
import { Stats } from "../../components/Stats";
import { useCards } from "../../hooks/useCards";
import { userIdAtom } from "../../stores/user";
import type { Room, RoomMember } from "../../utils/firebase";
import { db } from "../../utils/firebase-config";
import { generateId, isValidId } from "../../utils/id";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.query;

	if (typeof id !== "string" || !isValidId(id)) {
		return {
			redirect: {
				destination: "/?error=invalid_room_id",
				permanent: false,
			},
		};
	}

	return {
		props: {
			roomId: id,
		},
	};
};

export default function RoomPageComponent({ roomId }: { roomId: string }) {
	const router = useRouter();
	const [userId, setUserId] = useAtom(userIdAtom);
	const [room, setRoom] = useState<Room | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [currentMember, setCurrentMember] = useState<RoomMember | null>(null);
	const toast = useToast();
	const { isOpen, onOpen: openDialog, onClose: closeDialog } = useDisclosure();
	const { cards, addCard, openAllCards, resetCards } = useCards();

	useEffect(() => {
		if (!userId) {
			setUserId(generateId());
		}
	}, [userId, setUserId]);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			doc(db, "rooms", roomId as string),
			async (doc) => {
				if (!doc.exists()) {
					toast({
						title: "Room not found",
						status: "error",
						duration: 3000,
					});
					router.push("/");
					return;
				}

				const roomData = {
					id: doc.id,
					...doc.data(),
				} as Room;
				setRoom(roomData);
				setIsLoading(false);
			},
			(error) => {
				console.error("Error fetching room:", error);
				toast({
					title: "Error fetching room",
					status: "error",
					duration: 3000,
				});
			},
		);

		return () => unsubscribe();
	}, [roomId, router, toast]);

	useEffect(() => {
		if (!userId) return;

		const unsubscribe = onSnapshot(
			doc(db, "rooms", roomId, "members", userId),
			(doc) => {
				if (doc.exists()) {
					const memberData = doc.data() as RoomMember;
					setCurrentMember(memberData);
					toast({
						title: `Welcome ${memberData.name}!`,
						status: "success",
						duration: 3000,
						position: "top",
						colorScheme: "brand",
					});
				} else {
					setCurrentMember(null);
				}
			},
			(error) => {
				console.error("Error fetching member:", error);
				toast({
					title: "Failed to fetch member information",
					status: "error",
					duration: 3000,
				});
			},
		);

		return () => unsubscribe();
	}, [roomId, userId, toast]);

	const handleReset = async () => {
		resetCards();
		closeDialog();
	};

	if (isLoading) {
		return (
			<Container
				minH="100dvh"
				maxW="container.lg"
				p={0}
				display="flex"
				flexDirection="column"
			>
				<Header />
				<Center flex="1">
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="blue.500"
						size="xl"
					/>
				</Center>
			</Container>
		);
	}

	return (
		<>
			<Container
				minH="100dvh"
				maxW="container.lg"
				p={0}
				display="flex"
				flexDirection="column"
			>
				<Header />

				<Box
					px={8}
					flex="1"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					overflow="auto"
				>
					<VStack gap={8} align="stretch">
						<Box>
							<ActionButtons onOpenAll={openAllCards} onNext={openDialog} />

							<Stats cards={cards} />
						</Box>

						<Box>
							<CardGrid cards={cards} />
						</Box>
					</VStack>
				</Box>

				<CardSelector onSelect={addCard} />
			</Container>

			<ResetDialog
				isOpen={isOpen}
				onClose={closeDialog}
				onReset={handleReset}
			/>

			<JoinRoomDialog
				isOpen={!currentMember && !isLoading}
				roomId={roomId as string}
				userId={userId as string}
				onJoin={() => {}}
			/>
		</>
	);
}
