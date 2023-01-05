import { getDefaultArgs } from "@src/arguments/getDefaultArgs";
import { commonActionCreators, getCommonDefaultState } from "@src/common/redux";
import { store } from "@src/globalState";
import {
    getSearchMappingsDefaultState,
    searchMappingsActionCreators,
} from "@src/steps/searchMappings/redux";

describe("store integtration tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("store common properties integtration tests", () => {
        it("Given store has been created when state is referenced then it contains default values for common", async () => {
            const uut = store;
            const common = uut.getState().common;
            expect(common).toEqual(getCommonDefaultState());
        });

        it("Given state has been created when vargs is updated then it contains default values and newly referenced state contains vargs", async () => {
            const uut = store;
            const common = uut.getState().common;

            const cliArgs = getDefaultArgs();
            uut.dispatch(commonActionCreators.setCliArgs(cliArgs));

            const argsAfterDispatch = uut.getState().common;

            expect(common).toEqual(getCommonDefaultState());
            expect(argsAfterDispatch).toEqual({
                ...getCommonDefaultState(),
                cliArgs,
            });
        });
    });

    it("Given store has been created when state is referenced then it contains default values for step mappingSearch", async () => {
        const uut = store;
        const steps = uut.getState().steps;
        expect(steps.mappingSearch).toEqual(getSearchMappingsDefaultState());
    });
    it("Given state has been created when step mappingSearch is updated then newly referenced state contains new value", async () => {
        const uut = store;

        uut.dispatch(
            searchMappingsActionCreators.setIsThrowOnUnexpectedTsNodeInFile(
                true
            )
        );

        const argsAfterDispatch = uut.getState().steps.mappingSearch;

        expect(argsAfterDispatch).toEqual({
            ...getSearchMappingsDefaultState(),
            isThrowOnUnexpectedTsNodeInFile: true,
        });
    });
});
