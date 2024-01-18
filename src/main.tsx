import { render } from 'preact';
import { Router, Route } from 'preact-router';

import { Home } from "./pages/home";
import { Settings } from './pages/settings';
import { Error } from "./pages/error";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";

import './util/locale';
import './util/setupSW';
import './style/index.css';

function App() {
    return (
        <>
            <Nav />
            <main class="main p-7">
                <Router>
                    <Route
                        path="/"
                        component={Home}
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