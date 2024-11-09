import { renderHook, waitFor } from "@testing-library/react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { describe, expect, it } from "vitest";
import { db } from "../../utils/firebase-config";
import { type MemberDoc, createRoom } from "../../utils/room";
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
		await createRoom(roomId);

		const memberData: MemberDoc = {
			name: "Test User",
			selectedCard: null,
		};
		const memberRef = doc(db, "rooms", roomId, "members", userId);
		await setDoc(memberRef, memberData);

		const { result } = renderHook(() => useRoom(roomId, userId));

		await waitFor(() => {
			expect(result.current.currentMember).not.toBeNull();
		});

		expect(result.current.currentMember).toEqual({
			id: userId,
			...memberData,
		});
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

	it("部屋の全メンバーを取得できること", async () => {
		await createRoom(roomId);

		const membersData = [
			{
				id: "user1",
				name: "User 1",
				selectedCard: null,
			},
			{
				id: "user2",
				name: "User 2",
				selectedCard: "5",
			},
			{
				id: "user3",
				name: "User 3",
				selectedCard: "8",
			},
		];

		for (const member of membersData) {
			const { id, ...memberDoc } = member;
			await setDoc(doc(db, "rooms", roomId, "members", id), memberDoc);
		}

		const { result } = renderHook(() => useRoom(roomId, userId));

		await waitFor(() => {
			expect(result.current.members?.length).toBe(3);
		});

		expect(result.current.members).toEqual(
			expect.arrayContaining(
				membersData.map((member) =>
					expect.objectContaining({
						id: member.id,
						name: member.name,
						selectedCard: member.selectedCard,
					}),
				),
			),
		);
	});

	it("メンバーが追加されたときにリアルタイムで更新されること", async () => {
		// テスト用の部屋を作成
		await createRoom(roomId);

		const { result } = renderHook(() => useRoom(roomId, userId));

		// 初期状態を確認
		await waitFor(() => {
			expect(result.current.members?.length).toBe(0);
		});

		// 新しいメンバーを追加
		const newMember = {
			name: "New User",
			selectedCard: null,
		};
		await setDoc(doc(db, "rooms", roomId, "members", "new-user"), newMember);

		// メンバーリストが更新されるのを待機
		await waitFor(() => {
			expect(result.current.members?.length).toBe(1);
		});

		expect(result.current.members?.[0]).toEqual(
			expect.objectContaining({
				name: "New User",
				selectedCard: null,
			}),
		);
	});

	it("カードを選択できること", async () => {
		// テスト用の部屋を作成
		await createRoom(roomId);

		// メンバーを追加
		const memberData: MemberDoc = {
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

		// カードを選択
		await result.current.selectCard(5);

		// カード選択が反映されるまで待機
		await waitFor(() => {
			expect(result.current.currentMember?.selectedCard).toBe(5);
		});
	});
});
