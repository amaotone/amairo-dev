import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="ja">
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="preload"
					href="/fonts/zen-kaku-400.woff2"
					as="font"
					type="font/woff2"
					crossOrigin=""
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
