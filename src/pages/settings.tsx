import { Head } from "../components/head";
import { Link } from "preact-router/match";
import { Router, Route } from 'preact-router';
import { SearchIcon } from "../assets/searchIcon";
import { TabIcon } from "../assets/tabIcon";
import { AppearanceIcon } from "../assets/appearanceIcon";
import { LocaleIcon } from "../assets/localeIcon";

import { AppearanceSettings } from "./settings/appearance";
import { SearchSettings } from "./settings/search";

function Settings() {
    return (
        <>
            <Head title="Settings" />
            <div class="flex gap-7 overflow-hidden">
                <aside class="flex flex-col gap-4">
                    <Link activeClassName="bg-secondary" class="rounded-lg px-4 py-2 select-none cursor-pointer h-10 flex items-center gap-1.5 w-auto sm:w-72" href="/settings/search">
                        <SearchIcon />
                        <span class="font-bold text-textInverse sr-only sm:not-sr-only">Search</span>
                    </Link>
                    <Link activeClassName="bg-secondary" class="rounded-lg px-4 py-2 select-none cursor-pointer h-10 flex items-center gap-1.5 w-auto sm:w-72" href="/settings/tab">
                        <TabIcon />
                        <span class="font-bold text-textInverse sr-only sm:not-sr-only">Tab</span>
                    </Link>
                    <Link activeClassName="bg-secondary" class="rounded-lg px-4 py-2 select-none cursor-pointer h-10 flex items-center gap-1.5 w-auto sm:w-72" href="/settings/appearance">
                        <AppearanceIcon />
                        <span class="font-bold text-textInverse sr-only sm:not-sr-only">Appearance</span>
                    </Link>
                    <Link activeClassName="bg-secondary" class="rounded-lg px-4 py-2 select-none cursor-pointer h-10 flex items-center gap-1.5 w-auto sm:w-72" href="/settings/locale">
                        <LocaleIcon />
                        <span class="font-bold text-textInverse sr-only sm:not-sr-only">Locale</span>
                    </Link>
                </aside>
                <section>
                <Router>
                        <Route
                            path="/settings/search"
                            component={SearchSettings}
                        />
                    </Router>
                    <Router>
                        <Route
                            path="/settings/appearance"
                            component={AppearanceSettings}
                        />
                    </Router>
                </section>
            </div>
        </>
    )
}

export { Settings };