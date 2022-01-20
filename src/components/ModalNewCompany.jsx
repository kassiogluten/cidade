/* eslint-disable react/no-children-prop */
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Textarea,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useMyContext } from "../contexts/Context";

import { firestore } from "../lib/firebase";

export const ModalNewCompany = function () {
  const { modalNewCompany, setModalNewCompany } = useMyContext();
  return (
    <Modal
      size="2xl"
      isOpen={modalNewCompany}
      onClose={() => setModalNewCompany(false)}
    >
      <ModalOverlay backdropFilter="blur(3px)" />
      <ModalContent mx={2}>
        <ModalCloseButton color="white" top={-10} left="50%" />
        <ModalBody>
          <FormNewCompany setModalNewCompany={setModalNewCompany} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const FormNewCompany = function ({ setModalNewCompany }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const { getCompanies, selectedCompany } = useMyContext();

  const toast = useToast();

  useEffect(() => {
    if (selectedCompany) {
      setName(selectedCompany.name);
      setCategory(selectedCompany.category);
      setWhatsapp(selectedCompany.whatsapp);
      setInstagram(selectedCompany.instagram);
      setAddress(selectedCompany.address);
    }
  }, []);

  async function handleAddCompany() {
    setLoading(true);
    try {
      console.log("criando ou alterando empresa");
      const ref = firestore
        .collection("clientes")
        .doc("cidade")
        .collection("empresas")
        .doc(selectedCompany ? selectedCompany.id : undefined);

      const data = {
        name,
        category,
        whatsapp,
        instagram,
        address,
        createdAt: selectedCompany
          ? selectedCompany.createdAt
          : new Date().toLocaleString("pt-BR", {
              timeZone: "America/Sao_Paulo",
            }),
        updatedAt: selectedCompany
          ? new Date().toLocaleString("pt-BR", {
              timeZone: "America/Sao_Paulo",
            })
          : "recente",
      };

      await ref.set(data);
      setLoading(false);
      toast({
        title: `Empresa ${selectedCompany ? "alterada" : "adicionada"}.`,
        description: "Cadastro realizado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setModalNewCompany(false);
      getCompanies();
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast({
        title: "Erro.",
        description: "Não foi possível realizar essa ação.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <Wrap spacing={2} my={4}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome da empresa"
      />
      <Input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Categoria ou Segmento"
      />
      <Stack
        spacing={2}
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        w="full"
      >
        <Input
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          w="100%"
          placeholder="Whatsapp ou telefone"
        />
        <InputGroup w="100%">
          <InputLeftAddon children={"instagram.com/"} />
          <Input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="Instagram"
          />
        </InputGroup>
      </Stack>
      <Textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Endereço"
      />
      <Button
        onClick={handleAddCompany}
        w="full"
        color="white"
        colorScheme="blackAlpha"
        bg="roxo"
        isLoading={loading}
        disabled={!name || !category}
      >
        {selectedCompany ? "Atualizar" : "Adicionar"}
      </Button>
    </Wrap>
  );
};
