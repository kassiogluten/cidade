import React from "react";
import {
  Flex,
  Heading,
  Text,
  VStack,
  Button,
  Wrap,
  Badge,
  Spacer,
  Tag,
  Center,
  IconButton,
} from "@chakra-ui/react";

import { empresas } from "./empresas";
import {
  FaEdit,
  FaInfinity,
  FaInstagram,
  FaTimes,
  FaTrash,
  FaWhatsapp,
} from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { useMyContext } from "../contexts/Context";

import { lelon } from "../lelon";
console.log(lelon)

export function Lelon() {
  const [filter, setFilter] = useState();
  const { getCompanies, filters, setFilters, companies } = useMyContext();

  return (
    <Flex
      flexDir="column"
      as="section"
      justify="center"
      align="center"
      w="100%"
    >
      <Wrap
        spacing={6}
        p="1rem"
        align="center"
        maxW={1200}
        w="full"
        justify="center"
        //flexDir="column"
      >
        {lelon.map((empresa) => (
          <Card key={empresa.cnpj} empresa={empresa} />
        ))}
      </Wrap>
    </Flex>
  );
}

export const Card = function (props) {
  const {bairro, cep, email, estado, logradouro, nome, numero, ddd1, tel1} = props.empresa
  return (
    <VStack
      pos="relative"
      p={6}
      pb={2}
      borderBottom="1px"
      borderColor="roxog2"
      w={350}
      minH={200}
      bg="blackAlpha.100"
      borderTopRadius={10}
    >
      <Heading fontSize={16}>{nome}</Heading>
      <Badge color="white" bg="roxo">
        {cep}
      </Badge>
      <Text pt={4} fontSize="0.9rem" noOfLines={2}>
        {`${logradouro} ${numero} - ${bairro}`}
      </Text>
      <Spacer />
      <Wrap w="full" justify="space-between">
        <Button
          as="a"
          href={`https://api.whatsapp.com/send?phone=55${ddd1+tel1}`}
          variant="unstyled"
          leftIcon={<FaWhatsapp />}
          size="sm"
        >
          {ddd1 + tel1}
        </Button>
        <Button
          as="a"
          href={`https://instagram.com/${email}`}
          variant="unstyled"
          leftIcon={<FaInstagram />}
          size="sm"
        >
          {email}
        </Button>
      </Wrap>
     
    </VStack>
  );
};
