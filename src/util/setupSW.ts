//@ts-ignore
import { SetTransport } from "@mercuryworkshop/bare-mux";

let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
SetTransport("EpxMod.EpoxyClient", { wisp: wispUrl });

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js", {
        scope: "/"
    });
}