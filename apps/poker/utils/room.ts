import {
	Timestamp as FirestoreTimestamp,
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
	expireAt: Timestamp;
	isVoting: boolean;
	members?: Record<string, RoomMember>;
}

export const createRoom = async (roomId: string): Promise<string> => {
	const roomRef = doc(db, "rooms", roomId);
	const result = await setDoc(roomRef, {
		createdAt: serverTimestamp(),
	});
	console.log(result);
	return roomId;
};

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
	const roomRef = doc(db, "rooms", roomId);

	// 1日後のタイムスタンプを作成
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	// メンバーの更新とexpireAtの設定を同時に行う
	await Promise.all([
		setDoc(memberRef, memberData),
		updateDoc(roomRef, {
			expireAt: FirestoreTimestamp.fromDate(tomorrow),
		}),
	]);
};

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

export const openCards = async (roomId: string) => {
	const roomRef = doc(db, "rooms", roomId);
	await updateDoc(roomRef, {
		lastOpenedAt: serverTimestamp(),
	});
};
