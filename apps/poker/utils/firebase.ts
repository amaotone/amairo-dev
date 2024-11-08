import {
	type Timestamp,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";

export interface RoomMember {
	name: string;
	selectedCard: string | null;
}

export interface Room {
	id: string;
	createdAt: Timestamp;
	lastOpenedAt: Timestamp;
	members?: Record<string, RoomMember>;
}

// 部屋の作成
export const createRoom = async (roomId: string): Promise<string> => {
	const roomRef = doc(db, "rooms", roomId);
	await setDoc(roomRef, {
		createdAt: serverTimestamp(),
	});
	return roomId;
};

// 部屋の取得
export const getRoom = async (roomId: string): Promise<Room | null> => {
	const docRef = doc(db, "rooms", roomId);
	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) {
		return null;
	}

	return {
		id: docSnap.id,
		...docSnap.data(),
	} as Room;
};

// メンバーの追加/更新
export const updateMember = async (
	roomId: string,
	userId: string,
	memberData: RoomMember,
) => {
	const memberRef = doc(db, "rooms", roomId, "members", userId);
	await setDoc(memberRef, memberData);
};

// カードの選択
export const selectCard = async (
	roomId: string,
	userId: string,
	cardValue: string | null,
) => {
	const memberRef = doc(db, "rooms", roomId, "members", userId);
	await updateDoc(memberRef, {
		selectedCard: cardValue,
	});
};

// カードを開く（lastOpenedAtを更新）
export const openCards = async (roomId: string) => {
	const roomRef = doc(db, "rooms", roomId);
	await updateDoc(roomRef, {
		lastOpenedAt: serverTimestamp(),
	});
};
