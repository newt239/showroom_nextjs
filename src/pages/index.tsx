import type { NextPage } from 'next'
import Head from 'next/head'

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
        <UnorderedList>
          <ListItem><Link href="/tetris">Tetris</Link></ListItem>
          <ListItem><Link href="/no_vowels">No Vowels</Link></ListItem>
        </UnorderedList>
      </Container>
    </>
  )
}

export default Home
