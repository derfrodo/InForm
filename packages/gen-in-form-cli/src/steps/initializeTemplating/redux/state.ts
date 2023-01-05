import { InFormHandlebarTemplate } from "../types/InFormHandlebarTemplate";

export interface State {
    templateGenerateOnce: InFormHandlebarTemplate[];
    templates: InFormHandlebarTemplate[];
    partials: InFormHandlebarTemplate[];

    templateScaffold: InFormHandlebarTemplate[];
    templateScaffoldOnce: InFormHandlebarTemplate[];
}
