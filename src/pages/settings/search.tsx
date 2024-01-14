import { useGlobalState } from "@ekwoka/preact-global-state";
import { SquareButton } from "../../interface/button";
import ultravioletLogo from "../../assets/ultravioletLogo.png";
import dynamicLogo from "../../assets/dynamicLogo.png";
import rammerheadLogo from "../../assets/rammerheadLogo.png";
import { StompLogo } from "../../assets/stompLogo";

function SearchSettings() {
    const [service, setService] = useGlobalState<string>("service", localStorage.getItem("metallic/service") || "ultraviolet");

    return (
        <>
            <h1 class="text-4xl font-bold mb-8">Proxy</h1>
            <section class="flex flex-wrap items-center gap-3">
                <SquareButton active={service == "ultraviolet"} onClick={() => setService("ultraviolet")}>
                    <img height="24" width="24" src={ultravioletLogo} loading="lazy" />
                    <span class="font-bold">Ultraviolet</span>
                </SquareButton>
                <SquareButton active={service == "dynamic"} onClick={() => setService("dynamic")}>
                    <img height="24" width="24" src={dynamicLogo} loading="lazy" />
                    <span class="font-bold">Dynamic</span>
                </SquareButton>
                <SquareButton active={service == "rammerhead"} onClick={() => setService("rammerhead")}>
                    <img height="24" width="24" src={rammerheadLogo} loading="lazy" />
                    <span class="font-bold">Rammerhead</span>
                </SquareButton>
                <SquareButton active={service == "stomp"} onClick={() => setService("stomp")}>
                    <StompLogo />
                    <span class="font-bold">Stomp</span>
                </SquareButton>
            </section>
        </>
    )
}

export { SearchSettings };