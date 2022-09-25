import React from "react";
import {
  useLocalAppearance,
  useLocalControls,
  useLocalIcon,
  useLocalTitle,
} from "../settings.js";

function Head({ defaultTitle, defaultIcon }) {
  var [localTitle] = useLocalTitle();
  var [localIcon] = useLocalIcon();
  var [localAppearance] = useLocalAppearance();
  var [localControls] = useLocalControls();

  var title = localTitle || defaultTitle || "";
  var icon = localIcon || defaultIcon || "/favicon.ico";

  document.body.setAttribute("appearance", localAppearance);
  document.body.setAttribute("controls", localControls);

  document.title = title;

  for (var link of document.querySelectorAll("link[rel*='icon']")) {
    link.href = icon;
  }

  return <></>;
}

export default Head;
