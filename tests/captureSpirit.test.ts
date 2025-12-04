import { expect, test } from "@jest/globals";
import { YOKAI_DATA } from "@/data/yokaiData";

const captureSpirit = (id: string) => {
    const spirit = YOKAI_DATA.find((spirit) => spirit.id === id);
    if (!spirit) {
        throw new Error("Дух не найден");
    }
    spirit.status = "captured";
};

test("Дух должен быть пойман", () => {
    const spiritId = "1";
    const spiritBefore = YOKAI_DATA.find((spirit) => spirit.id === spiritId);

    if (!spiritBefore) {
        throw new Error("Дух не найден");
    }

    expect(spiritBefore.status).toBe("active");

    captureSpirit(spiritId);

    const spiritAfter = YOKAI_DATA.find((spirit) => spirit.id === spiritId);

    if (!spiritAfter) {
        throw new Error("Дух не найден после захвата");
    }

    expect(spiritAfter.status).toBe("captured");
});
