import { describe, expect, it } from "vitest";
import { ID_LENGTH, generateId, isValidRoomId } from "../room";

describe("room utils", () => {
	describe("generateId", () => {
		it("指定された長さのIDを生成する", () => {
			const id = generateId();
			expect(id).toHaveLength(ID_LENGTH);
		});

		it("生成されたIDが有効なIDとして判定される", () => {
			const id = generateId();
			expect(isValidRoomId(id)).toBe(true);
		});

		it("複数回生成しても一意のIDが生成される", () => {
			const ids = new Set();
			for (let i = 0; i < 1000; i++) {
				ids.add(generateId());
			}
			expect(ids.size).toBe(1000);
		});
	});

	describe("isValidRoomId", () => {
		it("有効なIDを正しく判定する", () => {
			const validIds = [
				"6789BCDFGHJK", // 数字とアルファベットの組み合わせ
				"bcdfghjkmnpq", // 小文字のみ
				"789BCDFGHJKz", // 混合パターン
			];

			for (const id of validIds) {
				expect(isValidRoomId(id)).toBe(true);
			}
		});

		it("無効なIDを正しく判定する", () => {
			const invalidIds = [
				"", // 空文字列
				"abc", // 短すぎる
				"toolongidstring", // 長すぎる
				"invalid-id-123", // 無効な文字を含む
				"aeiou12345678", // 使用不可の文字（母音）を含む
				"!@#$%^&*()", // 特殊文字
				"    12345678", // スペースを含む
			];

			for (const id of invalidIds) {
				expect(isValidRoomId(id)).toBe(false);
			}
		});

		it("nullやundefinedを渡した場合にfalseを返す", () => {
			// @ts-expect-error: 意図的に不正な型の値を渡してテスト
			expect(isValidRoomId(null)).toBe(false);
			// @ts-expect-error: 意図的に不正な型の値を渡してテスト
			expect(isValidRoomId(undefined)).toBe(false);
		});
	});
});
