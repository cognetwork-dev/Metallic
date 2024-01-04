import { Link } from 'preact-router/match';
import { RoundButton } from "../interface/button";
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
                    <RoundButton>
                        <AppsIcon />
                    </RoundButton>
                </Link>
                <Link href="/games">
                    <RoundButton>
                        <GamesIcon />
                    </RoundButton>
                </Link>
                <Link href="/settings">
                    <RoundButton>
                        <SettingsIcon />
                    </RoundButton>
                </Link>
            </div>
        </nav>
    )
}

export { Nav };