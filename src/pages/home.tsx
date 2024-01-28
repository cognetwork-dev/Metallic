import { useState, useEffect, useRef } from "preact/hooks";
import { useGlobalState } from "@ekwoka/preact-global-state";
import { Head } from "../components/head";
import { Web, searchWeb } from "../components/web";
import { SearchIcon } from "../assets/searchIcon";
import { geSearchEngine } from "../util/getSearchEngine";
import { CloseIcon } from "../assets/closeIcon";

function Home() {
    const [service] = useGlobalState<string>("service", localStorage.getItem("metallic/service") || "ultraviolet");
    const [theme] = useGlobalState<string>("theme", localStorage.getItem("metallic/theme") || "default");
    const [searchEngine] = useGlobalState<string>("engine", localStorage.getItem("metallic/engine") || "google");
    const [webOpen, setWebOpen] = useState(false);
    const search = useRef<HTMLInputElement>();
    const [searchHasValue, setSearchHasValue] = useState(false);

    function clearInput() {
        if (search && search.current) {
            if (!search.current.value) {
                setSearchHasValue(false);
            }
        }
    }

    useEffect(() => {
        if (search && search.current) {
            search.current.focus();
        }
    }, [location.pathname])
    
    const handleSearch = async (e: any) => {
        setSearchHasValue(e.target.value !== "");

        if (e.key == "Enter") {
            if (e.target.value) {
                await searchWeb(e.target.value, service, geSearchEngine(searchEngine), webOpen, setWebOpen, e.target, clearInput);
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

    return (
        <>
            <Head />
            <Web open={webOpen} setOpen={setWebOpen} />
            {theme == "hub" ? (
                <h1 class="title mt-32 mb-8 sm:mb-16 flex items-center justify-center">
                    <span class="text-4xl sm:text-6xl font-bold text-center font-title">Metal</span>
                    <span class="text-4xl sm:text-6xl font-bold text-center font-title bg-secondary rounded p-1 ml-1 text-textInverse">lic</span>
                </h1>
            ) : (
                <h1 class="title text-4xl sm:text-6xl font-bold text-center mt-32 mb-8 sm:mb-16 font-title">Metallic</h1>
            )}
            <div class="flex justify-center">
                <div class="bg-secondary rounded-full w-[600px] h-14 flex items-center justify-center">
                    <div class="w-16 h-full flex items-center justify-center shrink-0">
                        <SearchIcon />
                    </div>
                    {/**@ts-ignore */}
                    <input ref={search} autoFocus={true} onKeyUp={handleSearch} class="bg-transparent w-full h-full outline-none text-textInverse" spellcheck={false} autocomplete="off" data-enable-grammarly="false" />
                    <button onClick={clearSearch} class="w-16 h-full flex items-center justify-center shrink-0" style={{display: searchHasValue ? "flex" : "none"}}>
                        <CloseIcon />
                    </button>
                </div>
            </div>
        </>
    )
}

export { Home };