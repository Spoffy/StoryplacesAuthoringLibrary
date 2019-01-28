import {PageHint} from "./PageHint";
import {PageTransition} from "../schemas/multiplayer/PageTransition";
import {IsStoryFunction, StoryFunctionReferenceOrDefinition, StoryFunctionSet} from "./StoryFunction";
import {ConditionReferenceOrDefinition, IsCondition, StoryConditionComparison} from "./StoryCondition";
import {VariableReference} from "./VariableReference";
import {ComparisonOperand, ComparisonType} from "../schemas/multiplayer/ConditionSchema";
import {Dependencies, HasDependencies} from "../interfaces/Dependencies";


export type PageCreationParameters = {
    name: string,
    content: string,
    hint: PageHint,

    functions?: StoryFunctionReferenceOrDefinition[],
    conditions?: ConditionReferenceOrDefinition[],
    pageTransition?: PageTransition,
    singleVisit?: boolean
}

export class Page implements HasDependencies {
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

        let baseId = name.replace(/[^a-zA-Z0-9]/g, "");

        this.id = baseId + Page.pageCounter;
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

    get dependencies(): Dependencies {
        return {
            conditions: this.conditions.filter(IsCondition),
            functions: this.functions.filter(IsStoryFunction)
        }
    }
}
