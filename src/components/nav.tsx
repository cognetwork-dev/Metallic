import { Link } from 'preact-router/match';
import { Button } from "../interface/button";
import { AppsIcon } from "../assets/appsIcon";
import { GamesIcon } from "../assets/gamesIcon";
import { SettingsIcon } from "../assets/settingsIcon";
import { Logo } from '../assets/logo';

function Nav() {
    return (
        <nav class="nav px-7 py-5 flex items-center justify-between">
            <Link href="/">
                <Logo class="h-10 w-10" />
            </Link>
            <div class="flex gap-4">
                <Link href="/apps">
                    <Button>
                        <AppsIcon />
                        <span class="font-bold text-textInverse sr-only sm:not-sr-only">Apps</span>
                    </Button>
                </Link>
                <Link href="/games">
                    <Button>
                        <GamesIcon />
                        <span class="font-bold text-textInverse sr-only sm:not-sr-only">Games</span>
                    </Button>
                </Link>
                <Link href="/settings">
                    <Button>
                        <SettingsIcon />
                        <span class="font-bold text-textInverse sr-only sm:not-sr-only">Settings</span>
                    </Button>
                </Link>
            </div>
        </nav>
    )
}

export { Nav };