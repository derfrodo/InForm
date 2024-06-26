// This file has been generated by reducer-gen (@Stefan Pauka) written in 2020 / 2021.

// Uncomment imports if you need to ;)
// import { InFormTemplateFormModel } from "../../types/InFormTemplateFormModel";

import { ResolveTemplateModelsReducerActionsExtended } from "./../reducerActions/reducerActions.extended";
// import { RESOLVE_TEMPLATE_MODELS_ACTIONS_EXTENDED } from "./../actions/actions.extended";

/**
 * You may add here extending actionCreators for this features reducer
 * actionCreator: ([params]): ExtenedReducerAction => (
 * {
 *   type: RESOLVE_TEMPLATE_MODELS_ACTIONS_EXTENDED["[actionName]"],
 *   [payload]
 * }),
 */
const extendedActionCreators = {
    // Add functions like
    // addLoadingHandle: (handleToAdd: symbol) => {
    //    return {
    //        type: RESOLVE_TEMPLATE_MODELS_ACTIONS_EXTENDED.ADD_LOADING_HANDLE,
    //        handle: handleToAdd
    //        };
    //    },
};

// Start: This is just for typechecking, so that you can utilize the awesomeness of Typescript
type ActionCreator = {
    [key in string]: (
        ...params: any[]
    ) => ResolveTemplateModelsReducerActionsExtended;
};

const checkActionCreator: <T>(item: T & ActionCreator) => T = <T>(
    item: T & ActionCreator
) => {
    return item;
};
// End (The function above will be used to create the named export below)

export const resolveTemplateModelsActionCreatorsExtended = checkActionCreator(
    extendedActionCreators
);

export default resolveTemplateModelsActionCreatorsExtended;
