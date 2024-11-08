import { customAlphabet } from "nanoid";

export const ID_ALPHABET = "6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz";
export const ID_LENGTH = 12;

export const generateId = customAlphabet(ID_ALPHABET, ID_LENGTH);
export const ROOM_ID_PATTERN = new RegExp(`^[${ID_ALPHABET}]{${ID_LENGTH}}$`);

export const isValidRoomId = (id: string): boolean => {
	if (!id) return false;
	if (id.length !== ID_LENGTH) return false;
	return ROOM_ID_PATTERN.test(id);
};
