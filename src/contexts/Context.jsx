import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import { firestore } from "../lib/firebase";
const Context = createContext();

export function ContextProvider({ children }) {
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalNewCompany, setModalNewCompany] = useState(false);

  const [filters, setFilters] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedCompany, setSelectedCompany] = useState([]);

  async function getCompanies() {
    console.log('consultando empresas')
    const ref = await firestore
      .collection("clientes")
      .doc("cidade")
      .collection("empresas")
      .orderBy("createdAt", "desc")
      .get();

    setCompanies([]);
    ref.docs.map((doc) => {
      var data = doc.data();
      const {
        name,
        category,
        whatsapp,
        instagram,
        address,
        createdAt,
        secure,
      } = data;
      var id = doc.id;
      setCompanies((prevState) => [
        ...prevState,
        { name, id, category, whatsapp, instagram, address, createdAt, secure },
      ]);
    });

    setFilters([]);
  }

  async function handleDeleteCompany(item) {
    try {
      console.log('removendo empresa')
      const ref = firestore
        .collection("clientes")
        .doc("cidade")
        .collection("empresas")
        .doc(item.id);

      const data = {
        name: item.name,
        category: item.category,
        whatsapp: item.whatsapp,
        instagram: item.instagram,
        address: item.address,
        deleted_createdAt: item.createdAt || "sem data",
        deletedAt: new Date().toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        }),
      };


      await ref.set(data);
      toast({
        title: "Empresa removida.",
        description: "Remoção realizada com sucesso.",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      getCompanies();
    } catch (err) {
      console.log(err);
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
    <Context.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        modalNewCompany,
        setModalNewCompany,
        getCompanies,
        filters,
        setFilters,
        companies,
        setCompanies,
        handleDeleteCompany,
        setSelectedId,
        selectedId,
        selectedCompany,
        setSelectedCompany,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useMyContext = () => useContext(Context);
