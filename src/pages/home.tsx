import { useState } from "preact/hooks";
import { Head } from "../components/head";
import { Web, searchWeb } from "../components/web";
import { SearchIcon } from "../assets/searchIcon"

function Home() {
    const [webOpen, setWebOpen] = useState(false);
    //Preact bug making me do this
    let web: any = null;

    function setWeb(newWeb: any) {
        web = newWeb
    }

    const handleSearch = async (e: any) => {
        if (e.key == "Enter") {
            if (e.target.value) {
                searchWeb(e.target.value, web, webOpen, setWebOpen)
            }
        }
    }

    return (
        <>
            <Head />
            <Web open={webOpen} setOpen={setWebOpen} web={web} setWeb={setWeb} />
            <h1 class="text-4xl sm:text-6xl font-bold text-center mt-32 mb-8 sm:mb-16 font-title">Metallic</h1>
            <div class="flex justify-center">
                <div class="bg-secondary pr-4 rounded-full w-[600px] h-14 flex items-center justify-center">
                    <div class="w-16 h-full flex items-center justify-center">
                        <SearchIcon />
                    </div>
                    <input onKeyUp={handleSearch} class="bg-transparent w-full h-full outline-none" spellcheck={false} autocomplete="off" data-enable-grammarly="false" />
                </div>
            </div>
        </>
    )
}

export { Home };