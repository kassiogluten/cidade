import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  useColorMode,
  VStack,
} from "@chakra-ui/react";

import {
  FaBusinessTime,
  FaMoon,
  FaPlus,
  FaSun,
  FaThList,
} from "react-icons/fa";
import React, { useState } from "react";
import { LogoSvg } from "../icons";
import Link from "next/link";
import { ModalNewCompany } from "./ModalNewCompany";
import { useMyContext } from "../contexts/Context";

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { modalNewCompany, setModalNewCompany, setSelectedId } = useMyContext();
  return (
    <Flex
      justify="center"
      align="center"
      w="100%"
      bg="#00000011"
      as="header"
      borderBottom="1px"
      borderBottomColor="roxog2"
    >
      <Flex
        p="1rem"
        w="full"
        align="center"
        maxW={1200}
        justify="space-between"
      >
        <LogoSvg />
        <HStack display={{ base: "none", sm: "flex" }} spacing={2}>
          <Menu setModalNewCompany={setModalNewCompany} />
        </HStack>
        <IconButton
          aria-label="Abrir menu de navegação"
          onClick={onOpen}
          display={{ base: "flex", sm: "none" }}
        >
          <FaThList />
        </IconButton>
      </Flex>
      <Drawer
        autoFocus={false}
        returnFocusOnClose={false}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton m={3} />
          <DrawerBody onClick={onClose}>
            <VStack spacing={10}>
              <Menu setModalNewCompany={setModalNewCompany} />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <ModalNewCompany />
    </Flex>
  );
}

function Menu({ setModalNewCompany }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const {setSelectedCompany} = useMyContext()

  return (
    <>
      <Button variant="ghost" onClick={toggleColorMode}>
        {colorMode === "light" ? <FaMoon /> : <FaSun />}
      </Button>
      <Link passHref href="/">
        <Button variant="ghost" as="a">
          Empresas
        </Button>
      </Link>
      <Link passHref href="/contato">
        <Button variant="ghost" as="a">
          Contato
        </Button>
      </Link>
      <Button
        onClick={() => {
          setSelectedCompany(null)
          setModalNewCompany(true);
        }}
        leftIcon={<FaPlus />}
        color="white"
        bg="roxo"
        as="a"
        href="#"
      >
        Adicionar empresa
      </Button>
    </>
  );
}
