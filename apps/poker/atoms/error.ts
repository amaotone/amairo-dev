import { atom } from "jotai";

export type ErrorType = {
	message: string;
	code: "INVALID_ROOM_ID" | "OTHER";
};

export const errorAtom = atom<ErrorType | null>(null);
