import { useEffect, useState } from "react";

interface YMapsApi {
    ready: (callback: () => void) => void;
}

declare global {
    interface Window {
        ymaps?: YMapsApi;
    }
}

export const useYmaps = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_YMAPS_API_KEY; // <- локально в useEffect

        if (window.ymaps) {
            window.ymaps.ready(() => setIsLoaded(true));
            return;
        }

        const scriptId = "ymaps-script";
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        if (!script) {
            script = document.createElement("script");
            script.id = scriptId;
            script.src = `https://api-maps.yandex.ru/2.1/?lang=en_US${apiKey ? `&apikey=${apiKey}` : ""}`;
            script.async = true;
            script.type = "text/javascript";
            document.body.appendChild(script);
        }

        const handleLoad = () => {
            if (window.ymaps) {
                window.ymaps.ready(() => setIsLoaded(true));
            }
        };

        script.addEventListener("load", handleLoad);

        return () => {
            script.removeEventListener("load", handleLoad);
        };
    }, []);

    return isLoaded;
};
