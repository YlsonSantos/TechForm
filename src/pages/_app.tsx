import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "../styles/theme";

// O Zustand é agnóstico de framework,
// mas para evitar problemas de hidratação,
// você pode envolver a aplicação em um contexto.
// No entanto, para o Pages Router, a maioria das
// implementações de Zustand funcionará bem sem ele,
// já que o estado é inicializado no cliente.

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;