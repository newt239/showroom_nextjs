import React, { useEffect } from "react";

import { ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
  ListItem,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import routes from "src/libs/routes";
export const DrawerComp = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => onClose, [router]);
  return (
    <>
      <IconButton
        aria-label="open drawer"
        colorScheme="teal"
        onClick={onOpen}
        icon={<HamburgerIcon />}
        sx={{ position: "fixed", top: "1rem", right: "1rem" }}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>SHOWROOM</DrawerHeader>
          <DrawerBody>
            <UnorderedList spacing=".5rem">
              {routes.map((route) => (
                <ListItem key={route.path}>
                  <NextLink href={route.path} passHref>
                    <Link>{route.name}</Link>
                  </NextLink>
                </ListItem>
              ))}
            </UnorderedList>
          </DrawerBody>
          <DrawerFooter sx={{ justifyContent: "center" }}>
            <Link href="https://github.com/newt239/showroom_nextjs" isExternal>
              newt239/showroom_nextjs
              <ExternalLinkIcon mx={2} />
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
