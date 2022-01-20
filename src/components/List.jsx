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

export function List() {
  const [filter, setFilter] = useState();
  const { getCompanies, filters, setFilters, companies } = useMyContext();

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
      <Wrap px={2} pt={"5rem"} maxW={730} align="center" w="full">
        <Button
          onClick={() => {
            setFilters([]);
            companies.map((empresa) => {
              setFilters((prevState) => [...prevState, empresa.category]);
            });
          }}
          w="full"
          fontSize={14}
        >
          Filtrar empresas:
        </Button>

        {filters &&
          filters
            .filter((val, id, array) => array.indexOf(val) == id)
            .map((item, i) => (
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
                    <Text pr={2}>{item}</Text>
                    <FaTimes color="#5B3CD8" size={10} />
                  </>
                ) : (
                  <Text>{item}</Text>
                )}
              </Tag>
            ))}
      </Wrap>
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
          .map((empresa) => (
            <Card key={empresa.id} empresa={empresa} />
          ))}
      </Wrap>
    </Flex>
  );
}

export const Card = function (props) {
  const { handleDeleteCompany, setModalNewCompany, setSelectedCompany } = useMyContext();
  const { name, category, whatsapp, address, instagram, secure, id } =
    props.empresa;

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
      {!secure && (
        <IconButton
          onClick={() => {
            if (confirm("Deseja excluir a empresa ?")) {
              handleDeleteCompany(props.empresa);
            }
          }}
          pos="absolute"
          top={0}
          right={0}
          variant="ghost"
          size="xs"
          color="red.500"
          icon={<FaTrash />}
        />
      )}
      {!secure && (
        <IconButton
          onClick={() => {
            setSelectedCompany(props.empresa)
            setModalNewCompany(true);
          }}
          pos="absolute"
          top={0}
          right={7}
          variant="ghost"
          size="xs"
          icon={<FaEdit /> }
        />
      )}
    </VStack>
  );
};
