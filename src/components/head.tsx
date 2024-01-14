import { useEffect } from "preact/hooks";
import { useGlobalState } from "@ekwoka/preact-global-state";

function Head({ title }: HeadTypes) {
    const [theme, setTheme] = useGlobalState<string>("theme", localStorage.getItem("metallic/theme") || "default");
    const [service, setService] = useGlobalState<string>("service", localStorage.getItem("metallic/service") || "ultraviolet");

    useEffect(() => {
        if (title) {
            window.document.title = title + " | Metallic";
        } else {
            window.document.title = "Metallic";
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

    return (
        <></>
    )
}

export { Head };