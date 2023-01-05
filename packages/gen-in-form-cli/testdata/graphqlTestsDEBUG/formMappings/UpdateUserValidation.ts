import { GetValidationFunction } from "@derfrodo/gen-in-form-runtime";
import { UpdateUserInput } from "../graphql/generated";

export type UserValidationRules = {
    name: {
        required: boolean;
    };
};

export type UserValidationRulesResult = {
    name: {
        required: string;
    };
};

export const getValidationFunction: GetValidationFunction<
    UserValidationRules,
    UpdateUserInput,
    UserValidationRulesResult
> = (u) => {
    return (u2) => {
        return {
            name: {
                required:
                    (u.name.required && typeof u2.firstName !== "string") ||
                    u2.firstName === ""
                        ? "You must enter a firstname"
                        : "",
            },
        };
    };
};
