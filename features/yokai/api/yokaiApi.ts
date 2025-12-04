import {Yokai} from "@/types/yokai.schema";
import {YOKAI_DATA} from "@/data/yokaiData";


export async function fetchYokai(): Promise<Yokai[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(YOKAI_DATA);
        }, 1000);
    });
}
