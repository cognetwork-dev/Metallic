import React from "react";
import Nav from "../components/nav.js";
import Head from "../components/head.js";
import Obfuscate from "../components/obfuscate.js";
import { useTranslation } from 'react-i18next';

function Support() {
  const { t } = useTranslation("credits");

  return (
    <>
      <Head defaultTitle="Credits | Metallic"></Head>
      <Nav />
      <div className="itemscontainer">
        <div className="itemsection">
          <Obfuscate>{t("title")}</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>{t("developers")}</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Nebeung - {t("mainDevText")}</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Divide - {t("devText")}</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>{t("proxies")}</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Divide - TOMP</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Caracal.js - Ultraviolet</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Divide - Stomp</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Ender - DIP</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>Cohen - Osana</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>EndlessVortex - Aero</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>{t("games")}</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>BinBashBanana - gfiles</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>BinBashBanana - WebRetro</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>{t("others")}</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>{t("othersMessage")}</Obfuscate>
        </div>
      </div>
    </>
  );
}

export default Support;
