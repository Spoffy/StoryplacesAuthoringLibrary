import {PageHint} from "./PageHint";
import {PageTransition} from "../schema/PageTransition";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {PageSchema} from "../schema/PageSchema";
import {StoryFunctionReferenceOrDefinition, ToStoryFunctionReference} from "./StoryFunction";
import {ConditionReferenceOrDefinition, ToConditionReference} from "./StoryCondition";


type PageCreationParameters = {
    name: string,
    contentRef: string,
    hint: PageHint,

    functions?: StoryFunctionReferenceOrDefinition[],
    conditions?: ConditionReferenceOrDefinition[],
    pageTransition?: PageTransition
}

export class Page implements SchemaContentBuilder<PageSchema> {
    public name: string;
    public contentRef: string;
    public hint: PageHint;

    public functions: StoryFunctionReferenceOrDefinition[] = [];
    public conditions: ConditionReferenceOrDefinition[] = [];
    public pageTransition: PageTransition = PageTransition.next;

    constructor({name, contentRef, hint, functions, conditions, pageTransition}: PageCreationParameters) {
        this.name = name;
        this.contentRef = contentRef;
        this.hint = hint;
        this.functions = functions || [];
        this.conditions = conditions || [];
        this.pageTransition = pageTransition || PageTransition.next;
    }

    buildContent(): PageSchema {
        return {
            id: this.name,
            name: this.name,
            contentRef: this.contentRef,
            pageTransition: this.pageTransition,
            hint: this.hint.buildContent(),
            functions: this.functions.map(ToStoryFunctionReference),
            conditions: this.conditions.map(ToConditionReference)
        }
    }

}
