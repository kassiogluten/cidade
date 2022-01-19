import {
  Button,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Textarea,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useState } from "react";

import { firestore } from "../lib/firebase";

export const ModalNewCompany = function ({
  setModalNewCompany,
  modalNewCompany,
}) {
  return (
    <Modal isOpen={modalNewCompany} onClose={() => setModalNewCompany(false)}>
      <ModalOverlay backdropFilter="blur(3px)" />
      <ModalContent mx={2}>
        <ModalCloseButton color="white" top={-10} left="50%" />
        <ModalBody>
          <FormNewCompany />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const FormNewCompany = function () {
  async function handleAddCompany() {
    setLoading(true);
    try {
      const ref = firestore
        .collection("clientes")
        .doc("cidade")
        .collection("empresas")
        .doc();

      const data = {
        name,
        category,
        whatsapp,
        instagram,
        address,
        createdAt: new Date().toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        }),
      };

      console.log("ref", ref);
      console.log("data", data);

      await ref.set(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
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
      <Input
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        w="47%"
        placeholder="Whatsapp ou telefone"
      />
      <Input
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
        w="47%"
        placeholder="Instagram"
      />
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
        Adicionar
      </Button>
      
    </Wrap>
  );
};
