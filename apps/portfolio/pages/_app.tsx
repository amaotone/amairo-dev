import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";

const theme = extendTheme({
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
        lineHeight: 1.5,
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
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
