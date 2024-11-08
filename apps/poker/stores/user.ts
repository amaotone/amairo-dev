import { atomWithStorage } from "jotai/utils";
import { nanoid } from "nanoid";

export const userIdAtom = atomWithStorage<string>(
	"userId",
	nanoid(),
	undefined,
	{ getOnInit: true },
);
