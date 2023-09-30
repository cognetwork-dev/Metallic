import React from "react";
import { Link } from "react-router-dom";
import Obfuscate from "./obfuscate.jsx";
import { github, discord } from "../consts";
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation("home");

    return (
        <div className="footer">
        <div>
          <Link className="footersides link" to="/4.html">
            <Obfuscate>{t("privacy")}</Obfuscate>
          </Link>
          <Link className="footersides link" to="/5.html">
            <Obfuscate>{t("credits")}</Obfuscate>
          </Link>
        </div>
        <div className="footermiddle">
          <Obfuscate>© Cog Network 2022 - </Obfuscate>{new Date().getFullYear()}
        </div>
        <div>
          <a className="footersides link" href={discord}>
            <Obfuscate>Discord</Obfuscate>
          </a>
          <a
            className="footersides link"
            href={github}
          >
            <Obfuscate>Github</Obfuscate>
          </a>
        </div>
      </div>
    )
}

export default Footer;