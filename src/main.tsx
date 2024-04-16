import { render } from 'preact';
import { Router, Route } from 'preact-router';
import { ObfuscateLayout } from './util/obfuscate';

import { Home } from "./pages/home";
import { Apps } from "./pages/apps";
import { Games } from "./pages/games";
import { Settings } from './pages/settings';
import { Privacy } from './pages/privacy';
import { Error } from "./pages/error";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";

import './util/locale';
import './util/setupSW';
import './style/index.css';

function App() {
    return (
        <>
            <ObfuscateLayout />
            <Nav />
            <main class="main p-7">
                <Router>
                    <Route
                        path="/"
                        component={Home}
                    />
                    <Route
                        path="/apps"
                        component={Apps}
                    />
                    <Route
                        path="/games"
                        component={Games}
                    />
                    <Route
                        path="/settings/search"
                        component={Settings}
                    />
                    <Route
                        path="/settings/tab"
                        component={Settings}
                    />
                    <Route
                        path="/settings/appearance"
                        component={Settings}
                    />
                    <Route
                        path="/settings/locale"
                        component={Settings}
                    />
                    <Route
                        path="/privacy"
                        component={Privacy}
                    />
                    <Route
                        default
                        component={Error}
                    />
                </Router>
            </main>
            <Footer />
        </>
    )
}

render(<App />, document.getElementById('app')!)