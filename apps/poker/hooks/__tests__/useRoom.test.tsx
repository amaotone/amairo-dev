import { renderHook, waitFor } from "@testing-library/react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { describe, expect, it } from "vitest";
import { db } from "../../utils/firebase-config";
import { createRoom } from "../../utils/room";
import { useRoom } from "../useRoom";

const roomId = "test-room";
const userId = "test-user";

describe("useRoom", () => {
	it("部屋が存在しない場合、新しい部屋を作成すること", async () => {
		const { result } = renderHook(() => useRoom(roomId, userId));

		// 部屋が作成されるまで待機
		await waitFor(async () => {
			const roomDoc = await getDoc(doc(db, "rooms", roomId));
			expect(roomDoc.exists()).toBe(true);
		});

		// 作成された部屋の情報を確認
		const roomDoc = await getDoc(doc(db, "rooms", roomId));
		expect(roomDoc.data()?.createdAt).toBeInstanceOf(Timestamp);
		expect(result.current.room?.id).toBe(roomId);
		expect(result.current.loading).toBe(false);
	});

	it("部屋が既に存在する場合、既存の部屋を取得すること", async () => {
		// テスト用の部屋を事前に作成
		await createRoom(roomId);

		const { result } = renderHook(() => useRoom(roomId, userId));

		// 部屋のデータが取得されるまで待機
		await waitFor(() => {
			expect(result.current.room).not.toBeNull();
		});

		expect(result.current.room?.id).toBe(roomId);
		expect(result.current.loading).toBe(false);
	});

	it("メンバー情報を正しく取得できること", async () => {
		// テスト用の部屋を作成
		await createRoom(roomId);

		// テスト用のメンバーデータを作成
		const memberData = {
			name: "Test User",
			selectedCard: null,
		};
		const memberRef = doc(db, "rooms", roomId, "members", userId);
		await setDoc(memberRef, memberData);

		const { result } = renderHook(() => useRoom(roomId, userId));

		// メンバー情報が取得されるまで待機
		await waitFor(() => {
			expect(result.current.currentMember).not.toBeNull();
		});

		expect(result.current.currentMember?.name).toBe(memberData.name);
		expect(result.current.currentMember?.selectedCard).toBe(
			memberData.selectedCard,
		);
	});

	it("userIdがnullの場合、メンバー情報を取得しないこと", async () => {
		// テスト用の部屋を作成
		await createRoom(roomId);

		const { result } = renderHook(() => useRoom(roomId, null));

		// 部屋のデータが取得されるまで待機
		await waitFor(() => {
			expect(result.current.room).not.toBeNull();
		});

		expect(result.current.currentMember).toBeNull();
	});
});
