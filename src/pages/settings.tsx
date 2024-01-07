import { Head } from "../components/head";
import { useGlobalState } from "@ekwoka/preact-global-state";
import { SquareButton } from "../interface/button";
import themes from "../themes.json"

function Settings() {
    const [, setTheme] = useGlobalState<string>("theme", localStorage.getItem("metallic/theme") || "default");

    return (
        <>
            <Head title="Settings" />
            <section class="py-5 flex items-center gap-3">
                {themes.map((theme) => (
                    <SquareButton onClick={() => setTheme(theme.id)}>
                        <span class="font-bold text-textInverse">{theme.name}</span>
                    </SquareButton>
                ))}
            </section>
        </>
    )
}

export { Settings };