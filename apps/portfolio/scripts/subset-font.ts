// Fetches Zen Kaku Gothic New from Google Fonts, cut down to the characters
// the page uses, and saves it under public/fonts. Re-run after editing
// lib/content.ts:  bun run font:subset
import { mkdir, writeFile } from "node:fs/promises";
import * as content from "../lib/content";
import { glyphsOf } from "../lib/glyphs";

const FAMILY = "Zen+Kaku+Gothic+New";
const WEIGHTS = [400, 700] as const;
// Characters a later edit is likely to need even if the copy does not use them yet.
const SPARE =
	" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~" +
	"、。・「」『』（）【】：；！？〜ー…年月日時間週現在";

const text = glyphsOf(JSON.stringify(content) + SPARE);
const ua =
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

await mkdir(new URL("../public/fonts/", import.meta.url), { recursive: true });
for (const w of WEIGHTS) {
	const css = await (
		await fetch(
			`https://fonts.googleapis.com/css2?family=${FAMILY}:wght@${w}&text=${encodeURIComponent(text)}`,
			{ headers: { "user-agent": ua } },
		)
	).text();
	const url = css.match(/url\((https:[^)]+)\)/)?.[1];
	if (!url) throw new Error(`no font url for weight ${w}:\n${css}`);
	const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
	await writeFile(
		new URL(`../public/fonts/zen-kaku-${w}.woff2`, import.meta.url),
		buf,
	);
	console.log(`zen-kaku-${w}.woff2  ${buf.length} bytes`);
}
await writeFile(new URL("../lib/font-glyphs.txt", import.meta.url), text);
console.log(`${[...text].length} glyphs`);
