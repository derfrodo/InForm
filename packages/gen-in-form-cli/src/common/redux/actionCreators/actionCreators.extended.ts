// This file has been generated by reducer-gen (@Stefan Pauka) written in 2020 / 2021.

// Uncomment imports if you need to ;)
// import type { InFormTypescriptProgram } from "@src/types/InFormTypescriptProgram";

import { CommonReducerActionsExtended } from "./../reducerActions/reducerActions.extended";
// import { COMMON_ACTIONS_EXTENDED } from "./../actions/actions.extended";

/**
 * You may add here extending actionCreators for this features reducer
 * actionCreator: ([params]): ExtenedReducerAction => (
 * {
 *   type: COMMON_ACTIONS_EXTENDED["[actionName]"],
 *   [payload]
 * }),
 */
const extendedActionCreators = {
    // Add functions like
    // addLoadingHandle: (handleToAdd: symbol) => {
    //    return {
    //        type: COMMON_ACTIONS_EXTENDED.ADD_LOADING_HANDLE,
    //        handle: handleToAdd
    //        };
    //    },
};

// Start: This is just for typechecking, so that you can utilize the awesomeness of Typescript
type ActionCreator = {
    [key in string]: (...params: any[]) => CommonReducerActionsExtended;
};

const checkActionCreator: <T>(item: T & ActionCreator) => T = <T>(
    item: T & ActionCreator
) => {
    return item;
};
// End (The function above will be used to create the named export below)

export const commonActionCreatorsExtended = checkActionCreator(
    extendedActionCreators
);

export default commonActionCreatorsExtended;
