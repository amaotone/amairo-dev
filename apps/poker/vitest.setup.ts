import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { afterAll, beforeEach } from "vitest";

const admin = initializeApp({ projectId: "test" });
const adminDb = getFirestore(admin);

beforeEach(async () => {
	const roomsSnapshot = await adminDb.collection("rooms").get();

	const deleteTasks = roomsSnapshot.docs.map(async (doc) => {
		const membersSnapshot = await doc.ref.collection("members").get();
		const memberDeleteTasks = membersSnapshot.docs.map((memberDoc) =>
			memberDoc.ref.delete(),
		);
		await Promise.all(memberDeleteTasks);

		await doc.ref.delete();
	});

	await Promise.all(deleteTasks);
});

afterAll(async () => {
	const roomsSnapshot = await adminDb.collection("rooms").get();
	const deleteTasks = roomsSnapshot.docs.map(async (doc) => {
		const membersSnapshot = await doc.ref.collection("members").get();
		const memberDeleteTasks = membersSnapshot.docs.map((memberDoc) =>
			memberDoc.ref.delete(),
		);
		await Promise.all(memberDeleteTasks);

		await doc.ref.delete();
	});
	await Promise.all(deleteTasks);
});
