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
  Badge,
  Spacer,
  Tag,
} from "@chakra-ui/react";

import { empresas } from "./empresas";
import {
  FaCross,
  FaInstagram,
  FaPlus,
  FaTimes,
  FaTimesCircle,
  FaWhatsapp,
} from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

export function List() {
  const [filter, setFilter] = useState();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setFilters([]);
    empresas.map((empresa) => {
      setFilters((prevState) => [...prevState, empresa.category]);
    });
    console.log(filters);
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
        <Heading w="full" fontSize={14}>
          Filtrar resultados:
        </Heading>
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
                  <Text pr={2}>{item}</Text> <FaTimes color="#5B3CD8" size={10} />
                </>
              ) : (
                <Text>{item}</Text>
              )}
            </Tag>
          ))}
      </Wrap>
      <Wrap
        spacing={6}
        p="5rem 1rem"
        align="center"
        maxW={1200}
        w="full"
        justify="center"
        //flexDir="column"
      >
        {empresas
          .filter((empresa) => (filter ? empresa.category === filter : true))
          .map((empresa) => (
            <Card key={empresa.id} empresa={empresa} />
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
        <Button variant="unstyled" leftIcon={<FaWhatsapp />} size="sm">
          {whatsapp}
        </Button>
        <Button variant="unstyled" leftIcon={<FaInstagram />} size="sm">
          {instagram}
        </Button>
      </Wrap>
    </VStack>
  );
};
