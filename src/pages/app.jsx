import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "../i18n.jsx";
import "../style/index.css";
import "../proxy.jsx";
import Background from "../components/background.jsx";
import SettingsLayout from "../SettingsLayout.jsx";
import { ObfuscateLayout } from "../components/obfuscate.jsx";
import { NotificationsMain, Notifications } from "../components/notifications.jsx"
import { useLocalAppearance } from "../settings.jsx";

var Home = React.lazy(() => import("./home.jsx"));
var SettingsAppearance = React.lazy(() => import("./settings/appearance.jsx"));
var SettingsSearch = React.lazy(() => import("./settings/search.jsx"));
var SettingsTab = React.lazy(() => import("./settings/tab.jsx"));
var SettingsUI = React.lazy(() => import("./settings/ui.jsx"));
var Apps = React.lazy(() => import("./apps.jsx"));
var Games = React.lazy(() => import("./games.jsx"));
var Support = React.lazy(() => import("./support.jsx"));
var Credits = React.lazy(() => import("./credits.jsx"));
var Privacy = React.lazy(() => import("./privacy.jsx"));
var Error = React.lazy(() => import("./error.jsx"));

function App() {
  const [localAppearance, setLocalAppearance] = useLocalAppearance();

  var echoPattern = ['3', 'k', 'h', '0'];
  var echoCurrent = 0;
  
  document.addEventListener('keydown', function (e) {
    if (e.key !== echoPattern[echoCurrent]) {
      return (echoCurrent = 0);
    }
  
    echoCurrent++;
  
    if (echoPattern.length == echoCurrent) {
      echoCurrent = 0;
      if (localStorage.getItem("echo") !== "true") {
        var appearance = localAppearance || ""
        Notifications.create({
          text: "Unlocked 3kh0 theme"
        })  
        setLocalAppearance("echo")
        localStorage.setItem("echo", "true")
        return appearance;
      }
    }
  });

  return (
    <>
      <ObfuscateLayout />
      <Background />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<></>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/settings/appearance.html"
          element={
            <SettingsLayout>
              <Suspense fallback={<></>}>
                <SettingsAppearance />
              </Suspense>
            </SettingsLayout>
          }
        />
        <Route
          path="/settings/search.html"
          element={
            <SettingsLayout>
              <Suspense fallback={<></>}>
                <SettingsSearch />
              </Suspense>
            </SettingsLayout>
          }
        />
        <Route
          path="/settings/tab.html"
          element={
            <SettingsLayout>
              <Suspense fallback={<></>}>
                <SettingsTab />
              </Suspense>
            </SettingsLayout>
          }
        />
        <Route
          path="/settings/ui.html"
          element={
            <SettingsLayout>
              <Suspense fallback={<></>}>
                <SettingsUI />
              </Suspense>
            </SettingsLayout>
          }
        />
        <Route
          path="/apps.html"
          element={
            <Suspense fallback={<></>}>
              <Apps />
            </Suspense>
          }
        />
        <Route
          path="/games.html"
          element={
            <Suspense fallback={<></>}>
              <Games />
            </Suspense>
          }
        />
        <Route
          path="/support.html"
          element={
            <Suspense fallback={<></>}>
              <Support />
            </Suspense>
          }
        />
        <Route
          path="/credits.html"
          element={
            <Suspense fallback={<></>}>
              <Credits />
            </Suspense>
          }
        />
        <Route
          path="/privacy.html"
          element={
            <Suspense fallback={<></>}>
              <Privacy />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<></>}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
      <NotificationsMain />
    </>
  );
}

export default App;
