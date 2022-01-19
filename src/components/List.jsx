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
} from "@chakra-ui/react";

import { empresas } from "./empresas";
import { FaInfinity, FaInstagram, FaTimes, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { firestore } from "../lib/firebase";

export function List() {
  const [filter, setFilter] = useState();
  const [filters, setFilters] = useState([]);
  const [companies, setCompanies] = useState([]);

  async function getCompanies() {
    const ref = await firestore
      .collection("clientes")
      .doc("cidade")
      .collection("empresas")
      .orderBy("createdAt", "desc")
      .get();

    const data = await ref.docs.map((doc) => doc.data());
    setFilters([]);
    setCompanies(data);
  }

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <Flex
      flexDir="column"
      as="section"
      justify="center"
      align="center"
      w="100%"
    >
      <Wrap px={2} pt={"5rem"} maxW={700} align="center" w="full">
        <Button
          onClick={() => {
            setFilters([]);
            companies.map((empresa) => {
              setFilters((prevState) => [...prevState, empresa.category]);
              console.log(empresa);
            });
          }}
          w="full"
          fontSize={14}
        >
          Filtrar resultados:
        </Button>

        {filters &&
          filters.map((item, i) => (
            <Tag
              _hover={{ cursor: "pointer" }}
              border={filter === item ? "1px solid #5B3CD8" : "none"}
              onClick={() => {
                filter === item ? setFilter() : setFilter(item);
              }}
              key={i}
            >
              {filter === item ? (
                <>
                  <Text pr={2}>{item}</Text>{" "}
                  <FaTimes color="#5B3CD8" size={10} />
                </>
              ) : (
                <Text>{item}</Text>
              )}
            </Tag>
          ))}
      </Wrap>
      <Center pt={4} w="full">
        <Button onClick={getCompanies} fontSize={14}>
          Atualizar
        </Button>
      </Center>
      <Wrap
        spacing={6}
        p="1rem"
        align="center"
        maxW={1200}
        w="full"
        justify="center"
        //flexDir="column"
      >
        {companies
          .filter((empresa) => (filter ? empresa.category === filter : true))
          .map((empresa, i) => (
            <Card key={i} empresa={empresa} />
          ))}
      </Wrap>
    </Flex>
  );
}

export const Card = function (props) {
  const { name, category, whatsapp, address, instagram } = props.empresa;
  return (
    <VStack
      p={6}
      pb={2}
      borderBottom="1px"
      borderColor="roxog2"
      w={350}
      minH={200}
      bg="blackAlpha.100"
      borderTopRadius={10}
    >
      <Heading fontSize={16}>{name}</Heading>
      <Badge color="white" bg="roxo">
        {category}
      </Badge>
      <Text pt={4} fontSize="0.9rem" noOfLines={2}>
        {address}
      </Text>
      <Spacer />
      <Wrap w="full" justify="space-between">
        <Button
          as="a"
          href={`https://api.whatsapp.com/send?phone=55${whatsapp}`}
          variant="unstyled"
          leftIcon={<FaWhatsapp />}
          size="sm"
        >
          {whatsapp}
        </Button>
        <Button
          as="a"
          href={`https://instagram.com/${instagram}`}
          variant="unstyled"
          leftIcon={<FaInstagram />}
          size="sm"
        >
          {instagram}
        </Button>
      </Wrap>
    </VStack>
  );
};
