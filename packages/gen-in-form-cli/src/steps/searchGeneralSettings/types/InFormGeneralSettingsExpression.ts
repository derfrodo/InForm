import { InFormGeneralSettingsInterfaceName } from "../constants";
import ts from "typescript";

export type InFormGeneralSettingsExpression = ts.ExpressionWithTypeArguments & {
    expression: ts.Identifier & {
        text: typeof InFormGeneralSettingsInterfaceName;
    };
};
