import type { CardType, CardValue } from "../types";

export const NAMES = [
	"Alice",
	"Bob",
	"Charlie",
	"Dave",
	"Eve",
	"Frank",
	"Grace",
	"Henry",
	"Ivy",
	"Jack",
	"Kelly",
	"Liam",
	"Mia",
	"Noah",
	"Olivia",
	"Peter",
	"Quinn",
	"Ruby",
	"Sam",
	"Tara",
	"Uma",
	"Victor",
	"Wendy",
	"Xander",
	"Yuki",
	"Zoe",
	"Christopher Alexander",
	"Elizabeth Windsor",
	"Benjamin Franklin",
	"Alexandria Ocasio",
] as const;

export const getRandomName = (): string => {
	const randomIndex = Math.floor(Math.random() * NAMES.length);
	return NAMES[randomIndex];
};

export const createCard = (value: CardValue): CardType => ({
	id: `card-${Date.now()}`,
	value,
	isOpen: false,
	name: getRandomName(),
	isSorted: false,
});

export const sortCards = (cards: CardType[]): CardType[] => {
	return [...cards]
		.sort((a, b) => {
			if (typeof a.value === "number" && typeof b.value === "number") {
				return a.value - b.value;
			}
			if (typeof a.value === "number") return -1;
			if (typeof b.value === "number") return 1;
			if (a.value === "☕") return 1;
			if (b.value === "☕") return -1;
			if (a.value === "?") return -1;
			if (b.value === "?") return 1;
			return 0;
		})
		.map((card) => ({
			...card,
			isOpen: true,
			isSorted: true,
		}));
};
