import { useState, useEffect, useRef } from "preact/hooks";
import { useGlobalState } from "@ekwoka/preact-global-state";
import { Head } from "../components/head";
import { Web, searchWeb } from "../components/web";
import { SearchIcon } from "../assets/searchIcon";
import { CloseIcon } from "../assets/closeIcon";
import { createBareClient } from "@tomphttp/bare-client";
import { bare } from "../settings";
import { Obfuscated } from "../util/obfuscate";
import { searchURL } from "../util/searchURL";
import searchEngineData from "../assets/searchEngineData.json";

function Home() {
    const [service] = useGlobalState<string>("service", localStorage.getItem("metallic/service") || "ultraviolet");
    const [theme] = useGlobalState<string>("theme", localStorage.getItem("metallic/theme") || "default");
    const [searchEngine] = useGlobalState<string>("engine", localStorage.getItem("metallic/engine") || searchEngineData.google);
    const [openUsing] = useGlobalState<string>("open", localStorage.getItem("metallic/open") || "default");
    const [webOpen, setWebOpen] = useState(false);
    const search = useRef<HTMLInputElement>();
    const [searchHasValue, setSearchHasValue] = useState(false);
    const [suggestions, setSuggestions] = useState<any>([]);
    let bareClient: any;

    (async () => {
        bareClient = await createBareClient(bare);
    })();

    function clearInput() {
        if (search && search.current) {
            if (!search.current.value) {
                setSuggestions([]);
                setSearchHasValue(false);
            }
        }
    }

    useEffect(() => {
        if (search && search.current) {
            search.current.focus();
        }
    }, [location.pathname])

    const handleSuggestions = async (e: any) => {
        setSearchHasValue(e.target.value !== "");

        if (e.target.value) {
            if (bareClient) {
                try {
                    const site = await bareClient.fetch(
                        "https://duckduckgo.com/ac/?q=" + e.target.value + "&type=list"
                    );
                    const results = await site.json();
                    setSuggestions(results[1].slice(0, 9))
                } catch (err) {
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    }

    const handleSearch = async (e: any) => {
        if (e.key == "Enter") {
            if (e.target.value) {
                switch (openUsing) {
                    case "default":
                        await searchWeb(e.target.value, service, searchEngine, webOpen, setWebOpen, e.target, clearInput);
                        break;
                    case "direct":
                        window.open(await searchURL(e.target.value, service, searchEngine))
                        if (search && search.current) {
                            search.current.value = "";
                        }
                        clearInput()
                        break;
                    case "about:blank":
                        const blank = window.open("")
                        if (blank) {
                            blank.document.body.innerHTML = `<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="` + await searchURL(e.target.value, service, searchEngine) + `"></iframe>`;
                        }
                        if (search && search.current) {
                            search.current.value = "";
                        }
                        clearInput()
                        break;
                }
            }
        }
    }

    function clearSearch() {
        if (search && search.current) {
            search.current.value = "";
            clearInput();
            search.current.focus();
        }
    }

    async function clickSuggestion(suggestion: string) {
        switch (openUsing) {
            case "default":
                await searchWeb(suggestion, service, searchEngine, webOpen, setWebOpen, search.current, clearInput);
                break;
            case "direct":
                window.open(await searchURL(suggestion, service, searchEngine))
                if (search && search.current) {
                    search.current.value = "";
                }
                clearInput()
                break;
            case "about:blank":
                const blank = window.open("")
                if (blank) {
                    blank.document.body.innerHTML = `<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="` + await searchURL(suggestion, service, searchEngine) + `"></iframe>`;
                }
                if (search && search.current) {
                    search.current.value = "";
                }
                clearInput()
                break;
        }
    }

    return (
        <>
            <Head />
            <Web open={webOpen} setOpen={setWebOpen} />
            {theme == "hub" ? (
                <h1 class="title mt-32 mb-8 sm:mb-16 flex items-center justify-center">
                    <span class="text-4xl sm:text-6xl font-bold text-center font-title"><Obfuscated>Metal</Obfuscated></span>
                    <span class="text-4xl sm:text-6xl font-bold text-center font-title bg-secondary rounded p-1 ml-1 text-textInverse"><Obfuscated>lic</Obfuscated></span>
                </h1>
            ) : (
                <h1 class="title text-4xl sm:text-6xl font-bold text-center mt-32 mb-8 sm:mb-16 font-title"><Obfuscated>Metallic</Obfuscated></h1>
            )}
            <div class="flex flex-col items-center justify-center">
                <div class={"bg-secondary w-[600px] h-14 flex items-center justify-center" + (suggestions.length ? " rounded-[28px_28px_0_0]" : " rounded-full")}>
                    <div class="w-16 h-full flex items-center justify-center shrink-0">
                        <SearchIcon />
                    </div>
                    {/**@ts-ignore */}
                    <input ref={search} autoFocus={true} onKeyUp={handleSearch} onChange={handleSuggestions} class="bg-transparent w-full h-full outline-none text-textInverse" spellcheck={false} autocomplete="off" data-enable-grammarly="false" />
                    <button onClick={clearSearch} class="w-16 h-full flex items-center justify-center shrink-0" style={{ display: searchHasValue ? "flex" : "none" }}>
                        <CloseIcon />
                    </button>
                </div>
                <div class={"bg-secondary rounded-[0_0_28px_28px] w-[600px]" + (!suggestions.length ? " hidden" : "")}>
                    {suggestions.map((suggestion: string) => (
                        <div onClick={() => clickSuggestion(suggestion)} class="h-14 flex items-center cursor-pointer px-4 select-none text-textInverse" key={suggestion}><Obfuscated>{suggestion}</Obfuscated></div>
                    ))}
                </div>
            </div>
        </>
    )
}

export { Home };