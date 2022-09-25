import React from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "./components/nav.js";
import Head from "./components/head.js";
import Obfuscate from "./components/obfuscate.js";
import clsx from "clsx";

function Tab({ to, children }) {
  const location = useLocation();

  return (
    <Link to={to}>
      <div
        className={clsx(
          "settingssidecard",
          location.pathname === to && "settingssidecardsel"
        )}
      >
        <Obfuscate>{children}</Obfuscate>
      </div>
    </Link>
  );
}

export default function SettingsLayout({ children }) {
  return (
    <>
      <Head defaultTitle="Settings | Metallic"></Head>
      <Nav settings />
      <div className="settingssidebar">
        <div className="settingssidetitle">
          <Obfuscate>Settings</Obfuscate>
        </div>
        <Tab to="/settings/search.html">
          <Obfuscate>Search</Obfuscate>
        </Tab>
        <Tab to="/settings/tab.html">
          <Obfuscate>Tab</Obfuscate>
        </Tab>
        <Tab to="/settings/appearance.html">
          <Obfuscate>Appearance</Obfuscate>
        </Tab>
        <Tab to="/settings/ui.html">
          <Obfuscate>UI</Obfuscate>
        </Tab>
      </div>
      <div className="settingsapp">{children}</div>
    </>
  );
}
