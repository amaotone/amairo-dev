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
import { useCallback, useEffect } from "react";
import { ActionButtons } from "../../components/ActionButtons";
import { CardGrid } from "../../components/CardGrid";
import { CardSelector } from "../../components/CardSelector";
import { DebugInfo } from "../../components/DebugInfo";
import { Header } from "../../components/Header";
import { JoinRoomDialog } from "../../components/JoinRoomDialog";
import { ResetDialog } from "../../components/ResetDialog";
import { Stats } from "../../components/Stats";
import { useRoom } from "../../hooks/useRoom";
import { userIdAtom } from "../../stores/user";
import type { CardValue } from "../../types";
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
	const [userId, setUserId] = useAtom(userIdAtom);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		room,
		members,
		currentMember,
		openCards,
		resetCards,
		selectCard,
		loading,
	} = useRoom(roomId, userId);

	// ユーザーIDがない場合は生成
	useEffect(() => {
		if (!userId) {
			setUserId(generateId());
		}
	}, [userId, setUserId]);

	const handleCardSelect = useCallback(
		async (value: CardValue) => {
			if (!currentMember) return;
			await selectCard(value);
		},
		[currentMember, selectCard],
	);

	const handleOpenAll = useCallback(() => {
		openCards();
	}, [openCards]);

	const handleNext = useCallback(() => {
		onOpen();
	}, [onOpen]);

	const handleReset = useCallback(async () => {
		await resetCards();
		onClose();
	}, [resetCards, onClose]);

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
							<ActionButtons
								onOpenAll={handleOpenAll}
								onNext={handleNext}
								room={room}
							/>
							<Stats
								cards={members.map((m) => ({
									id: m.id,
									value: m.selectedCard ?? "?",
									isOpen: room?.isOpen ?? false,
									name: m.name,
									isSorted: false,
								}))}
							/>
						</Box>

						<Box>
							<CardGrid members={members} room={room} />
						</Box>
					</VStack>
				</Box>

				<CardSelector onSelect={handleCardSelect} />
			</Container>

			<ResetDialog isOpen={isOpen} onClose={onClose} onReset={handleReset} />

			<JoinRoomDialog
				isOpen={!currentMember && !loading}
				roomId={roomId}
				userId={userId as string}
				onJoin={() => {}}
			/>
		</>
	);
}
