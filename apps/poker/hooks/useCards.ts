import { useState } from "react";
import type { CardType, CardValue } from "../types";

const NAMES = [
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

const getRandomName = (): string => {
	const randomIndex = Math.floor(Math.random() * NAMES.length);
	return NAMES[randomIndex];
};

export const useCards = () => {
	const [cards, setCards] = useState<CardType[]>([]);

	const addCard = (selectedValue: CardValue) => {
		const newCard: CardType = {
			id: `card-${Date.now()}`,
			value: selectedValue,
			isOpen: false,
			name: getRandomName(),
			isSorted: false,
		};
		setCards((prev) => [...prev, newCard]);
	};

	const openAllCards = () => {
		let delay = 0;
		cards.forEach((card, index) => {
			setTimeout(() => {
				setCards((prev) =>
					prev.map((c) => (c.id === card.id ? { ...c, isOpen: true } : c)),
				);
				// 最後のカードが開いた後にソートを実行
				if (index === cards.length - 1) {
					setTimeout(() => {
						const sortedCards = [...cards]
							.sort((a, b) => {
								if (
									typeof a.value === "number" &&
									typeof b.value === "number"
								) {
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
						setCards(sortedCards);
					}, 500);
				}
			}, delay);
			delay += 50;
		});
	};

	const resetCards = () => {
		setCards([]);
	};

	return {
		cards,
		addCard,
		openAllCards,
		resetCards,
	};
};
