import { InFormInterfacesOfTypeDataExpression } from "@src/common/utils/resolveInterfacesOfType/types/InFormInterfacesOfTypeDataExpression";
import { InFormMappingInterfaceName } from "../constants";

export type InFormMappingExpression = InFormInterfacesOfTypeDataExpression<
    typeof InFormMappingInterfaceName
>;
//  ts.ExpressionWithTypeArguments & {
//     expression: ts.Identifier & {
//         text: typeof InFormMappingInterfaceName;
//     };
// };
