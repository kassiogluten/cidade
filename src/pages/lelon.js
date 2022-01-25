import Head from "next/head";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { List } from "../components/List";
import { Lelon as LelonList } from "../components/Lelon";


export default function Lelon() {
  return (
    <>
      <Head>
        <title>Cidade.App</title>
        <meta property="og:title" content="Cidade.App" />
        <meta
          name="description"
          content="Facilidade para encontrar empresas na sua cidade"
        />
        <meta
          property="og:description"
          content="Facilidade para encontrar empresas na sua cidade"
        />
        <meta property="og:image" content="/favicon.png" key="ogimage" />
      </Head>
      <LelonList />
    </>
  );
}
