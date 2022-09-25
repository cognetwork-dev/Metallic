import { useLocalWindow } from "../settings.js";
import React from "react";
import PublicIcon from "@mui/icons-material/Public";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import { getWindowLocation } from "../util.js";
import "../style/controls.css";

var Proxy = React.forwardRef(({ overrideWindow }, ref) => {
  var web = React.createRef();
  var [config, setConfig] = React.useState();
  var [localWindow] = useLocalWindow();

  React.useImperativeHandle(
    ref,
    () => ({
      open: (config) => {
        switch (overrideWindow || localWindow) {
          case "simple":
            window.location.href = config.url;
            break;
          case "ab":
            var page = window.open();
            page.document.body.innerHTML =
              `<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="` +
              new URL(config.url, window.location) +
              `"></iframe>`;
            break;
          default:
          case "default":
            setConfig({
              url: config.url,
              title: null,
              icon: null,
            });
        }
        setConfig(config);
      },
    }),
    [localWindow, overrideWindow]
  );

  React.useEffect(() => {
    document.body.style.overflow = config ? "hidden" : "initial";

    return () => delete document.body.style.overflow;
  }, [config]);

  if (!config) return;

  return (
    <>
      <div className="controls">
        <div className="controlsIcon">
          {config.icon ? (
            <img src={config.icon} alt="Website" />
          ) : (
            <PublicIcon fontSize="large" />
          )}
        </div>
        <div className="controlsTitle">{config.title || "Loading..."}</div>
        <div
          className="controlsButton"
          onClick={() => {
            web.current.requestFullscreen();
          }}
        >
          <FullscreenIcon />
        </div>
        <div
          className="controlsButton"
          onClick={() => {
            try {
              web.current.contentWindow.location.reload();
            } catch (err) {
              //
            }
          }}
        >
          <RefreshIcon />
        </div>
        <div className="controlsButton" onClick={() => setConfig()}>
          <CloseIcon />
        </div>
      </div>
      <iframe
        onLoad={() => {
          var updatedConfig = {
            url: config.url,
          };

          updatedConfig.title =
            web.current.contentWindow.document.title ||
            getWindowLocation(web.current);

          var icon = web.current.contentWindow.document.querySelector(
            "link[rel*='icon'],link[rel='shortcut icon']"
          );

          updatedConfig.icon = icon
            ? icon.href
            : new URL(
                "/favicon.ico",
                web.current.contentWindow.document.baseURI
              );

          setConfig(updatedConfig);
        }}
        ref={web}
        className="web"
        src={config.url}
        title="Website"
      ></iframe>
    </>
  );
});

export { Proxy as default };
