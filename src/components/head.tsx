import { useEffect } from "preact/hooks";
import { useGlobalState } from "@ekwoka/preact-global-state";
import { seti18Locale } from "../util/locale";
import searchEngineData from "../assets/searchEngineData.json";

function Head({ pageTitle }: HeadTypes) {
    const [theme, setTheme] = useGlobalState<string>("theme", localStorage.getItem("metallic/theme") || "default");
    const [service, setService] = useGlobalState<string>("service", localStorage.getItem("metallic/service") || "ultraviolet");
    const [searchEngine, setSearchEngine] = useGlobalState<string>("engine", localStorage.getItem("metallic/engine") || searchEngineData.google);
    const [title, setTitle] = useGlobalState<string>("title", localStorage.getItem("metallic/title") || "");
    const [icon, setIcon] = useGlobalState<string>("icon", localStorage.getItem("metallic/icon") || "");
    const [locale, setLocale] = useGlobalState<string>("locale", localStorage.getItem("metallic/locale") || "en");
    const [openUsing, setOpenUsing] = useGlobalState<string>("open", localStorage.getItem("metallic/open") || "default");

    useEffect(() => {
        if (title) {
            window.document.title = title;
        } else {
            if (pageTitle) {
                window.document.title = pageTitle + " | Metallic";
            } else {
                window.document.title = "Metallic";
            }
        }
    }, [title, locale])

    useEffect(() => {
        const iconElement = document.querySelector("link[rel='icon']")

        if (iconElement) {
            if (icon) {
                iconElement.setAttribute("href", icon);
            } else {
                iconElement.setAttribute("href", "/assets/logo.svg");
            }
        }
    }, [icon])

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
    }, [searchEngine]);

    useEffect(() => {
        const titleChannel = new BroadcastChannel("metallic/title");

        titleChannel.onmessage = (e) => {
            setTitle(String(e.data))
        }

        localStorage.setItem("metallic/title", title);
        titleChannel.postMessage(title)
    }, [title]);

    useEffect(() => {
        const iconChannel = new BroadcastChannel("metallic/icon");

        iconChannel.onmessage = (e) => {
            setIcon(String(e.data))
        }

        localStorage.setItem("metallic/icon", icon);
        iconChannel.postMessage(icon)
    }, [icon]);

    useEffect(() => {
        const localeChannel = new BroadcastChannel("metallic/locale");

        localeChannel.onmessage = (e) => {
            setLocale(String(e.data))
            seti18Locale(e.data);
        }

        localStorage.setItem("metallic/locale", locale);
        localeChannel.postMessage(locale)
    }, [locale]);

    useEffect(() => {
        const openChannel = new BroadcastChannel("metallic/open");

        openChannel.onmessage = (e) => {
            setOpenUsing(String(e.data))
        }

        localStorage.setItem("metallic/open", openUsing);
        openChannel.postMessage(openUsing)
    }, [openUsing]);

    return (
        <></>
    )
}

export { Head };