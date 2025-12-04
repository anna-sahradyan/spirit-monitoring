import { NextResponse } from "next/server";
import { YOKAI_DATA } from "@/data/yokaiData";
import {z} from "zod";
import {yokaiSchema} from "@/types/yokai.schema";


export async function GET() {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const parsed = z.array(yokaiSchema).safeParse(YOKAI_DATA);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Invalid yokai data", details: parsed.error },
            { status: 500 }
        );
    }

    return NextResponse.json(parsed.data);
}
