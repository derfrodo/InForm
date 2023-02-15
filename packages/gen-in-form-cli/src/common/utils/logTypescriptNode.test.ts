import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import { logTypescriptNode } from "./logTypescriptNode";
import ts from "typescript";

jest.mock("@src/logging/getGeneratorLogger");

describe("logTypescriptNode module tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("given logTypescriptNode first test", () => {
        logTypescriptNode(ts.factory.createTypeLiteralNode([]));

        const info = getGeneratorLogger().info;
        expect(info).toBeCalled();
    });
});
