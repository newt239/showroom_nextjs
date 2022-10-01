import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, ChakraProvider, Container, Link } from "@chakra-ui/react";
import ReactGA from "react-ga4";

import type { AppProps } from "next/app";

import { DrawerComp } from "src/components/Drawer";

function MyApp({ Component, pageProps }: AppProps) {
  ReactGA.initialize("G-67RKL0JJXB");
  ReactGA.send("pageview");
  return (
    <ChakraProvider>
      <>
        <Box sx={{ minHeight: "85vh" }}>
          <Component {...pageProps} />
        </Box>
        <Container sx={{ textAlign: "center", my: "1rem" }}>
          <Link href="https://github.com/newt239/showroom_nextjs" isExternal>
            newt239/showroom_nextjs
            <ExternalLinkIcon mx={2} />
          </Link>
        </Container>
        <DrawerComp />
      </>
    </ChakraProvider>
  );
}

export default MyApp;
