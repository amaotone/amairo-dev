import { describe, expect, it } from "vitest";
import { NAMES, createCard, getRandomName, sortCards } from "../cards";

describe("cards utils", () => {
	describe("getRandomName", () => {
		it("should return a name from the NAMES array", () => {
			const name = getRandomName();
			expect(NAMES).toContain(name);
		});
	});

	describe("createCard", () => {
		it("should create a card with correct properties", () => {
			const card = createCard(5);

			expect(card).toMatchObject({
				value: 5,
				isOpen: false,
				isSorted: false,
			});
			expect(card.id).toMatch(/^card-\d+$/);
			expect(NAMES).toContain(card.name);
		});
	});

	describe("sortCards", () => {
		it("should sort numeric cards in ascending order", () => {
			const cards = [createCard(5), createCard(3), createCard(1)];

			const sorted = sortCards(cards);
			expect(sorted.map((c) => c.value)).toEqual([1, 3, 5]);
		});

		it("should place numbers before special cards", () => {
			const cards = [createCard("?"), createCard(3), createCard("☕")];

			const sorted = sortCards(cards);
			expect(sorted.map((c) => c.value)).toEqual([3, "?", "☕"]);
		});

		it("should mark all cards as open and sorted", () => {
			const cards = [createCard(1), createCard(2)];
			const sorted = sortCards(cards);

			for (const card of sorted) {
				expect(card.isOpen).toBe(true);
				expect(card.isSorted).toBe(true);
			}
		});
	});
});
