import { useGlobalState } from "@ekwoka/preact-global-state";
import { SquareButton } from "../../interface/button";
import themes from "../../themes.json"

function AppearanceSettings() {
    const [theme, setTheme] = useGlobalState<string>("theme", localStorage.getItem("metallic/theme") || "default");

    return (
        <>
            <h1 class="text-4xl font-bold mb-8">Themes</h1>
            <section class="flex flex-wrap items-center gap-3">
                {themes.map((themeItem: any) => (
                    <SquareButton active={theme == themeItem.id} onClick={() => setTheme(themeItem.id)}>
                        <div class="w-4 h-4 rounded-full" style={{ background: themeItem.theme.primary }}></div>
                        <span class="font-bold">{themeItem.name}</span>
                    </SquareButton>
                ))}
            </section>
        </>
    )

}

export { AppearanceSettings };