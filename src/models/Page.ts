import {PageHint} from "./PageHint";
import {PageTransition} from "../schema/PageTransition";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {PageSchema} from "../schema/PageSchema";
import {StoryFunctionReferenceOrDefinition, StoryFunctionSet, ToStoryFunctionReference} from "./StoryFunction";
import {ConditionReferenceOrDefinition, StoryConditionComparison, ToConditionReference} from "./StoryCondition";
import {VariableReference} from "./VariableReference";
import {ComparisonOperand, ComparisonType} from "../schema/ConditionSchema";


type PageCreationParameters = {
    name: string,
    contentRef: string,
    hint: PageHint,

    functions?: StoryFunctionReferenceOrDefinition[],
    conditions?: ConditionReferenceOrDefinition[],
    pageTransition?: PageTransition,
    singleVisit?: boolean
}

export class Page implements SchemaContentBuilder<PageSchema> {
    public name: string;
    public contentRef: string;
    public hint: PageHint;

    public functions: StoryFunctionReferenceOrDefinition[] = [];
    public conditions: ConditionReferenceOrDefinition[] = [];
    public pageTransition: PageTransition = PageTransition.next;

    constructor({name, contentRef, hint, functions, conditions, pageTransition, singleVisit}: PageCreationParameters) {
        this.name = name;
        this.contentRef = contentRef;
        this.hint = hint;
        this.functions = functions || [];
        this.conditions = conditions || [];
        this.pageTransition = pageTransition || PageTransition.next;

        if(singleVisit) {
            this.makeSingleVisit();
        }
    }

    private makeSingleVisit() {
        let name = this.name + " VisitGuard";
        let varRef = VariableReference.FromVariableName(name)
        this.functions.push(new StoryFunctionSet(name, varRef, "true"))
        this.conditions.push(new StoryConditionComparison(
            name, ComparisonOperand.NOT_EQUAL,
            varRef,
            "true",
            ComparisonType.Variable,
            ComparisonType.String));
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
