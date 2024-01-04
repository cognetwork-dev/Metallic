import { Head } from "../components/head";
import { SearchIcon } from "../assets/searchIcon"

function Home() {
    return (
        <>
            <Head />
            <h1 class="text-4xl sm:text-6xl font-bold text-center mt-32 mb-8 sm:mb-16 font-title">Metallic</h1>
            <div class="flex justify-center">
                <div class="bg-secondary pr-4 rounded-full w-[600px] h-14 flex items-center justify-center">
                    <div class="w-16 h-full flex items-center justify-center">
                        <SearchIcon />
                    </div>
                    <input class="bg-transparent w-full h-full outline-none" spellcheck={false} autocomplete="off" data-enable-grammarly="false" />
                </div>
            </div>
        </>
    )
}

export { Home };