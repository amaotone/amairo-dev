import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

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
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
