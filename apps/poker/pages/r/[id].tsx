import {
	Box,
	Container,
	VStack,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
import Head from "next/head";
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
import { getRoom, updateMember } from "../../utils/firebase";
import type { Room, RoomMember } from "../../utils/firebase";
import { db } from "../../utils/firebase-config";

// ユーザーIDを生成する関数
const generateUserId = () => crypto.randomUUID();

export default function RoomPage() {
	const router = useRouter();
	const { id: roomId } = router.query;
	const [room, setRoom] = useState<Room | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [userId, setUserId] = useState<string>("");
	const [currentMember, setCurrentMember] = useState<RoomMember | null>(null);
	const toast = useToast();
	const { isOpen, onOpen: openDialog, onClose: closeDialog } = useDisclosure();
	const { cards, addCard, openAllCards, resetCards } = useCards();

	// クライアントサイドでのみユーザーIDを初期化
	useEffect(() => {
		const storedUserId = localStorage.getItem("userId");
		const newUserId = storedUserId || generateUserId();

		if (!storedUserId) {
			localStorage.setItem("userId", newUserId);
		}

		setUserId(newUserId);
	}, []);

	// 部屋の購読（userIdが設定された後のみ実行）
	useEffect(() => {
		if (!roomId || !userId) return;

		const unsubscribe = onSnapshot(
			doc(db, "rooms", roomId as string),
			async (doc) => {
				if (!doc.exists()) {
					toast({
						title: "部屋が見つかりません",
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
					title: "エラーが発生しました",
					status: "error",
					duration: 3000,
				});
			},
		);

		return () => unsubscribe();
	}, [roomId, router, toast, userId]);

	// メンバー情報の購読（userIdが設定された後のみ実行）
	useEffect(() => {
		if (!roomId || !userId) return;

		const unsubscribe = onSnapshot(
			doc(db, "rooms", roomId as string, "members", userId),
			(doc) => {
				setCurrentMember(doc.exists() ? (doc.data() as RoomMember) : null);
			},
		);

		return () => unsubscribe();
	}, [roomId, userId]);

	const handleReset = async () => {
		resetCards();
		closeDialog();
	};

	// userIdが設定されていない場合はローディング表示
	if (!userId || isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>Planning Poker</title>
				<meta name="description" content="Planning Poker Room" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

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
				userId={userId}
				onJoin={() => {
					// メンバーの更新は自動的に検知されるため
					// 特に何もする必要はありません
				}}
			/>
		</>
	);
}
