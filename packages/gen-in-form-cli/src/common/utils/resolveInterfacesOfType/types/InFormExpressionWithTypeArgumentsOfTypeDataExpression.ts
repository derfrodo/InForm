import ts from "typescript";

export type InFormExpressionWithTypeArgumentsOfTypeDataExpression<T> =
    ts.ExpressionWithTypeArguments & {
        expression: ts.Identifier & {
            text: T;
        };
    };
