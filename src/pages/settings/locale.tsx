import { SquareButton } from "../../interface/button";
import { useGlobalState } from "@ekwoka/preact-global-state";
import { seti18Locale } from "../../util/locale";

function LocaleSettings() {
    const [locale, setLocale] = useGlobalState<string>("locale", localStorage.getItem("metallic/locale") || "en");

    function setNewLocale(locale: string) {
        localStorage.setItem("metallic/locale", locale)
        seti18Locale(locale);
        setLocale(locale);
    }

    return (
        <>
            <h1 class="text-4xl font-bold mb-8">Locale</h1>
            <section class="flex flex-wrap items-center gap-3">
                <SquareButton active={locale == "en"} onClick={() => setNewLocale("en")}>
                    <span class="font-bold">English</span>
                </SquareButton>
                <SquareButton active={locale == "es"} onClick={() => setNewLocale("es")}>
                    <span class="font-bold">Español</span>
                </SquareButton>
            </section>
        </>
    )
}

export { LocaleSettings };