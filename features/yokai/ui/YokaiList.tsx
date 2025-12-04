'use client'
import { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchYokai } from "@/features/yokai/api/yokaiApi";
import { useCaptureYokai } from "@/features/yokai/hooks/useCaptureYokai";
import { Yokai } from "@/types/yokai.schema";
import style from './yokaiList.module.scss';
import MuiTable from "@/components/table/MuiTable";
import MuiTableSkeleton from "@/components/table/MuiTableSkeleton";
import { CaptureErrorDialog } from "@/components/dialog/CaptureErrorDialog";
import YokaiMap from "@/components/map/YokaiMap";  // Импортируем YokaiMap

export default function YokaiList() {
    const queryClient = useQueryClient();
    const [errorMsg, setErrorMsg] = useState("");
    const [isErrorOpen, setIsErrorOpen] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ["yokai"],
        queryFn: fetchYokai,
    });

    const { mutate, isPending, variables } = useCaptureYokai();

    const handleCapture = useCallback((id: string) => {
        mutate(id, {
            onError: (err: Error) => {
                setErrorMsg(err.message || "Failed to capture");
                setIsErrorOpen(true);
            }
        });
    }, [mutate]);

    useEffect(() => {
        const eventSource = new EventSource("/api/sse");

        eventSource.onmessage = (event) => {
            try {
                const updatedYokai: Yokai = JSON.parse(event.data);

                queryClient.setQueryData<Yokai[]>(["yokai"], (oldData) => {
                    if (!oldData) return [];
                    return oldData.map((y) =>
                        y.id === updatedYokai.id ? updatedYokai : y
                    );
                });
            } catch (e) {
                console.error("Error parsing SSE data", e);
            }
        };

        return () => {
            eventSource.close();
        };
    }, [queryClient]);

    return (
        <div className={style.container}>
            <div className={style.cards}>
                {isLoading ? (
                    <MuiTableSkeleton rows={5} />
                ) : error ? (
                    <div>Error loading yokai</div>
                ) : Array.isArray(data) ? (
                    <>
                        <MuiTable
                            items={data || []}
                            onCapture={handleCapture}
                            isMutatingId={isPending ? variables : null}
                        />
                    </>
                ) : (
                    <div>Error: Data is not an array</div>
                )}
            </div>

            <div className={style.map}>
                {Array.isArray(data) && <YokaiMap items={data || []} />}
            </div>

            <CaptureErrorDialog
                open={isErrorOpen}
                message={errorMsg}
                onClose={() => setIsErrorOpen(false)}
            />
        </div>
    );
}
