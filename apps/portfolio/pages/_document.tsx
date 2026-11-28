import { Head, Html, Main, NextScript } from "next/document";

const FONT_CSS =
	"https://fonts.googleapis.com/css2?family=LINE+Seed+JP:wght@400;700;800&display=swap";

export default function Document() {
	return (
		<Html lang="ja">
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				{/* Loaded as print-only, then switched to all: the page renders with the fallback font instead of waiting on Google Fonts. */}
				<link id="font-css" rel="stylesheet" href={FONT_CSS} media="print" />
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: static inline snippet
					dangerouslySetInnerHTML={{
						__html: `(function(l){if(!l)return;l.onload=function(){l.media="all"};if(l.sheet)l.media="all"})(document.getElementById("font-css"))`,
					}}
				/>
				<noscript>
					<link rel="stylesheet" href={FONT_CSS} />
				</noscript>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
