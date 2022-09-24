import React, { useEffect } from 'react'

import { ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  Link,
  ListItem,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export const DrawerComp = () => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => onClose, [router])
  return (
    <>
      <IconButton
        aria-label='open drawer'
        colorScheme='teal'
        onClick={onOpen}
        icon={<HamburgerIcon />}
        sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
      />
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>SHOWROOM</DrawerHeader>
          <DrawerBody>
            <UnorderedList spacing='.5rem'>
              <ListItem>
                <NextLink href='/' passHref>
                  <Link>Top</Link>
                </NextLink>
              </ListItem>
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
          </DrawerBody>
          <DrawerFooter sx={{ justifyContent: 'center' }}>
            <Link href='https://github.com/newt239/showroom_nextjs' isExternal>
              newt239/showroom_nextjs
              <ExternalLinkIcon mx={2} />
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
