import {PageHint} from "./PageHint";
import {PageTransition} from "../schema/PageTransition";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {PageSchema} from "../schema/PageSchema";
import {
    IsStoryFunction, StoryFunctionReferenceOrDefinition, StoryFunctionSet,
    ToStoryFunctionReference
} from "./StoryFunction";
import {
    ConditionReferenceOrDefinition, IsCondition, StoryConditionComparison,
    ToConditionReference
} from "./StoryCondition";
import {VariableReference} from "./VariableReference";
import {ComparisonOperand, ComparisonType} from "../schema/ConditionSchema";
import {Dependencies, HasDependencies} from "../interfaces/Dependencies";


type PageCreationParameters = {
    name: string,
    content: string,
    hint: PageHint,

    functions?: StoryFunctionReferenceOrDefinition[],
    conditions?: ConditionReferenceOrDefinition[],
    pageTransition?: PageTransition,
    singleVisit?: boolean
}

export class Page implements SchemaContentBuilder<PageSchema>, HasDependencies {
    private static pageCounter: number = 0;
    public id: string;
    public name: string;
    public content: string;
    public hint: PageHint;

    public functions: StoryFunctionReferenceOrDefinition[] = [];
    public conditions: ConditionReferenceOrDefinition[] = [];
    public pageTransition: PageTransition = PageTransition.next;

    constructor({name, content, hint, functions, conditions, pageTransition, singleVisit}: PageCreationParameters) {
        Page.pageCounter += 1;

        this.id = name + Page.pageCounter;        
        this.name = name;
        this.content = content;
        this.hint = hint;
        this.functions = functions || [];
        this.conditions = conditions || [];
        this.pageTransition = pageTransition || PageTransition.next;
        
        if(singleVisit) {
            this.makeSingleVisit();
        }
    }

    private makeSingleVisit() {
        let name = this.id + " VisitGuard";
        let varRef = VariableReference.FromVariableName(name)
        this.functions.push(new StoryFunctionSet(name, varRef, "true"))
        this.conditions.push(new StoryConditionComparison(
            name, ComparisonOperand.NOT_EQUAL,
            varRef,
            "true",
            ComparisonType.Variable,
            ComparisonType.String));
    }

    get contentRef(): string {
        return this.id;
    }

    buildContent(): PageSchema {
        return {
            id: this.id,
            name: this.name,
            contentRef: this.contentRef,
            pageTransition: this.pageTransition,
            hint: this.hint.buildContent(),
            functions: this.functions.map(ToStoryFunctionReference),
            conditions: this.conditions.map(ToConditionReference)
        }
    }

    get dependencies(): Dependencies {
        return {
            conditions: this.conditions.filter(IsCondition),
            functions: this.functions.filter(IsStoryFunction)
        }
    }
}
