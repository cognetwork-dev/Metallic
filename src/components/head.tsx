import { useEffect } from "preact/hooks";
import { useGlobalState } from "@ekwoka/preact-global-state";

function Head({ title }: HeadTypes) {
    const [theme, setTheme] = useGlobalState<string>("theme", localStorage.getItem("metallic/theme") || "default");
    const [service, setService] = useGlobalState<string>("service", localStorage.getItem("metallic/service") || "ultraviolet");
    const [searchEngine, setSearchEngine] = useGlobalState<string>("engine", localStorage.getItem("metallic/engine") || "google");

    useEffect(() => {
        if (title) {
            window.document.title = title + " | Metallic";
        } else {
            window.document.title = "Metallic";
        }
    }, [])

    useEffect(() => {
        const iconElement = document.querySelector("link[rel='icon']")

        if (iconElement) {
            iconElement.setAttribute("href", "/assets/logo.svg");
        }
    }, [])

    useEffect(() => {
        const themeChannel = new BroadcastChannel("metallic/theme");

        themeChannel.onmessage = (e) => {
            setTheme(String(e.data))
        }

        localStorage.setItem("metallic/theme", theme);
        window.document.body.dataset.theme = theme;
        themeChannel.postMessage(theme)
    }, [theme])

    useEffect(() => {
        const serviceChannel = new BroadcastChannel("metallic/service");

        serviceChannel.onmessage = (e) => {
            setService(String(e.data))
        }

        localStorage.setItem("metallic/service", service);
        serviceChannel.postMessage(service)
    }, [service])

    useEffect(() => {
        const engineChannel = new BroadcastChannel("metallic/engine");

        engineChannel.onmessage = (e) => {
            setSearchEngine(String(e.data))
        }

        localStorage.setItem("metallic/engine", searchEngine);
        engineChannel.postMessage(searchEngine)
    }, [searchEngine])

    return (
        <></>
    )
}

export { Head };