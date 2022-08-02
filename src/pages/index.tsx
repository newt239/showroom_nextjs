import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from "next/link"

import { Container, Heading, Link, ListItem, UnorderedList } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SHOWROOM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sx={{ py: "3rem" }}>
        <Heading as="h2" sx={{ textAlign: "center" }}>SHOWROOM</Heading>
        <UnorderedList spacing=".5rem" sx={{ my: "1rem" }}>
          <ListItem>
            <NextLink href='/tetris' passHref>
              <Link>Tetris</Link>
            </NextLink>
          </ListItem>
          <ListItem>
            <NextLink href='/no_vowels' passHref>
              <Link>No Vowels</Link>
            </NextLink>
          </ListItem>
        </UnorderedList>
      </Container>
    </>
  )
}

export default Home
