import React from "react";
import { Link } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import SettingsIcon from "@mui/icons-material/Settings";
import { ReactComponent as LogoSVG } from "../assets/logo.svg";
import { ReactComponent as TsunamiSVG } from "../assets/tsunamiLogo.svg";
import { ReactComponent as BananaSVG } from "../assets/bananaLogo.svg";
import { useLocalAppearance } from "../settings.jsx";

function Nav() {
  var [localAppearance] = useLocalAppearance();

  return (
    <div className="nav">
      <Link className="homenav" to="/">
        {localAppearance === "tsunami" ? (
          <TsunamiSVG />
        ) : localAppearance === "banana" ? (
          <BananaSVG />
        ) : localAppearance === "hub" ? (
          <div className="hub">Metal<div className="hubend">lic</div></div>
        ) : (
          <LogoSVG fill="var(--highlight)" />
        )}
      </Link>
      <div className="navitems">
        <Link className="navitem" to="/apps.html">
          <AppsIcon />
        </Link>
        <Link className="navitem" to="/games.html">
          <VideogameAssetIcon />
        </Link>
        <Link className="navitem" to="/settings/search.html">
          <SettingsIcon />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
