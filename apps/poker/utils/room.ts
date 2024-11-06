import { customAlphabet } from "nanoid";

// 使用する文字セットを定義（nanoidのデフォルトに合わせる）
const NANOID_ALPHABET =
	"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
const ROOM_ID_LENGTH = 12;

// nanoidの設定
export const generateRoomId = customAlphabet(NANOID_ALPHABET, ROOM_ID_LENGTH);

// バリデーション用の正規表現
export const ROOM_ID_PATTERN = /^[A-Za-z0-9_-]{12}$/;

export const isValidRoomId = (id: string): boolean => {
	return ROOM_ID_PATTERN.test(id);
};
