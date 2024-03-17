import { Head } from "../components/head";
import { useTranslation } from "react-i18next";
import { useState } from "preact/hooks";
import { Web, setWeb } from "../components/web";
import { useGlobalState } from "@ekwoka/preact-global-state";
import { encodeURL } from "../util/searchURL";
import apps from "../assets/apps.json";

function Apps() {
    const { t } = useTranslation();
    const [service] = useGlobalState<string>("service", localStorage.getItem("metallic/service") || "ultraviolet");
    const [webOpen, setWebOpen] = useState(false);

    async function openApp(url: string) {
        setWeb(await encodeURL(url, service), webOpen, setWebOpen)
    }

    return (
        <>
            <Head pageTitle={t("title.apps")} />
            <Web open={webOpen} setOpen={setWebOpen} />
            <div
                class="grid justify-evenly gap-8 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(auto,16rem))]"
            >
                {apps.map((app: any) => (
                    <button
                        onClick={async() => await openApp(app.url)}
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
                        <div class="overflow-hidden text-lg font-bold mt-3 text-ellipsis">
                            {app.name}
                        </div>
                        <div class="text-base overflow-hidden text-ellipsis">
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

export { Apps };