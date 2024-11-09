import type {} from "@firebase/rules-unit-testing";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { describe, expect, it } from "vitest";
import { db } from "../firebase-config";
import { createRoom, updateMember } from "../room";

const roomId = "test-room";
const userId = "test-user";

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

	describe("updateMember", () => {
		it("メンバーが追加できること", async () => {
			// 部屋を作成
			await createRoom(roomId);

			// メンバーを追加
			const memberData = {
				name: "Test User",
				selectedCard: null,
			};
			await updateMember(roomId, userId, memberData);

			// メンバーのドキュメントを確認
			const memberRef = doc(db, "rooms", roomId, "members", userId);
			const memberDoc = await getDoc(memberRef);
			expect(memberDoc.exists()).toBe(true);
			expect(memberDoc.data()).toEqual(memberData);
		});

		it("既存のメンバーを更新できること", async () => {
			// 部屋を作成
			await createRoom(roomId);

			// 初期のメンバーデータ
			const initialMemberData = {
				name: "Test User",
				selectedCard: null,
			};
			await updateMember(roomId, userId, initialMemberData);

			// メンバーデータを更新
			const updatedMemberData = {
				name: "Updated User",
				selectedCard: "8",
			};
			await updateMember(roomId, userId, updatedMemberData);

			// 更新されたメンバーのドキュメントを確認
			const memberRef = doc(db, "rooms", roomId, "members", userId);
			const memberDoc = await getDoc(memberRef);
			expect(memberDoc.exists()).toBe(true);
			expect(memberDoc.data()).toEqual(updatedMemberData);
		});
	});
});
