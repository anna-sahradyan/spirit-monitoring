import { Yokai } from "@/types/yokai.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCaptureYokai = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            fetch(`/api/yokai/${id}/capture`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            }).then((res) => {
                if (!res.ok) {
                    return res.json().then((err) => {
                        throw new Error(err.error || "Unknown error");
                    });
                }
                return res.json();
            }),

        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: ["yokai"] });

            const prevData = queryClient.getQueryData<Yokai[]>(["yokai"]);

            queryClient.setQueryData<Yokai[]>(["yokai"], (old) => {
                if (!old) return [];
                return old.map((yokai) =>
                    yokai.id === id && (yokai.status === "active" || yokai.status === "captured")
                        ? {
                            ...yokai,
                            status: yokai.status === "active" ? "captured" : "active",
                        }
                        : yokai
                );
            });

            return { prevData };
        },

        onError: (err, id, context) => {
            queryClient.setQueryData(["yokai"], context?.prevData ?? []);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["yokai"] });
        },
    });
};
