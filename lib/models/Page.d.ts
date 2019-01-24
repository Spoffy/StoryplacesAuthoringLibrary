import { PageHint } from "./PageHint";
import { PageTransition } from "../schemas/multiplayer/PageTransition";
import { StoryFunctionReferenceOrDefinition } from "./StoryFunction";
import { ConditionReferenceOrDefinition } from "./StoryCondition";
import { Dependencies, HasDependencies } from "../interfaces/Dependencies";
export declare type PageCreationParameters = {
    name: string;
    content: string;
    hint: PageHint;
    functions?: StoryFunctionReferenceOrDefinition[];
    conditions?: ConditionReferenceOrDefinition[];
    pageTransition?: PageTransition;
    singleVisit?: boolean;
};
export declare class Page implements HasDependencies {
    private static pageCounter;
    id: string;
    name: string;
    content: string;
    hint: PageHint;
    functions: StoryFunctionReferenceOrDefinition[];
    conditions: ConditionReferenceOrDefinition[];
    pageTransition: PageTransition;
    constructor({name, content, hint, functions, conditions, pageTransition, singleVisit}: PageCreationParameters);
    private makeSingleVisit();
    readonly contentRef: string;
    readonly dependencies: Dependencies;
}
