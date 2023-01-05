import { store } from "./store";

export type GeneratorState = ReturnType<typeof store["getState"]>;
