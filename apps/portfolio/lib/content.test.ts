import { describe, expect, test } from "bun:test";
import * as content from "./content";

const allText = JSON.stringify(content);

describe("portfolio content", () => {
	test("offers engineering work and AI advisory side by side", () => {
		expect(content.services.map((s) => s.id)).toEqual([
			"engineering",
			"advisory",
		]);
		for (const s of content.services) expect(s.items.length).toBe(3);
	});

	test("takes requests only through X DM", () => {
		expect(content.dm.href).toBe("https://x.com/SakuEji");
		expect(allText).not.toMatch(/mailto:|@gmail|forms\.gle/);
	});

	test("does not publish prices", () => {
		expect(allText).not.toMatch(/[0-9,]+\s*円|¥\s*[0-9]/);
	});

	test("does not mention private AI projects", () => {
		expect(allText).not.toMatch(/Orca|manga-reader|app-ranking/i);
	});

	test("uses absolute URLs for social cards", () => {
		expect(content.site.url).toMatch(/^https:\/\//);
		expect(content.site.ogImage).toMatch(/^https:\/\/.+\.png$/);
	});
});
