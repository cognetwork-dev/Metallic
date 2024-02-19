import { useTranslation } from "react-i18next";
import { useGlobalState } from "@ekwoka/preact-global-state";
import { SquareButton } from "../../interface/button";
import { rammerhead } from "../../settings";
import { Obfuscated } from "../../util/obfuscate";
import ultravioletLogo from "../../assets/services/ultravioletLogo.png";
import dynamicLogo from "../../assets/services/dynamicLogo.png";
import rammerheadLogo from "../../assets/services/rammerheadLogo.png";
import { GoogleLogo } from "../../assets/searchEngines/googleLogo";
import { DuckDuckGoLogo } from "../../assets/searchEngines/duckDuckGoLogo";
import { BingLogo } from "../../assets/searchEngines/bingLogo";
import { YahooLogo } from "../../assets/searchEngines/yahooLogo";
import { BraveLogo } from "../../assets/searchEngines/braveLogo";
import { QwantLogo } from "../../assets/searchEngines/qwantLogo";
import { SearXNGLogo } from "../../assets/searchEngines/searXNGLogo";
import { EcosiaLogo } from "../../assets/searchEngines/ecosiaLogo";

function SearchSettings() {
    const { t } = useTranslation();
    const [service, setService] = useGlobalState<string>("service", localStorage.getItem("metallic/service") || "ultraviolet");
    const [searchEngine, setSearchEngine] = useGlobalState<string>("engine", localStorage.getItem("metallic/engine") || "google");
    const [openUsing, setOpenUsing] = useGlobalState<string>("open", localStorage.getItem("metallic/open") || "default");

    return (
        <>
            <h1 class="text-4xl font-bold mb-8">{t("settings.search.service.title")}</h1>
            <section class="flex flex-wrap items-center gap-3">
                <SquareButton active={service == "ultraviolet"} onClick={() => setService("ultraviolet")}>
                    <img draggable={false} height="24" width="24" src={ultravioletLogo} loading="lazy" />
                    <span class="font-bold"><Obfuscated>Ultraviolet</Obfuscated></span>
                </SquareButton>
                <SquareButton active={service == "dynamic"} onClick={() => setService("dynamic")}>
                    <img draggable={false} height="24" width="24" src={dynamicLogo} loading="lazy" />
                    <span class="font-bold"><Obfuscated>Dynamic</Obfuscated></span>
                </SquareButton>
                {rammerhead ? (
                    <SquareButton active={service == "rammerhead"} onClick={() => setService("rammerhead")}>
                        <img draggable={false} height="24" width="24" src={rammerheadLogo} loading="lazy" />
                        <span class="font-bold"><Obfuscated>Rammerhead</Obfuscated></span>
                    </SquareButton>
                ) : null}
            </section>
            <h1 class="text-4xl font-bold my-8">{t("settings.search.searchEngine.title")}</h1>
            <section class="flex flex-wrap items-center gap-3">
                <SquareButton active={searchEngine == "google"} onClick={() => setSearchEngine("google")}>
                    <GoogleLogo />
                    <span class="font-bold">Google</span>
                </SquareButton>
                <SquareButton active={searchEngine == "duckduckgo"} onClick={() => setSearchEngine("duckduckgo")}>
                    <DuckDuckGoLogo />
                    <span class="font-bold">DuckDuckGo</span>
                </SquareButton>
                <SquareButton active={searchEngine == "bing"} onClick={() => setSearchEngine("bing")}>
                    <BingLogo />
                    <span class="font-bold">Bing</span>
                </SquareButton>
                <SquareButton active={searchEngine == "yahoo"} onClick={() => setSearchEngine("yahoo")}>
                    <YahooLogo />
                    <span class="font-bold">Yahoo</span>
                </SquareButton>
                <SquareButton active={searchEngine == "brave"} onClick={() => setSearchEngine("brave")}>
                    <BraveLogo />
                    <span class="font-bold">Brave</span>
                </SquareButton>
                <SquareButton active={searchEngine == "qwant"} onClick={() => setSearchEngine("qwant")}>
                    <QwantLogo />
                    <span class="font-bold">Qwant</span>
                </SquareButton>
                <SquareButton active={searchEngine == "searxng"} onClick={() => setSearchEngine("searxng")}>
                    <SearXNGLogo />
                    <span class="font-bold">SearXNG</span>
                </SquareButton>
                <SquareButton active={searchEngine == "ecosia"} onClick={() => setSearchEngine("ecosia")}>
                    <EcosiaLogo />
                    <span class="font-bold">Ecosia</span>
                </SquareButton>
            </section>
            <h1 class="text-4xl font-bold my-8">{t("settings.search.open.title")}</h1>
            <section class="flex flex-wrap items-center gap-3">
                <SquareButton active={openUsing == "default"} onClick={() => setOpenUsing("default")}>
                    <span class="font-bold">{t("settings.search.open.options.default")}</span>
                </SquareButton>
                <SquareButton active={openUsing == "direct"} onClick={() => setOpenUsing("direct")}>
                    <span class="font-bold">{t("settings.search.open.options.direct")}</span>
                </SquareButton>
                <SquareButton active={openUsing == "about:blank"} onClick={() => setOpenUsing("about:blank")}>
                    <span class="font-bold">about:blank</span>
                </SquareButton>
            </section>
        </>
    )
}

export { SearchSettings };