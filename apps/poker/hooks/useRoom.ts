import { useToast } from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase-config";
import type { Room, RoomMember } from "../utils/room";

export function useRoom(roomId: string, userId: string | null) {
	const [room, setRoom] = useState<Room | null>(null);
	const [currentMember, setCurrentMember] = useState<RoomMember | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const toast = useToast();

	// 部屋の購読
	useEffect(() => {
		const unsubscribe = onSnapshot(
			doc(db, "rooms", roomId),
			(doc) => {
				if (!doc.exists()) {
					toast({
						title: "Room not found",
						status: "error",
						duration: 3000,
					});
					throw new Error("Room not found");
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

	return {
		room,
		currentMember,
		isLoading,
	};
}
