import Head from "next/head";
import { Contact } from "../components/Contact";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Contato | Cidade.App</title>
        <meta property="og:title" content="Contato | Cidade.App" />
        <meta name="description" content="Entre em contato com a equipe Cidade.App" />
        <meta property="og:description" content="Entre em contato com a equipe Cidade.App" />
        <meta property="og:image" content="/favicon.png" key="ogimage" />
      </Head>
      <Header />
      <Contact />
    </>
  );
}
