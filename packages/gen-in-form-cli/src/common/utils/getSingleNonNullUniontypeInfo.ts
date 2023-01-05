import { getGeneratorLogger } from "@src/logging/getGeneratorLogger";
import ts from "typescript";

export function getSingleNonNullUniontypeInfo(union: ts.UnionTypeNode): {
    type: ts.TypeNode;
    nullable: boolean;
} {
    const log = getGeneratorLogger();
    const f = union.types.filter(
        (u) =>
            !(
                ts.isLiteralTypeNode(u) &&
                u.literal.kind === ts.SyntaxKind.NullKeyword
            )
    );

    if (f.length > 1) {
        const msg = `More than one non null node in unionttype ${union.getText()}`;
        log.error(msg);
        throw new Error(msg);
    }
    if (f.length === 0) {
        const msg = `No non null node in unionttype ${union.getText()}`;
        log.error(msg);
        throw new Error(msg);
    }

    return {
        type: f[0],
        nullable: union.types.length > f.length,
    };
}
