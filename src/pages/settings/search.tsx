import { SquareButton } from "../../interface/button";
import ultravioletLogo from "../../assets/ultravioletLogo.png";
import dynamicLogo from "../../assets/dynamicLogo.png";
import rammerheadLogo from "../../assets/rammerheadLogo.png";
import { StompLogo } from "../../assets/stompLogo";

function SearchSettings() {

    //Temp
    function setService(service: string) {
        return service;
    }

    return (
        <>
            <h1 class="text-4xl font-bold mb-8">Proxy</h1>
            <section class="flex flex-wrap items-center gap-3">
                <SquareButton onClick={() => setService("ultraviolet")}>
                    <img height="24" width="24" src={ultravioletLogo} loading="lazy" />
                    <span class="font-bold text-textInverse">Ultraviolet</span>
                </SquareButton>
                <SquareButton onClick={() => setService("dynamic")}>
                <img height="24" width="24" src={dynamicLogo} loading="lazy" />
                    <span class="font-bold text-textInverse">Dynamic</span>
                </SquareButton>
                <SquareButton onClick={() => setService("rammerhead")}>
                    <img height="24" width="24" src={rammerheadLogo} loading="lazy" />
                    <span class="font-bold text-textInverse">Rammerhead</span>
                </SquareButton>
                <SquareButton onClick={() => setService("stomp")}>
                    <StompLogo />
                    <span class="font-bold text-textInverse">Stomp</span>
                </SquareButton>
            </section>
        </>
    )
}

export { SearchSettings };