// This file has been generated by reducer-gen (@Stefan Pauka) written in 2020 / 2021.

import { SEARCH_MAPPINGS_ACTIONS_EXTENDED as extendedActions } from "./../actions/actions.extended";

/**
 * You may add here extending reducer actions for this features reducer
 */
export type SearchMappingsReducerActionsExtended = {
    type: extendedActions;
    isBubbled?: boolean;
} & {
    // replace by following template for every extendedActions
    //    | {
    //        type: extendedActions["[action name]"];
    //        /* [additional payload like : next:  boolean;]*/
    //    }
};

export const isSearchMappingsReducerActionsExtended = (
    item: any
): item is SearchMappingsReducerActionsExtended => {
    if (!item) {
        return false;
    }
    if (typeof item === "object") {
        const { type } = item;

        return (
            typeof type === "string" &&
            Object.hasOwnProperty.call(extendedActions, type)
        );
    }
    return false;
};

export default SearchMappingsReducerActionsExtended;
