import { atomWithStorage } from "jotai/utils";
import { generateId } from "../utils/id";

export const userIdAtom = atomWithStorage<string>(
	"userId",
	generateId(),
	undefined,
	{ getOnInit: true },
);
