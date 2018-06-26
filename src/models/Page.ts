import {PageHint} from "./PageHint";
import {PageTransitionSchema} from "../schema/PageTransitionSchema";
import {FunctionRefSchema} from "../schema/FunctionSchema";
import {ConditionRefSchema} from "../schema/ConditionSchema";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {PageSchema} from "../schema/PageSchema";

export class Page implements  SchemaContentBuilder<PageSchema> {
    name: string;
    contentRef: string;

    //Unsupported
    //messageToObservers?: string;

    pageTransition: PageTransitionSchema;
    hint: PageHint;
    functions: FunctionRefSchema[];
    conditions: ConditionRefSchema[];

    buildContent(): PageSchema {
        return {
            id: this.name,
            name: this.name,
            contentRef: this.contentRef,
            pageTransition: this.pageTransition,
            hint: this.hint.buildContent(),
            functions: this.functions,
            conditions: this.conditions
        }
    }

}
