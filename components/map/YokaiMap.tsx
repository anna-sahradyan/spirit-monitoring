"use client";

import {useEffect, useRef} from "react";
import {Yokai} from "@/types/yokai.schema";
import {useYmaps} from "@/features/yokai/hooks/useYmaps";


// --- 1. Описываем типы для Яндекс.Карт ---

// Интерфейс для инстанса Карты
interface YMapInstance {
    geoObjects: {
        add: (object: unknown) => void;
        removeAll: () => void;
    };
    destroy: () => void;
}

// Интерфейс для Кластеризатора
interface YClustererInstance {
    removeAll: () => void;
    add: (objects: unknown[]) => void;
}

// Интерфейс для глобального объекта ymaps
interface YMapsApi {
    Map: new (element: HTMLElement, options: Record<string, unknown>) => YMapInstance;
    Clusterer: new (options: Record<string, unknown>) => YClustererInstance;
    Placemark: new (
        geometry: number[],
        properties: Record<string, unknown>,
        options: Record<string, unknown>
    ) => unknown;
}

// --- 2. Основной компонент ---

interface YokaiMapProps {
    items: Yokai[];
}

const THREAT_COLORS: Record<string, string> = {
    low: "#4caf50",
    medium: "#ffeb3b",
    high: "#ff9800",
    critical: "#f44336",
};

export default function YokaiMap({items}: YokaiMapProps) {
    const isLoaded = useYmaps();

    // Типизируем ссылки конкретными интерфейсами вместо any
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<YMapInstance | null>(null);
    const clustererRef = useRef<YClustererInstance | null>(null);

    useEffect(() => {
        if (!isLoaded || !mapRef.current) return;

        // Безопасное приведение типа для window
        // (мы знаем, что ymaps там есть, так как isLoaded = true)
        const ymaps = (window as unknown as { ymaps: YMapsApi }).ymaps;

        // 1. Инициализация
        if (!mapInstance.current) {
            mapInstance.current = new ymaps.Map(mapRef.current, {
                center: [35.6895, 139.6917],
                zoom: 11,
                controls: ["zoomControl", "fullscreenControl"],
            });

            clustererRef.current = new ymaps.Clusterer({
                preset: "islands#invertedVioletClusterIcons",
                groupByCoordinates: false,
            });

            mapInstance.current.geoObjects.add(clustererRef.current);
        }

        // 2. Обновление
        if (clustererRef.current) {
            const clusterer = clustererRef.current;
            clusterer.removeAll();

            const geoObjects = items.map((yokai) => {
                const isInactive = ["captured", "caught", "escaped"].includes(yokai.status);
                const color = isInactive ? "#9e9e9e" : (THREAT_COLORS[yokai.threat] || "#000000");

                return new ymaps.Placemark(
                    [yokai.lat, yokai.lng],
                    {
                        balloonContentHeader: yokai.name,
                        balloonContentBody: `
                            <div style="font-family: sans-serif;">
                                <b>Type:</b> ${yokai.type}<br/>
                                <b>Threat:</b> <span style="color:${color}; font-weight:bold;">${yokai.threat.toUpperCase()}</span><br/>
                                <b>Status:</b> ${yokai.status}
                            </div>
                        `,
                        hintContent: yokai.name,
                    },
                    {
                        preset: "islands#circleDotIcon",
                        iconColor: color,
                    }
                );
            });

            clusterer.add(geoObjects);
        }

        return () => {
        };

    }, [isLoaded, items]);

    return (
        <div
            ref={mapRef}
            style={{
                width: "100%",
                maxWidth:"100%",
                height: "400px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #333"
            }}
        />
    );
}