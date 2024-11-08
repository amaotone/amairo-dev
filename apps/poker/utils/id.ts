import { customAlphabet } from "nanoid";

export const ID_ALPHABET = "6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz";
export const ID_LENGTH = 12;
export const ID_PATTERN = new RegExp(`^[${ID_ALPHABET}]{${ID_LENGTH}}$`);

export const generateId = customAlphabet(ID_ALPHABET, ID_LENGTH);

export const isValidId = (id: string): boolean => {
	if (!id) return false;
	if (id.length !== ID_LENGTH) return false;
	return ID_PATTERN.test(id);
};
