import React from "react";
import Nav from "../components/nav.js";
import Head from "../components/head.js";
import Obfuscate from "../components/obfuscate.js";
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
