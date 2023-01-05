import { MappedMember } from "@src/steps/createFormModells/types/MappedMember";
import { AllowedNames } from "../../../common/types/AllowedNames";
import { FormModell } from "../../createFormModells/types/FormModell";

export type MappedMemberKeys = AllowedNames<FormModell, MappedMember[]>;
