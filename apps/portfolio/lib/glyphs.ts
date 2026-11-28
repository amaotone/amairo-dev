/** Unique characters of `s`, sorted, without whitespace other than the space. */
export const glyphsOf = (s: string): string =>
	Array.from(new Set(Array.from(s).filter((c) => c === " " || !/\s/.test(c))))
		.sort()
		.join("");
