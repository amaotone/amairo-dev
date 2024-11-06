import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { CardValue } from "../../utils/types";
import { useCards } from "../useCards";

describe("useCards", () => {
	it("should initialize with empty cards", () => {
		const { result } = renderHook(() => useCards());
		expect(result.current.cards).toHaveLength(0);
	});

	it("should add a card", () => {
		const { result } = renderHook(() => useCards());

		result.current.addCard(5 as CardValue);

		expect(result.current.cards).toHaveLength(1);
		expect(result.current.cards[0].value).toBe(5);
		expect(result.current.cards[0].isOpen).toBe(false);
	});

	it("should reset cards", () => {
		const { result } = renderHook(() => useCards());

		result.current.addCard(5 as CardValue);
		result.current.resetCards();

		expect(result.current.cards).toHaveLength(0);
	});
});
