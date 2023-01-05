import { Types, PluginFunction } from '@graphql-codegen/plugin-helpers';
import {
    parse,
    printSchema,
    GraphQLSchema,
    visit
} from 'graphql';
import { RawClientSideBasePluginConfig } from '@graphql-codegen/visitor-plugin-common';

export const plugin: PluginFunction<RawClientSideBasePluginConfig, Types.ComplexPluginOutput> = async (
    schema: GraphQLSchema,
    documents: Types.DocumentFile[],
    config: RawClientSideBasePluginConfig
) => {

    const printedSchema = printSchema(schema);
    const astNode = parse(printedSchema);

    const visitorResult = visit(astNode, {
        InputObjectTypeDefinition : (a,b,c)=>{return `a: "${a}", b: "${b}", c: "${c}"`}
    });
    // documents[0].
    //   console.log({schema: JSON.stringify(schema)})
    //   console.log({documents: JSON.stringify(documents)})
    console.log("CONFIIG")
    console.log({ config: JSON.stringify(config) })
    console.log("END CONFIIG")

    return {
        content: JSON.stringify(visitorResult),
        append: ["APPENDME", "Also me"],
        prepend: ["Prepme", "Pre me, too"],
    };
}