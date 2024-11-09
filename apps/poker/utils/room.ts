import {
	type Timestamp,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";

export interface Member {
	id: string;
	name: string;
	selectedCard: string | null;
}

export interface MemberDoc {
	name: string;
	selectedCard: string | null;
}

export interface Room {
	id: string;
	createdAt: Timestamp;
	expireAt: Timestamp;
	isVoting: boolean;
	members?: Record<string, Member>;
}

export const createRoom = async (roomId: string): Promise<string> => {
	const roomRef = doc(db, "rooms", roomId);
	await setDoc(roomRef, {
		createdAt: serverTimestamp(),
	});
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
	member: Omit<MemberDoc, "id">,
) => {
	const memberRef = doc(db, "rooms", roomId, "members", userId);
	await setDoc(memberRef, member);
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
