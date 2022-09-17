import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const theme = extendTheme({
  fonts: {
    heading: "'Klee One', sans-serif",
    body: "'Klee One', sans-serif",
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
        color: "teal.700",
        letterSpacing: 1.2,
      },
    },
    Text: {
      baseStyle: {
        zIndex: 1,
        color: "teal.700",
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
