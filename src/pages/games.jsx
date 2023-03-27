import React from "react";
import Nav from "../components/nav.jsx";
import Head from "../components/head.jsx";
import Obfuscate from "../components/obfuscate.jsx";
import { useTranslation } from 'react-i18next';

function Games() {
  const { t } = useTranslation("games");

  return (
    <>
      <Head defaultTitle="games"></Head>
      <Nav />
      <h1 className="title">
        <Obfuscate>{t("comingSoon")}</Obfuscate>
      </h1>
    </>
  );
}

export default Games;
