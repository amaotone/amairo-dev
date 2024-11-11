import {
	type FirestoreDataConverter,
	type QueryDocumentSnapshot,
	type SnapshotOptions,
	type Timestamp,
	collection,
	doc,
	getDoc,
	getDocs,
	serverTimestamp,
	setDoc,
	updateDoc,
	writeBatch,
} from "firebase/firestore";
import type { CardValue } from "../types";
import { db } from "../utils/firebase-config";

export interface Member {
	id: string;
	name: string;
	selectedCard: CardValue | null;
}

export interface Room {
	id: string;
	createdAt: Timestamp;
	expireAt: Timestamp;
	isOpen: boolean;
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
		return {
			...data,
			selectedCard: data.selectedCard?.toString() || null,
		};
	},
	fromFirestore: (snapshot) => {
		const data = snapshot.data();
		return {
			id: snapshot.id,
			name: data.name,
			selectedCard: data.selectedCard as CardValue,
		};
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
		isOpen: true,
	});
};

export const resetCards = async (roomId: string) => {
	const roomRef = doc(db, "rooms", roomId);
	await updateDoc(roomRef, {
		isOpen: false,
	});

	// メンバーのカードをリセット
	const membersRef = collection(db, "rooms", roomId, "members");
	const membersSnapshot = await getDocs(membersRef);

	const batch = writeBatch(db);
	for (const doc of membersSnapshot.docs) {
		batch.update(doc.ref, { selectedCard: null });
	}

	await batch.commit();
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

export const updateMember = async (
	roomId: string,
	userId: string,
	member: Member,
) => {
	const memberRef = doc(db, "rooms", roomId, "members", userId);
	await setDoc(memberRef, member);
};
