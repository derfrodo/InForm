import { MappedProperty } from "@src/steps/createFormModells/types/MappedProperty";
import { AllowedNames } from "../../../common/types/AllowedNames";
import { FormModell } from "../../createFormModells/types/FormModell";

export type MappedPropertyKeys = AllowedNames<FormModell, MappedProperty[]>;
