import { Head } from "../components/head";
import { Link } from "preact-router/match";
import { Router, Route } from 'preact-router';
import { useTranslation } from "react-i18next";
import { SearchIcon } from "../assets/searchIcon";
import { TabIcon } from "../assets/tabIcon";
import { AppearanceIcon } from "../assets/appearanceIcon";
import { LocaleIcon } from "../assets/localeIcon";
import { Obfuscated } from "../util/obfuscate";

import { AppearanceSettings } from "./settings/appearance";
import { SearchSettings } from "./settings/search";
import { TabSettings } from "./settings/tab";
import { LocaleSettings } from "./settings/locale";

function Settings() {
    const { t } = useTranslation();

    return (
        <>
            <Head pageTitle={t("title.settings")} />
            <div class="flex gap-7">
                <aside class="flex flex-col gap-4 sticky top-[108px] self-start">
                    <Link activeClassName="bg-secondary text-textInverse settingsButtonActive" class="settingsButton rounded-lg px-4 py-2 select-none cursor-pointer h-10 flex items-center gap-1.5 w-auto sm:w-72" href="/settings/search">
                        <SearchIcon />
                        <span class="font-bold sr-only sm:not-sr-only"><Obfuscated>{t("settings.tabs.search")}</Obfuscated></span>
                    </Link>
                    <Link activeClassName="bg-secondary text-textInverse settingsButtonActive" class="settingsButton rounded-lg px-4 py-2 select-none cursor-pointer h-10 flex items-center gap-1.5 w-auto sm:w-72" href="/settings/tab">
                        <TabIcon />
                        <span class="font-bold #555 sr-only sm:not-sr-only"><Obfuscated>{t("settings.tabs.tab")}</Obfuscated></span>
                    </Link>
                    <Link activeClassName="bg-secondary text-textInverse settingsButtonActive" class="settingsButton rounded-lg px-4 py-2 select-none cursor-pointer h-10 flex items-center gap-1.5 w-auto sm:w-72" href="/settings/appearance">
                        <AppearanceIcon />
                        <span class="font-bold #555 sr-only sm:not-sr-only"><Obfuscated>{t("settings.tabs.appearance")}</Obfuscated></span>
                    </Link>
                    <Link activeClassName="bg-secondary text-textInverse settingsButtonActive" class="settingsButton rounded-lg px-4 py-2 select-none cursor-pointer h-10 flex items-center gap-1.5 w-auto sm:w-72" href="/settings/locale">
                        <LocaleIcon />
                        <span class="font-bold #555 sr-only sm:not-sr-only"><Obfuscated>{t("settings.tabs.locale")}</Obfuscated></span>
                    </Link>
                </aside>
                <section>
                    <Router>
                        <Route
                            path="/settings/search"
                            component={SearchSettings}
                        />
                        <Route
                            path="/settings/tab"
                            component={TabSettings}
                        />
                        <Route
                            path="/settings/appearance"
                            component={AppearanceSettings}
                        />
                        <Route
                            path="/settings/locale"
                            component={LocaleSettings}
                        />
                    </Router>
                </section>
            </div>
        </>
    )
}

export { Settings };