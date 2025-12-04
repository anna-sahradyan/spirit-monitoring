import { NextResponse } from "next/server";
import { YOKAI_DATA } from "@/data/yokaiData";

export async function POST(req: Request) {
    const body = await req.json();
    const { id } = body;

    const yokai = YOKAI_DATA.find(y => y.id === id);
    if (!yokai) return NextResponse.json({ error: "Yokai not found" }, { status: 404 });

    if (yokai.status !== "active" && yokai.status !== "captured") {
        return NextResponse.json({ error: "Cannot capture this yokai" }, { status: 400 });
    }

    if (Math.random() < 0.3) {
        return NextResponse.json({ error: "Capture failed: spirit resisted the trap!" }, { status: 500 });
    }

    const updatedYokai = { ...yokai, status: yokai.status === "active" ? "captured" : "active" };
    return NextResponse.json(updatedYokai);
}
