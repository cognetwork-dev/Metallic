import React from "react";
import Nav from "../components/nav.jsx";
import Footer from "../components/footer.jsx";
import Obfuscate from "../components/obfuscate.jsx";
import Head from "../components/head.jsx";
import Proxy from "../components/proxy.jsx";
import BareClient from "@tomphttp/bare-client";
import { bareServerURL } from "../consts.jsx";
import { getLink } from "../util.jsx";
import { useLocalAppearance } from "../settings.jsx";
import { useTranslation } from 'react-i18next';
import { renderToStaticMarkup } from 'react-dom/server';
import { Notifications } from "../components/notifications.jsx"

function Home() {
  const { t } = useTranslation("home");

  var proxy = React.useRef();

  var [suggestions, setSuggestions] = React.useState([]);

  const bare = React.useMemo(() => new BareClient(bareServerURL), []);

  var omniboxcontainer = React.useRef();

  var suggestionsChildren = React.useRef();

  var omnibox = React.useRef();
  
 const [localAppearance, setLocalAppearance] = useLocalAppearance();

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
        "https://duckduckgo.com/ac/?q=" + query + "&type=list"
      );
      results = await site.json();
      results = results[1];
      results = results.slice(0, 6);
    } catch (err) {
      console.error(err);
      results = [];
    }
    results = results.map((result) => {
      return renderToStaticMarkup(<Obfuscate>{result}</Obfuscate>);
    })

    setSuggestions(results);
    if (suggestionsChildren.current.children.length === 0) {
      hideOmnibox();
    } else {
      showOmnibox();
    }
  }

  function submit(value) {
    try {
      proxy.current.open({ url: getLink(value) });
    } catch (err) {
      console.error(err);
      alert(err.toString());
    }
  }

  async function searchType(e) {
    if (localStorage.getItem("hub") !== "true" && e.keyCode === 13) {
      var appearance = localAppearance || ""
      try {
        if (new URL(e.target.value).hostname === window.atob("cG9ybmh1Yi5jb20=")) {
          Notifications.create({
            text: "Unlocked Hub theme"
          })
          setLocalAppearance("hub")
          localStorage.setItem("hub", "true")
          return appearance;
        }
      } catch {}
      try {
        if (new URL("https://" + e.target.value).hostname === window.atob("cG9ybmh1Yi5jb20=")) {
          Notifications.create({
            text: "Unlocked Hub theme"
          })
          setLocalAppearance("hub")
          localStorage.setItem("hub", "true")
          return appearance;
        }
      } catch {}
    }
    
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
      e.target.className !== "link sugg"
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
      <Head></Head>
      <Proxy ref={proxy} />
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
          {suggestions.map((item, i) => (
            <div
              key={i}
              className="link sugg"
              onClick={(e) => submit(e.target.textContent)}
              dangerouslySetInnerHTML={{ __html: item }}
            ></div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
