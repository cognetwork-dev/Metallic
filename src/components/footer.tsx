import { github, discord } from "../settings";
import { Obfuscated } from "../util/obfuscate";

function Footer() {
    return (
        <footer class="footer px-7 mt-auto mb-5 select-none flex items-center justify-between">
            <div>
                <Obfuscated>© Metallic 2022</Obfuscated> - {new Date().getFullYear()}
            </div>
            <div class="flex items-center justify-center gap-1.5">
                <a class="hover:underline" href={github}><Obfuscated>GitHub</Obfuscated></a>
                <span>/</span>
                <a class="hover:underline" href={discord}><Obfuscated>Discord</Obfuscated></a>
                <span>/</span>
                <a class="hover:underline" href="/privacy">Privacy</a>
            </div>
        </footer>
    )
}

export { Footer };