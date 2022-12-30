import React from "react";
import {
  useLocalAppearance,
  useLocalControls,
  useLocalRounding,
  useLocalIcon,
  useLocalTitle,
} from "../settings.js";

function Head({ defaultTitle, defaultIcon }) {
  var [localTitle] = useLocalTitle();
  var [localIcon] = useLocalIcon();
  var [localAppearance] = useLocalAppearance();
  var [localControls] = useLocalControls();
  var [localRounding] = useLocalRounding();

  var title = localTitle || defaultTitle || "";
  var icon = localIcon || defaultIcon || "/logo.png";

  document.body.setAttribute("appearance", localAppearance);
  document.body.setAttribute("controls", localControls);
  document.body.setAttribute("rounding", localRounding);

  document.title = title;

  for (var link of document.querySelectorAll("link[rel*='icon']")) {
    link.href = icon;
  }

  return <></>;
}

export default Head;
