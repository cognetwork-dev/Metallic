import { useTranslation } from "react-i18next";
import { SquareButton } from "../../interface/button";
import { useGlobalState } from "@ekwoka/preact-global-state";
import { seti18Locale } from "../../util/locale";

function LocaleSettings() {
    const { t } = useTranslation();
    const [locale, setLocale] = useGlobalState<string>("locale", localStorage.getItem("metallic/locale") || "en");

    function setNewLocale(locale: string) {
        localStorage.setItem("metallic/locale", locale)
        seti18Locale(locale);
        setLocale(locale);
    }

    return (
        <>
            <h1 class="text-4xl font-bold mb-8">{t("settings.locale.locale.title")}</h1>
            <section class="flex flex-wrap items-center gap-3">
                <SquareButton active={locale == "en"} onClick={() => setNewLocale("en")}>
                    <span class="font-bold">English</span>
                </SquareButton>
                <SquareButton active={locale == "es"} onClick={() => setNewLocale("es")}>
                    <span class="font-bold">Español</span>
                </SquareButton>
                <SquareButton active={locale == "fr"} onClick={() => setNewLocale("fr")}>
                    <span class="font-bold">Français</span>
                </SquareButton>
                <SquareButton active={locale == "nl"} onClick={() => setNewLocale("nl")}>
                    <span class="font-bold">Nederlands</span>
                </SquareButton>
                <SquareButton active={locale == "de"} onClick={() => setNewLocale("de")}>
                    <span class="font-bold">Deutsch</span>
                </SquareButton>
                <SquareButton active={locale == "ar"} onClick={() => setNewLocale("ar")}>
                    <span class="font-bold">العربية</span>
                </SquareButton>
                <SquareButton active={locale == "zh"} onClick={() => setNewLocale("zh")}>
                    <span class="font-bold">中文</span>
                </SquareButton>
                <SquareButton active={locale == "hi"} onClick={() => setNewLocale("hi")}>
                    <span class="font-bold">हिंदी</span>
                </SquareButton>
            </section>
        </>
    )
}

export { LocaleSettings };