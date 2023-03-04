import YAML from "yaml";
import fs from "fs";
import { InFormCliArguments } from "@src/common/types/InFormCliArguments";

export function readCliArgumentsFromYaml(fileName = "inform.yaml") {
    const file = fs.readFileSync(fileName, "utf8");
    const config: Partial<InFormCliArguments> = YAML.parse(file);
    console.log(config);
}
