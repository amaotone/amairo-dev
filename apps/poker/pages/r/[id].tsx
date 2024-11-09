import {
	Box,
	Center,
	Container,
	Spinner,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import type { GetServerSideProps } from "next";
import { useEffect } from "react";
import { ActionButtons } from "../../components/ActionButtons";
import { CardGrid } from "../../components/CardGrid";
import { CardSelector } from "../../components/CardSelector";
import { DebugInfo } from "../../components/DebugInfo";
import { Header } from "../../components/Header";
import { JoinRoomDialog } from "../../components/JoinRoomDialog";
import { ResetDialog } from "../../components/ResetDialog";
import { Stats } from "../../components/Stats";
import { useCards } from "../../hooks/useCards";
import { useRoom } from "../../hooks/useRoom";
import { userIdAtom } from "../../stores/user";
import { generateId, isValidId } from "../../utils/id";
import type {} from "../../utils/room";

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
	const [userId, setUserId] = useAtom(userIdAtom);
	const { cards, addCard, openAllCards, resetCards } = useCards();
	const { isOpen, onOpen: openDialog, onClose: closeDialog } = useDisclosure();

	useEffect(() => {
		if (!userId) {
			setUserId(generateId());
		}
	}, [userId, setUserId]);

	const { room, members, currentMember, loading, error } = useRoom(
		roomId,
		userId,
	);

	const handleReset = async () => {
		resetCards();
		closeDialog();
	};

	if (loading) {
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
			<DebugInfo room={room} members={members} currentMember={currentMember} />
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
				isOpen={!currentMember && !loading}
				roomId={roomId as string}
				userId={userId as string}
				onJoin={() => {}}
			/>
		</>
	);
}
