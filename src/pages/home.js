import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/nav.js";
import Obfuscate from "../components/obfuscate.js";
import Head from "../components/head.js";
import Proxy from "../components/proxy.js";
import BareClient from "@tomphttp/bare-client";
import { getLink } from "../util.js";
import { useLocalWindow } from "../settings.js";
import { bareServerURL } from "../consts.js";

function Home() {
  var [proxyConfig, setProxyConfig] = React.useState({
    open: false,
    url: null,
    title: null,
    icon: null,
  });

  var [suggestions, setSuggestions] = React.useState([]);

  const bare = React.useMemo(() => new BareClient(bareServerURL), []);

  var omniboxcontainer = React.useRef();

  var suggestionsChildren = React.useRef();

  var omnibox = React.useRef();

  function showOmnibox() {
    if (!omniboxcontainer.current) return;

    if (!omniboxcontainer.current.hasAttribute("open")) {
      omniboxcontainer.current.setAttribute("open", "");
    }
  }

  function hideOmnibox() {
    if (!omniboxcontainer.current) return;

    if (omniboxcontainer.current.hasAttribute("open")) {
      omniboxcontainer.current.removeAttribute("open");
    }
  }

  async function updateOmnibox(query) {
    let results;

    try {
      var site = await bare.fetch(
        "https://www.google.com/complete/search?client=gws-wiz&q=" + query
      );
      results = await site.text();
      results = JSON.parse(
        results.replaceAll("window.google.ac.h(", "").slice(0, -1)
      )[0];
      results.forEach((item, number) => (results[number] = item[0]));
      results = results.slice(0, 6);
    } catch (err) {
      console.error(err);
      results = [];
    }
    setSuggestions(results);
    if (suggestionsChildren.current.children.length === 0) {
      hideOmnibox();
    } else {
      showOmnibox();
    }
  }

  var [localWindow] = useLocalWindow();

  function submit(value) {
    try {
      switch (localWindow) {
        case "simple":
          window.location.href = getLink(value);
          break;
        case "ab":
          var page = window.open();
          page.document.body.innerHTML =
            `<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="` +
            new URL(getLink(value), window.location) +
            `"></iframe>`;
          break;
        default:
        case "default":
          setProxyConfig({
            open: true,
            url: getLink(value),
            title: null,
            icon: null,
          });
      }
    } catch (err) {
      alert(err.toString());
    }
  }

  async function searchType(e) {
    if (e.keyCode === 13) return submit(e.target.value);

    if (e.target.value && e.target.value !== "") {
      updateOmnibox(e.target.value);
      showOmnibox();
    } else {
      hideOmnibox();
      setSuggestions([]);
    }
  }

  window.addEventListener("click", function (e) {
    if (!omniboxcontainer.current) return;

    if (
      e.target.className !== "omnibox" &&
      e.target.className !== "search" &&
      e.target.className !== "searchicon" &&
      e.target.className !== "suggestions" &&
      e.target.className !== "sugg"
    ) {
      if (omniboxcontainer.current.hasAttribute("open")) {
        hideOmnibox();
        setSuggestions([]);
      }
    } else {
      if (e.target.value && e.target.value !== "") {
        updateOmnibox(e.target.value);
        showOmnibox();
      } else {
        hideOmnibox();
        setSuggestions([]);
      }
    }
  });

  return (
    <>
      <Head defaultTitle="Metallic"></Head>
      <Proxy config={proxyConfig} configChange={(e) => setProxyConfig(e)} />
      <Nav />
      <div className="hometitle">
        <Obfuscate>Metallic</Obfuscate>
      </div>
      <div ref={omniboxcontainer} className="omniboxcontainer">
        <div ref={omnibox} className="omnibox">
          <div className="searchicon">
            <svg
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </div>
          <input
            onKeyUp={searchType}
            autoComplete="off"
            autoFocus
            id="search"
            className="search"
          />
        </div>
        <div ref={suggestionsChildren} className="suggestions">
          {suggestions.map((item) => (
            <div
              key={item}
              className="sugg"
              onClick={(e) => submit(e.target.textContent)}
              dangerouslySetInnerHTML={{ __html: item }}
            ></div>
          ))}
        </div>
      </div>
      <div className="footer">
        <div>
          <Link className="footersides link" to="/privacy">
            Privacy
          </Link>
          <Link className="footersides link" to="/credits">
            Credits
          </Link>
        </div>
        <div className="footermiddle">
          <Obfuscate>© Metallic {new Date().getFullYear()}</Obfuscate>
        </div>
        <div>
          <a className="footersides link" href="https://discord.gg/yk33HZSZkU">
            Discord
          </a>
          <a
            className="footersides link"
            href="https://github.com/FogNetwork/Metallic"
          >
            Github
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
