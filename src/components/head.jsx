import React from "react";
import {
  useLocalAppearance,
  useLocalControls,
  useLocalRounding,
  useLocalIcon,
  useLocalTitle,
  useLocalLanguage,
} from "../settings.jsx";
import { useTranslation } from 'react-i18next';
import { renderToStaticMarkup } from 'react-dom/server';
import { ReactComponent as LogoSVG } from "../assets/logo.svg";

function Head({ defaultTitle }) {
  var [localTitle] = useLocalTitle();
  var [localIcon] = useLocalIcon();
  var [localAppearance] = useLocalAppearance();
  var [localControls] = useLocalControls();
  var [localRounding] = useLocalRounding();
  var [localLanguage] = useLocalLanguage();

  const { t } = useTranslation("title");

  document.body.setAttribute("appearance", localAppearance);
  document.body.setAttribute("controls", localControls);
  document.body.setAttribute("rounding", localRounding);

  React.useEffect(() => {
    var translatedTitle = defaultTitle ? t(defaultTitle) + " | " + "Metallic" : "Metallic"
    var title = localTitle || translatedTitle || "";

    document.title = title;
  }, [localLanguage]);

  React.useEffect(() => {
    document.body.setAttribute("appearance", localAppearance);
    
    var logo = renderToStaticMarkup(<LogoSVG/>)
    logo = logo.replace("var(--highlight, #004953)", getComputedStyle(document.body).getPropertyValue("--highlight") || "var(--highlight, #004953)")
    var themedLogo = "data:image/svg+xml;base64," + window.btoa(logo)

    var icon = localIcon || themedLogo || "/logos/logo.svg"

    for (var link of document.querySelectorAll("link[rel*='icon']")) {
      link.href = icon;
    }
  }, [localAppearance]);

  return <></>;
}

export default Head;
