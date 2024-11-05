import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const theme = extendTheme({
	colors: {
		brand: {
			50: "#E5F3FB",
			100: "#CCE7F7",
			200: "#99CFEF",
			300: "#66B7E7",
			400: "#339FDF",
			500: "#0086CC", // メインカラー
			600: "#006BA3",
			700: "#00507A",
			800: "#003552",
			900: "#001A29",
		},
	},
	fonts: {
		heading: "'Quicksand', 'Zen Maru Gothic', sans-serif",
		body: "'Quicksand', 'Zen Maru Gothic', sans-serif",
	},
	styles: {
		global: {
			"@keyframes showCard": {
				to: {
					visibility: "visible",
				},
			},
		},
	},
	canvas: {
		fontFamily: "none",
		margin: 0,
		padding: 0,
		lineHeight: 1,
	},
	components: {
		Component: {
			zIndex: 1,
		},
		Heading: {
			baseStyle: {
				zIndex: 1,
				color: "brand.700",
				letterSpacing: 1.2,
			},
		},
		Text: {
			baseStyle: {
				zIndex: 1,
				color: "brand.700",
				letterSpacing: 1.05,
				lineHeight: 1.5,
			},
		},
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
