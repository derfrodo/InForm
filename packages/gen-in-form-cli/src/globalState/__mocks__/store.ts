import { store as storeOrig } from "../store";

export const store: typeof storeOrig = {
    dispatch: jest.fn(),
    getState: jest.fn(),
    replaceReducer: jest.fn(),
    subscribe: jest.fn(),
    [Symbol.observable]: jest.fn(),
};
