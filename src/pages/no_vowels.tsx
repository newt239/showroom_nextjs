import { ChangeEvent, useState } from "react";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SlideFade,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";

import type { NextPage } from "next";

const NoVowels: NextPage = () => {
  const [text, setText] = useState("");
  const [hide, setHide] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <Head>
        <title>No Vowels</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sx={{ py: "3rem" }}>
        <Heading as="h2" sx={{ textAlign: "center" }}>
          No Vowels
        </Heading>
        <SlideFade in={!hide} offsetY="-1rem">
          <InputGroup sx={{ my: "1rem", gap: ".5rem" }}>
            <Input
              placeholder="Type something..."
              value={text}
              onChange={handleChange}
            />
            <InputRightElement>
              <IconButton
                aria-label="reset text"
                onClick={() => setText("")}
                icon={<SmallCloseIcon />}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
        </SlideFade>
        <Box sx={{ width: "100%", textAlign: "center", my: "1rem" }}>
          <Button
            aria-label="hide input area"
            onClick={() => setHide((v) => !v)}
            leftIcon={hide ? <ChevronDownIcon /> : <ChevronUpIcon />}
          >
            {hide ? "Show" : "Hide"}
          </Button>
        </Box>
        <SlideFade in={text !== ""} offsetY="3rem">
          <Box borderWidth={1} borderRadius="lg" sx={{ my: "1rem", p: "1rem" }}>
            <Heading as="h3" size="lg" sx={{ textAlign: "center" }}>
              Result
            </Heading>
            <Text fontSize="xl" sx={{ letterSpacing: ".5rem" }}>
              {Array.from(text)
                .map((s) => {
                  if (
                    ["a", "i", "u", "e", "o", "A", "I", "U", "E", "O"].includes(
                      s
                    )
                  ) {
                    return "_";
                  } else {
                    return s;
                  }
                })
                .join("")}
            </Text>
          </Box>
        </SlideFade>
      </Container>
    </>
  );
};

export default NoVowels;
