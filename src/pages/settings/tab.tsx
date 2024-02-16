import { useTranslation } from "react-i18next";
import { useGlobalState } from "@ekwoka/preact-global-state";
import { RoundButton } from "../../interface/button";
import { SquareInput } from "../../interface/input";
import { CloseIcon } from "../../assets/closeIcon";
import { GoogleLogo } from "../../assets/searchEngines/googleLogo";
import wikipediaLogo from "../../assets/cloakingIcons/wikipedia.ico";
import canvasLogo from "../../assets/cloakingIcons/canvas.ico";
import googleClassroomLogo from "../../assets/cloakingIcons/googleclassroom.png";
import khanAcademyLogo from "../../assets/cloakingIcons/khanacademy.ico";
import googleDriveLogo from "../../assets/cloakingIcons/googledrive.png";
import edpuzzleLogo from "../../assets/cloakingIcons/edpuzzle.png";
import { Obfuscated } from "../../util/obfuscate";

function TabSettings() {
    const { t } = useTranslation();
    const [title, setTitle] = useGlobalState<string>("title", localStorage.getItem("metallic/title") || "");
    const [icon, setIcon] = useGlobalState<string>("icon", localStorage.getItem("metallic/icon") || "");

    function setPreset(title: string, icon: string) {
        setTitle(title);
        setIcon(icon)
    }

    function resetTab() {
        setPreset("", "")
    }

    return (
        <>
            <h1 class="text-4xl font-bold mb-8"><Obfuscated>{t("settings.tab.tabMask.title")}</Obfuscated></h1>
            <section class="flex flex-wrap items-center gap-3">
                <RoundButton active={title == "" && icon == ""} onClick={() => resetTab()}>
                    <CloseIcon />
                </RoundButton>
                <RoundButton active={title == "Google" && icon == "https://www.google.com/favicon.ico"} onClick={() => setPreset("Google", "https://www.google.com/favicon.ico")}>
                    <GoogleLogo />
                </RoundButton>
                <RoundButton active={title == "Wikipedia" && icon == "https://www.wikipedia.org/static/favicon/wikipedia.ico"} onClick={() => setPreset("Wikipedia", "https://www.wikipedia.org/static/favicon/wikipedia.ico")}>
                    <img draggable={false} height="24" width="24" src={wikipediaLogo} loading="lazy" />
                </RoundButton>
                <RoundButton active={title == "Canvas" && icon == "https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico"} onClick={() => setPreset("Canvas", "https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico")}>
                    <img draggable={false} height="24" width="24" src={canvasLogo} loading="lazy" />
                </RoundButton>
                <RoundButton active={title == "Google Classroom" && icon == "https://ssl.gstatic.com/classroom/ic_product_classroom_144.png"} onClick={() => setPreset("Google Classroom", "https://ssl.gstatic.com/classroom/ic_product_classroom_144.png")}>
                    <img draggable={false} height="24" width="24" src={googleClassroomLogo} loading="lazy" />
                </RoundButton>
                <RoundButton active={title == "Khan Academy" && icon == "https://www.khanacademy.org/favicon.ico"} onClick={() => setPreset("Khan Academy", "https://www.khanacademy.org/favicon.ico")}>
                    <img draggable={false} height="24" width="24" src={khanAcademyLogo} loading="lazy" />
                </RoundButton>
                <RoundButton active={title == "Google Drive" && icon == "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"} onClick={() => setPreset("Google Drive", "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png")}>
                    <img draggable={false} height="24" width="24" src={googleDriveLogo} loading="lazy" />
                </RoundButton>
                <RoundButton active={title == "Edpuzzle" && icon == "https://edpuzzle.imgix.net/favicons/favicon-32.png"} onClick={() => setPreset("Edpuzzle", "https://edpuzzle.imgix.net/favicons/favicon-32.png")}>
                    <img draggable={false} height="24" width="24" src={edpuzzleLogo} loading="lazy" />
                </RoundButton>
            </section>
            <h1 class="text-4xl font-bold my-8"><Obfuscated>{t("settings.tab.customTabMask.title")}</Obfuscated></h1>
            <section class="flex flex-wrap items-center gap-3">
                <SquareInput placeholder={t("settings.tab.customTabMask.titleInput")} value={title} onInput={(e: any) => setTitle(e.target.value)} />
                <SquareInput placeholder={t("settings.tab.customTabMask.iconInput")} value={icon} onInput={(e: any) => setIcon(e.target.value)} />
            </section>
        </>
    )
}

export { TabSettings };