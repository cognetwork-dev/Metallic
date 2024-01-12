import { useGlobalState } from "@ekwoka/preact-global-state";
import { SquareButton } from "../../interface/button";
import themes from "../../themes.json"

function AppearanceSearch() {
    const [, setTheme] = useGlobalState<string>("theme", localStorage.getItem("metallic/theme") || "default");

    return (
        <>
            <h1 class="text-4xl font-bold mb-8">Themes</h1>
            <section class="flex flex-wrap items-center gap-3">
                {themes.map((theme: any) => (
                    <SquareButton onClick={() => setTheme(theme.id)}>
                        <span class="font-bold text-textInverse">{theme.name}</span>
                    </SquareButton>
                ))}
            </section>
        </>
    )

}

export { AppearanceSearch };