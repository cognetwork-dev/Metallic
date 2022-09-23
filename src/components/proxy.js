import React from "react";
import PublicIcon from "@mui/icons-material/Public";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import { getWindowLocation } from "../util.js";
import "../style/controls.css";

function Proxy({ config, configChange }) {
  var [newConfig, setNewConfig] = React.useState(config);
  if (config !== newConfig) {
    setNewConfig(config);
  }

  if (config.open) {
    document.body.style.overflow = "hidden";
  }

  function close() {
    document.body.style.overflow = "initial";
    configChange({
      open: false,
      url: null,
      title: null,
      icon: null,
    });
    setNewConfig({
      open: false,
      url: null,
      title: null,
      icon: null,
    });
  }

  var web = React.createRef();

  function reload() {
    try {
      web.current.contentWindow.location.reload();
    } catch (err) {
      //
    }
  }

  function fullscreen() {
    web.current.requestFullscreen();
  }

  function setTab() {
    var updatedConfig = newConfig;
    //web.current.contentWindow.location.href
    updatedConfig.title =
      web.current.contentWindow.document.title ||
      getWindowLocation(web.current);
    updatedConfig.icon = "https://google.com/favicon.ico";

    var initFavicon = null;
    var icon =
      web.current.contentWindow.document.querySelector("link[rel*='icon']") ||
      null;
    var shortcuticon =
      web.current.contentWindow.document.querySelector(
        "link[rel='shortcut icon']"
      ) || null;
    if (icon) {
      initFavicon = new URL(
        web.current.contentWindow.document
          .querySelector("link[rel*='icon']")
          .getAttribute("href"),
        web.current.contentWindow.document.baseURI
      ).toString();
    } else if (shortcuticon) {
      initFavicon = new URL(
        web.current.contentWindow.document
          .querySelector("link[rel*='shortcut icon']")
          .getAttribute("href"),
        web.current.contentWindow.document.baseURI
      ).toString();
    }
    if (initFavicon === web.current.contentWindow.document.baseURI) {
      initFavicon = null;
    }
    updatedConfig.icon = initFavicon;

    configChange(updatedConfig);
    setNewConfig(updatedConfig);
  }

  var controlsOpen = newConfig.open ? "flex" : "none";
  var webOpen = newConfig.open ? "initial" : "none";
  var icon = newConfig.icon ? (
    <img src={newConfig.icon} alt="Website" />
  ) : (
    <PublicIcon fontSize="large" />
  );
  return (
    <>
      <div style={{ display: controlsOpen }} className="controls">
        <div className="controlsIcon">{icon}</div>
        <div className="controlsTitle">{newConfig.title || "Loading..."}</div>
        <div className="controlsButton" onClick={fullscreen}>
          <FullscreenIcon />
        </div>
        <div className="controlsButton" onClick={reload}>
          <RefreshIcon />
        </div>
        <div className="controlsButton" onClick={close}>
          <CloseIcon />
        </div>
      </div>
      <iframe
        onLoad={setTab}
        ref={web}
        style={{ display: webOpen }}
        className="web"
        src={newConfig.url}
        title="Website"
      ></iframe>
    </>
  );
}

export { Proxy as default };
