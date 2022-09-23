import React from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "./components/nav.js";
import Head from "./components/head.js";
import Obfuscate from "./components/obfuscate.js";
import clsx from "clsx";

function Tab({ path, children }) {
  const location = useLocation();

  return (
    <Link to={path}>
      <div
        className={clsx(
          "settingssidecard",
          location.pathname === path && "settingssidecardsel"
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
        <Tab path="/settings/search">
          <Obfuscate>Search</Obfuscate>
        </Tab>
        <Tab path="/settings/tab">
          <Obfuscate>Tab</Obfuscate>
        </Tab>
        <Tab path="/settings/appearance">
          <Obfuscate>Appearance</Obfuscate>
        </Tab>
        <Tab path="/settings/ui">
          <Obfuscate>UI</Obfuscate>
        </Tab>
      </div>
      <div className="settingsapp">{children}</div>
    </>
  );
}
