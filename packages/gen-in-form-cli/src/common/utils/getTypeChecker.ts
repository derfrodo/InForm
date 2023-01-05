import ts from "typescript";
import { getInFormProgramFromStore } from "../getInFormProgramFromStore";

export function getTypeChecker(): ts.TypeChecker {
    return getInFormProgramFromStore().program.getTypeChecker();
}
