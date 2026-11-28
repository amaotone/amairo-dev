import { describe, expect, test } from "bun:test";
import * as content from "./content";

const allText = JSON.stringify(content);

describe("portfolio content", () => {
	test("offers engineering work and AI advisory side by side", () => {
		expect(content.services.map((s) => s.id)).toEqual([
			"engineering",
			"advisory",
		]);
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

	test("reads the career as a timeline from school to now", () => {
		const years = content.timeline.map((t) => t.year);
		expect(years[0]).toContain("修了年");
		expect(years.at(-1)).toBe("現在");
		for (const t of content.timeline) expect(t.event.length).toBeGreaterThan(0);
	});

	test("uses plain headings, not LP-style questions", () => {
		for (const h of Object.values(content.headings))
			expect(h).not.toMatch(/[？?]$/);
	});

	test("keeps every blank the owner still has to fill in", () => {
		for (const q of [
			"経験年数",
			"入社年",
			"在籍期間",
			"修了年",
			"初回相談の時間と有料・無料",
			"週あたりの稼働時間・対応できる時間帯",
			"リモートのみか、訪問も可か",
			"契約形態（準委任など）",
		])
			expect(allText).toContain(`【要確認: ${q}】`);
	});
});

describe("subset web font", () => {
	test("covers every character on the page (run `bun run font:subset` after editing the copy)", async () => {
		const { glyphsOf } = await import("./glyphs");
		const font = await Bun.file(
			new URL("./font-glyphs.txt", import.meta.url),
		).text();
		const missing = [...glyphsOf(allText)].filter((c) => !font.includes(c));
		expect(missing).toEqual([]);
	});
});
