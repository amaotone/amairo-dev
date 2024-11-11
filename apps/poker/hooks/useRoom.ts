import { useToast } from "@chakra-ui/react";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import type { Member, Room } from "../models/room";
import { createRoom, memberConverter, roomConverter } from "../models/room";
import {
	openCards as openCardsModel,
	resetCards as resetCardsModel,
} from "../models/room";
import type { CardValue } from "../types";
import { db } from "../utils/firebase-config";

interface RoomState {
	room: Room | null;
	currentMember: Member | null;
	members: Member[];
	loading: boolean;
	error: string | null;
	selectCard: (value: string | null) => Promise<void>;
}

const initialState: RoomState = {
	room: null,
	currentMember: null,
	members: [],
	loading: true,
	error: null,
	selectCard: async () => {},
};

export function useRoom(roomId: string, userId: string | null) {
	const [state, setState] = useState<RoomState>(initialState);
	const toast = useToast();

	// 部屋の購読
	useEffect(() => {
		const roomRef = doc(db, "rooms", roomId).withConverter(roomConverter);

		// 部屋が存在しない場合は作成
		const initializeRoom = async () => {
			try {
				await createRoom(roomId);
			} catch (error) {
				console.error("Error creating room:", error);
				toast({
					title: "Error creating room",
					status: "error",
					duration: 3000,
				});
				setState((prev) => ({ ...prev, error: "error_create_room" }));
			}
		};

		const unsubscribe = onSnapshot(
			roomRef,
			(doc) => {
				if (!doc.exists()) {
					initializeRoom();
					return;
				}

				setState((prev) => ({
					...prev,
					room: doc.data(),
					loading: false,
				}));
			},
			(error) => {
				console.error("Error fetching room:", error);
				toast({
					title: "Error fetching room",
					status: "error",
					duration: 3000,
				});
				setState((prev) => ({ ...prev, error: "error_fetch_room" }));
			},
		);

		return () => unsubscribe();
	}, [roomId, toast]);

	// メンバー情報の購読
	useEffect(() => {
		if (!userId) return;

		const memberRef = doc(db, "rooms", roomId, "members", userId).withConverter(
			memberConverter,
		);
		const unsubscribe = onSnapshot(
			memberRef,
			(doc) => {
				if (doc.exists()) {
					const member = doc.data();
					setState((prev) => ({ ...prev, currentMember: member }));
				}
			},
			(error) => {
				console.error("Error fetching member:", error);
				toast({
					title: "Failed to fetch member information",
					status: "error",
					duration: 3000,
				});
				setState((prev) => ({ ...prev, error: "error_fetch_member" }));
			},
		);

		return () => unsubscribe();
	}, [roomId, userId, toast]);

	// メンバー一覧の購読
	useEffect(() => {
		const membersRef = collection(db, "rooms", roomId, "members").withConverter(
			memberConverter,
		);
		const unsubscribe = onSnapshot(
			membersRef,
			(snapshot) => {
				const members = snapshot.docs.map((doc) => doc.data());
				setState((prev) => ({ ...prev, members }));
			},
			(error) => {
				console.error("Error fetching members:", error);
				toast({
					title: "Failed to fetch members",
					status: "error",
					duration: 3000,
				});
				setState((prev) => ({ ...prev, error: "error_fetch_members" }));
			},
		);

		return () => unsubscribe();
	}, [roomId, toast]);

	// カード選択関数を追加
	const selectCard = useCallback(
		async (value: CardValue) => {
			if (!userId) return;
			console.log("selectCard", value);

			const memberRef = doc(
				db,
				"rooms",
				roomId,
				"members",
				userId,
			).withConverter(memberConverter);
			try {
				await updateDoc(memberRef, {
					selectedCard: value,
				});
			} catch (error) {
				console.error("Error updating card:", error);
				toast({
					title: "カードの選択に失敗しました",
					status: "error",
					duration: 3000,
				});
			}
		},
		[roomId, userId, toast],
	);

	const openCards = useCallback(async () => {
		try {
			await openCardsModel(roomId);
		} catch (error) {
			console.error("Error opening cards:", error);
			toast({
				title: "Failed to open cards",
				status: "error",
				duration: 3000,
			});
		}
	}, [roomId, toast]);

	const resetCards = useCallback(async () => {
		try {
			await resetCardsModel(roomId);
		} catch (error) {
			console.error("Error resetting cards:", error);
			toast({
				title: "Failed to reset cards",
				status: "error",
				duration: 3000,
			});
		}
	}, [roomId, toast]);

	return {
		...state,
		selectCard,
		openCards,
		resetCards,
	};
}