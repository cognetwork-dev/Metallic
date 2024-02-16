import { Link } from 'preact-router/match';
import { useTranslation } from "react-i18next";
import { Button } from "../interface/button";
import { Logo } from '../assets/logo';
import { HomeIcon } from "../assets/homeIcon";
import { AppsIcon } from "../assets/appsIcon";
import { GamesIcon } from "../assets/gamesIcon";
import { SettingsIcon } from "../assets/settingsIcon";
import { Obfuscated } from '../util/obfuscate';

function Nav() {
    const { t } = useTranslation();

    return (
        <nav class="nav px-7 py-5 flex items-center justify-between sticky top-0 right-0 left-0 bg-background">
            <Link class="logo" href="/">
                <Logo class="h-10 w-10" />
            </Link>
            <div class="flex gap-4">
                <Link href="/" class="sr-only sm:not-sr-only">
                    <Button active={true}>
                        <HomeIcon />
                        <span class="font-bold sr-only sm:not-sr-only">{t("nav.home")}</span>
                    </Button>
                </Link>
                <Link href="/apps">
                    <Button active={true}>
                        <AppsIcon />
                        <span class="font-bold sr-only sm:not-sr-only">{t("nav.apps")}</span>
                    </Button>
                </Link>
                <Link href="/games">
                    <Button active={true}>
                        <GamesIcon />
                        <span class="font-bold sr-only sm:not-sr-only"><Obfuscated>{t("nav.games")}</Obfuscated></span>
                    </Button>
                </Link>
                <Link href="/settings/search">
                    <Button active={true}>
                        <SettingsIcon />
                        <span class="font-bold sr-only sm:not-sr-only">{t("nav.settings")}</span>
                    </Button>
                </Link>
            </div>
        </nav>
    )
}

export { Nav };