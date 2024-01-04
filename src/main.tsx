import { render } from 'preact';
import { Router, Route } from 'preact-router';

import { Home } from "./pages/home";
import { Error } from "./pages/error";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";

import './style/index.css';

function App() {
    document.body.dataset.theme = "default";

    return (
        <>
            <Nav />
            <main class="px-7">
                <Router>
                    <Route
                        path="/"
                        component={Home}
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