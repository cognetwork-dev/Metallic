import { Head } from "../components/head";
import { useTranslation } from "react-i18next";

function Error() {
    const { t } = useTranslation();

    return (
        <>
            <Head pageTitle={t("title.notFound")} />
            <section class="flex flex-col items-center mt-32">
                <h1 class="text-4xl font-bold mb-8">{t("404.title")}</h1>
                <p>{t("404.text")}</p>
            </section>
        </>
    )
}

export { Error };