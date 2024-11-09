import type {} from "@firebase/rules-unit-testing";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { describe, expect, it } from "vitest";
import { db } from "../firebase-config";
import { createRoom } from "../room";

const roomId = "test-room";

describe("room.ts", () => {
	describe("createRoom", () => {
		it("部屋を作成できること", async () => {
			await createRoom(roomId);
			const roomRef = doc(db, "rooms", roomId);
			const roomDoc = await getDoc(roomRef);
			expect(roomDoc.exists()).toBe(true);
			expect(roomDoc.data()?.createdAt).toBeInstanceOf(Timestamp);
		});
	});
});
