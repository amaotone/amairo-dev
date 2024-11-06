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
      500: "#0086CC",
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
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
