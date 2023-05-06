import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/nav.jsx";
import Head from "../components/head.jsx";
import Obfuscate from "../components/obfuscate.jsx";
import { useTranslation } from 'react-i18next';

function Error() {
  const { t } = useTranslation("error");

  return (
    <>
      <Head defaultTitle="error"></Head>
      <Nav />
      <div className="title">
        <Obfuscate>404 Error</Obfuscate>
      </div>
      <div className="desc">
        <Obfuscate>
          {t("page", {pathname: window.location.pathname})}
        </Obfuscate>
        <br />
        <Obfuscate>{t("support.0")}</Obfuscate>
        <Link className="link" to="/6.html">
          <Obfuscate>{t("support.1")}</Obfuscate>
        </Link>
        <Obfuscate>{t("support.2")}</Obfuscate>
      </div>
    </>
  );
}

export default Error;
