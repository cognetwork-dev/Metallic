import { Head } from "../components/head";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "preact/hooks";
import { Web, setWeb } from "../components/web";
import { useGlobalState } from "@ekwoka/preact-global-state";
import { encodeURL } from "../util/searchURL";
import { gamesCdn } from "../settings";
import { SearchIcon } from "../assets/searchIcon";
import { CloseIcon } from "../assets/closeIcon";
import apps from "../assets/games.json";

function Games() {
    const { t } = useTranslation();
    const [service] = useGlobalState<string>("service", localStorage.getItem("metallic/service") || "ultraviolet");
    const [webOpen, setWebOpen] = useState(false);
    const search = useRef<HTMLInputElement>();
    const [searchValue, setSearchValue] = useState("");
    const [searchHasValue, setSearchHasValue] = useState(false);
    const scrollBuffer = 250;
    const resultsIncrease = 20;
    const [resultsNumber, setResultsNumber] = useState(resultsIncrease);

    async function openApp(url: string) {
        setWeb(await encodeURL(new URL(url, gamesCdn).toString(), service), webOpen, setWebOpen)
    }

    const handleChange = async (e: any) => {
        setSearchHasValue(e.target.value !== "");
    }

    function clearSearch() {
        if (search && search.current) {
            search.current.value = "";
            setSearchValue("");
            setSearchHasValue(false);
            search.current.focus();
        }
    }

    const handleSearch = async (e: any) => {
        setSearchValue(e.target.value.toLowerCase().trim())
    }

    const appsSearched = apps.filter((app: any) => {
        if (!searchValue) {
            return app;
        } else {
            return app.name.toLowerCase().trim().includes(searchValue);
        }
    });

    const appsTrimmed = appsSearched.slice(0, Math.min(resultsNumber, appsSearched.length));

    window.addEventListener("scroll", function () {
        if (document.body.scrollHeight <= (window.scrollY + window.innerHeight) + scrollBuffer) {
            if (resultsNumber !== appsSearched.length) {
                setResultsNumber((old: number) => Math.min(old + resultsIncrease, appsSearched.length))
            }
        }
    })
    return (
        <>
            <Head pageTitle={t("title.games")} />
            <Web open={webOpen} setOpen={setWebOpen} />
            <div class="flex flex-col items-center justify-center mb-8">
                <div class="bg-secondary w-[600px] h-14 flex items-center justify-center rounded-lg">
                    <div class="w-16 h-full flex items-center justify-center shrink-0">
                        <SearchIcon />
                    </div>
                    {/**@ts-ignore */}
                    <input ref={search} autoFocus={true} placeholder="Search games" onKeyUp={handleSearch} onChange={handleChange} class="bg-transparent w-full h-full outline-none text-textInverse" spellcheck={false} autocomplete="off" data-enable-grammarly="false" />
                    <button onClick={clearSearch} class="w-16 h-full flex items-center justify-center shrink-0" style={{ display: searchHasValue ? "flex" : "none" }}>
                        <CloseIcon />
                    </button>
                </div>
            </div>
            <p class={"text-center" + (!appsTrimmed.length ? "" : " hidden")}>No results found.</p>
            <div
                class="grid justify-evenly gap-8 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(auto,16rem))]"
            >
                {appsTrimmed.map((app: any) => (
                    <button
                        onClick={async () => await openApp(app.url)}
                        class="rounded-3xl h-72 bg-secondary flex flex-col p-4 cursor-pointer w-full sm:w-64 text-left"
                    >
                        <div
                            class="h-36 w-full bg-background rounded-xl flex items-center justify-center overflow-hidden select-none"
                        >
                            <img
                                src={app.icon}
                                draggable={false}
                                loading="lazy"
                                alt={app.name}
                                class="h-full w-full object-cover"
                            />
                        </div>
                        <div class="whitespace-nowrap overflow-hidden text-lg font-bold mt-3 text-ellipsis">
                            {app.name}
                        </div>
                        <div class="text-base whitespace-nowrap overflow-hidden text-ellipsis">
                            {app.author}
                        </div>
                        <div
                            class="mt-2 text-base overflow-hidden text-ellipsis"
                            style="display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;"
                        >
                            {app.description}
                        </div>
                    </button>
                ))}
            </div>
        </>
    )
}

export { Games };