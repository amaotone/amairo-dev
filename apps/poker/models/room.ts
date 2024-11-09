import {
	type FirestoreDataConverter,
	type QueryDocumentSnapshot,
	type SnapshotOptions,
	type Timestamp,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase-config";

export interface Member {
	id: string;
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

export const roomConverter: FirestoreDataConverter<Room> = {
	toFirestore: (room: Room) => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		const { id, ...data } = room;
		return {
			...data,
			expireAt: tomorrow,
		};
	},
	fromFirestore: (
		snapshot: QueryDocumentSnapshot,
		options?: SnapshotOptions,
	) => {
		const data = snapshot.data(options);
		return {
			id: snapshot.id,
			...data,
		} as Room;
	},
};

export const memberConverter: FirestoreDataConverter<Member> = {
	toFirestore: (member: Member) => {
		const { id, ...data } = member;
		return data;
	},
	fromFirestore: (snapshot) => {
		const data = snapshot.data();
		return {
			id: snapshot.id,
			...data,
		} as Member;
	},
};

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

export const addMember = async (roomId: string, member: Member) => {
	const memberRef = doc(db, "rooms", roomId, "members", member.id);
	const { id, ...memberData } = member;
	await setDoc(memberRef, memberData);
};

export const openCards = async (roomId: string) => {
	const roomRef = doc(db, "rooms", roomId);
	await updateDoc(roomRef, {
		lastOpenedAt: serverTimestamp(),
	});
};

export async function joinRoom(roomId: string, userId: string, name: string) {
	if (!name.trim()) {
		throw new Error("Name is required");
	}

	const memberRef = doc(db, "rooms", roomId, "members", userId);
	await setDoc(memberRef, {
		name: name.trim(),
		selectedCard: null,
	});
}
