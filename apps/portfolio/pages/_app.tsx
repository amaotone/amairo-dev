import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";

const theme = extendTheme({
  fonts: {
    heading: "'M PLUS Rounded 1c', sans-serif",
    body: "'M PLUS Rounded 1c', sans-serif",
  },
  components: {
    Heading: {
      baseStyle: {
        color: "gray.700",
        letterSpacing: 1.2,
      },
    },
    Text: {
      baseStyle: {
        color: "gray.700",
        letterSpacing: 1.05,
        lineHeight: 1.5,
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap"
          rel="stylesheet"
        />
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
