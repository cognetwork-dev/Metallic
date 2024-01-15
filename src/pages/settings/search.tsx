import { useGlobalState } from "@ekwoka/preact-global-state";
import { SquareButton } from "../../interface/button";
import ultravioletLogo from "../../assets/ultravioletLogo.png";
import dynamicLogo from "../../assets/dynamicLogo.png";
import rammerheadLogo from "../../assets/rammerheadLogo.png";
import { StompLogo } from "../../assets/stompLogo";
import { GoogleLogo } from "../../assets/googleLogo";
import { DuckDuckGoLogo } from "../../assets/duckDuckGoLogo";
import { BingLogo } from "../../assets/bingLogo";
import { YahooLogo } from "../../assets/yahooLogo";
import { BraveLogo } from "../../assets/braveLogo";
import { QwantLogo } from "../../assets/qwantLogo";
import { SearXNGLogo } from "../../assets/searXNGLogo";
import { EcosiaLogo } from "../../assets/ecosiaLogo";

function SearchSettings() {
    const [service, setService] = useGlobalState<string>("service", localStorage.getItem("metallic/service") || "ultraviolet");
    const [searchEngine, setSearchEngine] = useGlobalState<string>("engine", localStorage.getItem("metallic/engine") || "google");

    return (
        <>
            <h1 class="text-4xl font-bold mb-8">Service</h1>
            <section class="flex flex-wrap items-center gap-3">
                <SquareButton active={service == "ultraviolet"} onClick={() => setService("ultraviolet")}>
                    <img draggable={false} height="24" width="24" src={ultravioletLogo} loading="lazy" />
                    <span class="font-bold">Ultraviolet</span>
                </SquareButton>
                <SquareButton active={service == "dynamic"} onClick={() => setService("dynamic")}>
                    <img draggable={false} height="24" width="24" src={dynamicLogo} loading="lazy" />
                    <span class="font-bold">Dynamic</span>
                </SquareButton>
                <SquareButton active={service == "rammerhead"} onClick={() => setService("rammerhead")}>
                    <img draggable={false} height="24" width="24" src={rammerheadLogo} loading="lazy" />
                    <span class="font-bold">Rammerhead</span>
                </SquareButton>
                <SquareButton active={service == "stomp"} onClick={() => setService("stomp")}>
                    <StompLogo />
                    <span class="font-bold">Stomp</span>
                </SquareButton>
            </section>
            <h1 class="text-4xl font-bold my-8">Search Engine</h1>
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
        </>
    )
}

export { SearchSettings };