import {PageHint} from "./PageHint";
import {PageTransition} from "../schema/PageTransition";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {PageSchema} from "../schema/PageSchema";
import {StoryFunctionReferenceOrDefinition, ToStoryFunctionReference} from "./StoryFunction";
import {ConditionReferenceOrDefinition, ToConditionReference} from "./StoryCondition";


export class Page implements SchemaContentBuilder<PageSchema> {
    constructor(
        public name: string,
        public contentRef: string,
        public hint: PageHint,

        //Unsupported
        //messageToObservers?: string,

        public functions: StoryFunctionReferenceOrDefinition[] = [],
        public conditions: ConditionReferenceOrDefinition[] = [],
        public pageTransition: PageTransition = PageTransition.next) {}

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
