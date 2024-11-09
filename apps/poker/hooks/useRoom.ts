import { useToast } from "@chakra-ui/react";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase-config";
import type { Room, RoomMember } from "../utils/room";
import { createRoom } from "../utils/room";

export function useRoom(roomId: string, userId: string | null) {
	const [room, setRoom] = useState<Room | null>(null);
	const [currentMember, setCurrentMember] = useState<RoomMember | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const toast = useToast();

	// 部屋の取得または作成と購読
	useEffect(() => {
		const fetchOrCreateRoom = async () => {
			const roomRef = doc(db, "rooms", roomId);
			const roomDoc = await getDoc(roomRef);

			if (!roomDoc.exists()) {
				const newRoom = createRoom(roomId);
				await setDoc(roomRef, newRoom);
			}
		};

		fetchOrCreateRoom().catch((error) => {
			console.error("Error creating/fetching room:", error);
			toast({
				title: "Error creating/fetching room",
				status: "error",
				duration: 3000,
			});
			setError("error_create_room");
		});

		// 部屋のsubscribe
		const unsubscribe = onSnapshot(
			doc(db, "rooms", roomId),
			(doc) => {
				const roomData = {
					id: doc.id,
					...doc.data(),
				} as Room;
				setRoom(roomData);
				setLoading(false);
			},
			(error) => {
				console.error("Error fetching room:", error);
				toast({
					title: "Error fetching room",
					status: "error",
					duration: 3000,
				});
				setError("error_fetch_room");
			},
		);

		return () => unsubscribe();
	}, [roomId, toast]);

	// メンバー情報の購読
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
					setError("error_fetch_member");
				}
			},
			(error) => {
				console.error("Error fetching member:", error);
				toast({
					title: "Failed to fetch member information",
					status: "error",
					duration: 3000,
				});
				setError("error_fetch_member");
			},
		);

		return () => unsubscribe();
	}, [roomId, userId, toast]);

	return {
		room,
		currentMember,
		loading,
		error,
	};
}
