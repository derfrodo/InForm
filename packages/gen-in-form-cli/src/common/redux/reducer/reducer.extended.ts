// This file has been generated by reducer-gen (@Stefan Pauka) written in 2020 / 2021.

import { State } from "./../state";
import { getCommonDefaultState } from "./../defaultState.base.generated";
import { CommonReducerActions } from "./../reducerActions/reducerActions.main.generated";

// import type { InFormTypescriptProgram } from "@src/types/InFormTypescriptProgram";

// import { COMMON_ACTIONS_BASE as actions } from "./../actions/actions.base.generated";
// import { COMMON_ACTIONS_EXTENDED as actions } from "./../actions/actions.extended";

// Uncomment for some typechecking:
// import { isCommonReducerActionsExtended } from "./../reducerActions/reducerActions.extended";
// import { isCommonReducerActionsBase } from "./../reducerActions/reducerActions.base.generated";

export const commonReducerExtended = (
    state: State = getCommonDefaultState(),
    action: CommonReducerActions
): State => {
    switch (action.type) {
        //         case actions["[actionName]"]:
        //             return {
        //                 ...state,
        //                 // [action payload]
        //            };
        //         case extendedActions["[actionName]"]:
        //             return {
        //                 ...state,
        //                 // [action payload]
        //              };
        default:
            return state;
    }
};

export default commonReducerExtended;
