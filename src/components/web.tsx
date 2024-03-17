import { useEffect, useState } from "preact/hooks";
import { useRef } from "preact/hooks";
import { searchURL } from "../util/searchURL";
import { RoundButton } from "../interface/button";
import { CloseIcon } from "../assets/closeIcon";
import { RefreshIcon } from "../assets/refreshIcon";
import { FullscreenIcon } from "../assets/fullscreenIcon";
import { GlobeIcon } from "../assets/globeIcon";

let web: any = null;
let search: any = null;
let clearInput: any = null;

function Web({ open, setOpen }: WebTypes) {
    const webRef = useRef<HTMLIFrameElement>(null);
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");

    function updateMeta() {
        if (web && web.current) {
            setTitle(web.current.contentWindow.document.title || web.current.contentWindow.location.toString());
            setIcon(web.current.contentWindow.document.querySelector("link[rel*='icon']")?.href || web.current.contentWindow.document.querySelector("link[rel='shortcut icon']")?.href || "");
        } 
    }

    useEffect(() => {
        web = webRef;
    }, [])

    useEffect(() => {
        document.body.dataset.webOpen = open
    }, [open])

    function refreshWeb() {
        if (web && web.current) {
            if (open) {
                try {
                    web.current.contentWindow.location.reload()
                } catch {
                    web.current.src += ""
                }
            }
        }
    }

    function fullscreenWeb() {
        if (web && web.current) {
            if (open) {
                web.current.requestFullscreen()
            }
        }
    }

    function closeWeb() {
        if (open) {
            web.current.src = "";
            if (search) {
                search.value = "";
            }
            if (clearInput) {
                clearInput();
            }
            setOpen(false);
            if (search) {
                search.focus();
            }
        }
    }

    return (
        <>
            <header class="webHeader fixed top-0 right-0 left-0 z-100 px-7 py-5 flex items-center justify-between bg-background not-web-open-hidden">
                <div class="flex gap-4 overflow-hidden whitespace-pre mr-7">
                    {icon ? (
                        <img draggable={false} height="24" width="24" src={icon} loading="lazy" />
                    ) : (
                        <GlobeIcon />
                    )}
                    <div class="overflow-hidden text-ellipsis">{title}</div>
                </div>
                <div class="flex gap-4">
                    <RoundButton onclick={fullscreenWeb} active={true}>
                        <FullscreenIcon />
                    </RoundButton>
                    <RoundButton onclick={refreshWeb} active={true}>
                        <RefreshIcon />
                    </RoundButton>
                    <RoundButton onClick={closeWeb} active={true}>
                        <CloseIcon />
                    </RoundButton>
                </div>
            </header>
            <iframe ref={webRef} onLoad={updateMeta} class="web fixed top-20 left-0 right-0 bottom-0 border-0 bg-background w-full h-full select-none z-100 not-web-open-hidden"></iframe>
        </>
    )
}

async function searchWeb(input: string, service: string, searchEngine: string, open: boolean, setOpen: any, searchRef: any, clearInputFunction: any) {
    if (!open) {
        setOpen(true)
        if (web && web.current) {
            web.current.src = await searchURL(input, service, searchEngine)
            web.current.focus()
            search = searchRef;
            clearInput = clearInputFunction
        }
    }
}

async function setWeb(url: string, open: boolean, setOpen: any) {
    if (!open) {
        setOpen(true)
        if (web && web.current) {
            web.current.src = url;
            web.current.focus()
        }
    }
}

export { Web, searchWeb, setWeb };