import { useEffect } from "preact/hooks";
import { useGlobalState } from "@ekwoka/preact-global-state";

function Head({ title }: HeadTypes) {
    const [theme, setTheme] = useGlobalState<string>("theme", localStorage.getItem("metallic/theme") || "default");

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

    return (
        <></>
    )
}

export { Head };