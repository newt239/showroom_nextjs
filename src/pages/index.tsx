import {
  Container,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

import type { NextPage } from "next";

import routes from "src/libs/routes";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SHOWROOM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sx={{ py: "3rem" }}>
        <Heading as="h2" sx={{ textAlign: "center" }}>
          SHOWROOM
        </Heading>
        <UnorderedList spacing=".5rem" sx={{ my: "1rem" }}>
          {routes.map((route) => (
            <ListItem key={route.path}>
              <NextLink href={route.path} passHref>
                <Link>{route.name}</Link>
              </NextLink>
            </ListItem>
          ))}
        </UnorderedList>
      </Container>
    </>
  );
};

export default Home;
