import { Head } from "../components/head";
import { useTranslation } from "react-i18next";
import { privacyPolicyUpdated } from "../settings";
import { EmailBase64 } from "hidden-from-bots-react";
function Privacy() {
    const { t } = useTranslation();

    return (
        <>
            <Head pageTitle={t("title.privacy")} />
            <section class="flex flex-col items-center mt-7">
                <h1 class="text-4xl font-bold mb-8">{t("privacy.title")}</h1>
                <p>{t("privacy.updated", { updated: new Date(privacyPolicyUpdated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) })}</p>
            </section>
            <section class="flex flex-col px-16">
                <h2 class="font-bold mb-4">{t("privacy.policy.consent.title")}</h2>
                <p>{t("privacy.policy.consent.text", { host: window.location.host })}</p>
                <h2 class="font-bold my-4">{t("privacy.policy.information.title")}</h2>
                <p>{t("privacy.policy.information.text")}</p>
                <h2 class="font-bold my-4">{t("privacy.policy.children.title")}</h2>
                <p>{t("privacy.policy.children.text")}</p>
                <h2 class="font-bold my-4">{t("privacy.policy.cookies.title")}</h2>
                <p>{t("privacy.policy.cookies.text")}</p>
                <h2 class="font-bold my-4">{t("privacy.policy.changes.title")}</h2>
                <p>{t("privacy.policy.changes.text")}</p>
                <h2 class="font-bold my-4">{t("privacy.policy.acceptance.title")}</h2>
                <p>{t("privacy.policy.acceptance.text")}</p>
                <h2 class="font-bold my-4">{t("privacy.policy.contact.title")}</h2>
                <p>{t("privacy.policy.contact.text")} <EmailBase64 className="inline hover:underline" email="bmViZWx1bmdAbWFpbGZlbmNlLmNvbQ==">here.</EmailBase64></p>
            </section>
        </>
    )
}

export { Privacy };