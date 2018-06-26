import {PageHint} from "./PageHint";
import {PageTransition} from "../schema/PageTransition";
import {FunctionRefSchema} from "../schema/FunctionSchema";
import {ConditionRefSchema} from "../schema/ConditionSchema";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {PageSchema} from "../schema/PageSchema";

export class Page implements  SchemaContentBuilder<PageSchema> {
    constructor(
        public name: string,
        public contentRef: string,
        public hint: PageHint,

        //Unsupported
        //messageToObservers?: string,

        public functions: FunctionRefSchema[] = [],
        public conditions: ConditionRefSchema[] = [],
        public pageTransition: PageTransition = PageTransition.next) {}

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
