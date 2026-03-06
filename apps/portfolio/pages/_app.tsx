import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

const theme = extendTheme({
	fonts: {
		heading: "'LINE Seed JP', sans-serif",
		body: "'LINE Seed JP', sans-serif",
	},
	components: {
		Component: {
			zIndex: 1,
		},
		Heading: {
			baseStyle: {
				zIndex: 1,
				color: "gray.700",
				fontWeight: 700,
				letterSpacing: "-0.02em",
				lineHeight: 1.15,
				textWrap: "balance",
			},
		},
		Text: {
			baseStyle: {
				zIndex: 1,
				color: "gray.700",
				fontWeight: 400,
				letterSpacing: "normal",
				lineHeight: 1.75,
			},
		},
		Tag: {
			baseStyle: {
				fontWeight: 700,
				letterSpacing: "normal",
			},
		},
		Th: {
			baseStyle: {
				fontWeight: 700,
				fontSize: "sm",
				letterSpacing: "normal",
				textTransform: "none",
			},
		},
		Td: {
			baseStyle: {
				fontSize: "sm",
			},
		},
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<DefaultSeo
				defaultTitle="amairo.dev"
				description="Amane Suzuki's personal website"
				openGraph={{
					type: "website",
					title: "amairo.dev",
					description: "Amane Suzuki's personal website",
					site_name: "amairo.dev",
					url: "amairo.dev",
					images: [
						{
							url: "/og.jpg",
							width: 1200,
							height: 630,
							alt: "amairo.dev",
							type: "image/jpg",
						},
					],
				}}
				twitter={{
					handle: "@SakuEji",
					site: "@SakuEji",
					cardType: "summary_large_image",
				}}
			/>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
