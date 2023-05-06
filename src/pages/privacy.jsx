import React from "react";
import Nav from "../components/nav.jsx";
import Head from "../components/head.jsx";
import Obfuscate from "../components/obfuscate.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Privacy() {
  const { t } = useTranslation("privacy");

  return (
    <>
      <Head defaultTitle="privacy"></Head>
      <Nav />
      <div className="itemscontainer">
        <div className="itemsection">
          <Obfuscate>{t("title")}</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>{t("policy.0.title")}</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>{t("policy.0.text")}</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>{t("policy.1.title")}</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>{t("policy.1.text")}</Obfuscate>
        </div>
        <div className="itemtitle">
          <Obfuscate>{t("policy.2.title")}</Obfuscate>
        </div>
        <div className="itemtext">
          <Obfuscate>{t("policy.2.text")}</Obfuscate>
          <Link className="link" to="/6.html">
            <Obfuscate>{t("policy.2.page")}</Obfuscate>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Privacy;
