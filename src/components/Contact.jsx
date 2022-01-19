import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  VStack,
  HStack,
  Center,
  Button,
  Wrap,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export function Contact() {
  return (
    <Flex as="section" justify="center" align="center" w="100%">
      <Flex
        p="5rem 1rem"
        align="center"
        maxW={1200}
        w="full"
        justify="space-between"
        flexDir={{ base: "column", sm: "row" }}
        //flexDir="column"
      >
        {/*  */}
        <Center w="full">
          <Button
            leftIcon={<FaWhatsapp />}
            colorScheme="whatsapp"
            as="a"
            target="_blank"
            href="https://api.whatsapp.com/send?phone=5533920001670"
          >
            Whatsapp
          </Button>
        </Center>
      </Flex>
    </Flex>
  );
}
