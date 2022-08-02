import React from "react"
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, Input, Link, ListItem, UnorderedList, useDisclosure } from "@chakra-ui/react"
import { ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons"


export const DrawerComp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton aria-label="open drawer" colorScheme='teal' onClick={onOpen} icon={<HamburgerIcon />}
        sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>SHOWROOM</DrawerHeader>
          <DrawerBody>
            <UnorderedList>
              <ListItem><Link href="/">Top</Link></ListItem>
              <ListItem><Link href="/tetris">Tetris</Link></ListItem>
              <ListItem><Link href="/no_vowels">No Vowels</Link></ListItem>
            </UnorderedList>
          </DrawerBody>
          <DrawerFooter sx={{ justifyContent: "center" }}>
            <Link href="https://github.com/newt239/showroom_nextjs" isExternal>
              newt239/showroom_nextjs<ExternalLinkIcon mx={2} />
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}