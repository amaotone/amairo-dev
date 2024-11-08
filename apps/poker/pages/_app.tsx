import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "jotai";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	);
}
