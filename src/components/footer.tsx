import { github, discord } from "../settings";

function Footer() {
    return (
        <footer class="footer px-7 mt-auto mb-5 select-none flex items-center justify-between">
            <div>
                © Metallic 2022 - {new Date().getFullYear()}
            </div>
            <div class="flex items-center justify-center gap-1.5">
                <a class="hover:underline" href={github}>GitHub</a>
                <span>/</span>
                <a class="hover:underline" href={discord}>Discord</a>
            </div>
        </footer>
    )
}

export { Footer };