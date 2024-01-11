import { useEffect } from "preact/hooks";
import { useRef } from "preact/hooks";
import { searchURL } from "../util/searchURL";
import { RoundButton } from "../interface/button";
import { CloseIcon } from "../assets/closeIcon";
import { RefreshIcon } from "../assets/refreshIcon";
import { FullscreenIcon } from "../assets/fullscreenIcon";

function Web({ open, setOpen, web, setWeb }: WebTypes) {
    const webRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        setWeb(webRef);
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
            setOpen(false);
        }
    }

    return (
        <>
            <header class="webHeader fixed top-0 right-0 left-0 z-100 px-7 py-5 flex items-center justify-between bg-background hidden">
                <div>
                    {/**Title and Icon */}
                </div>
                <div class="flex gap-4">
                    <RoundButton onClick={closeWeb}>
                        <CloseIcon />
                    </RoundButton>
                    <RoundButton onclick={refreshWeb}>
                        <RefreshIcon />
                    </RoundButton>
                    <RoundButton onclick={fullscreenWeb}>
                        <FullscreenIcon />
                    </RoundButton>
                </div>
            </header>
            <iframe ref={webRef} class="web fixed top-20 left-0 right-0 bottom-0 border-0 bg-background w-full h-full select-none z-100 hidden"></iframe>
        </>
    )
}

function searchWeb(input: string, web: any, open: boolean, setOpen: any) {
    if (!open) {
        setOpen(true)
        if (web && web.current) {
            //Broken
            web.current.src = searchURL(input, "https://www.google.com/search?q=%s")
            web.current.focus()
        }
    }
}

export { Web, searchWeb };