import {Role} from "./Role";
import {Page} from "./Page";
import {Location} from "./Location";
import {IsStoryFunction, StoryFunction} from "./StoryFunction";
import {IsCondition, StoryCondition} from "./StoryCondition";
import {MapViewSettings} from "./MapViewSettings";
import {PublishState} from "../schema/PublishState";
import {Audience} from "../schema/AudienceSchema";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {StorySchema} from "../schema/StorySchema";
import {FunctionSchema} from "../schema/FunctionSchema";
import {ConditionSchema} from "../schema/ConditionSchema";
import {Dependencies, EmptyDependencies, HasDependencies, MergeDependencies} from "../interfaces/Dependencies";

export class Story implements SchemaContentBuilder<StorySchema> {
    constructor(public name: string) {}

    public author: string;
    public publishState: PublishState;
    public roles: Role[] = [];
    public pages: Page[] = []; //Unique
    //public functions: StoryFunction[] = []; //Unique
    //public conditions: StoryCondition[] = []; //Unique
    public cachedMediaIds: string[] = []; //Unique
    public locations: Location[] = []; //Unique
    public tags: string[] = []; //Unique
    public schemaVersion: string;
    public audience: Audience;
    public publishDate?: string;
    public pagesMapViewSettings?: MapViewSettings;

    buildContent(): StorySchema {
        let dependencies = this.calculateDependencies();

        return {
            name: this.name,
            author: this.author,
            publishState: this.publishState,
            publishDate: this.publishDate,
            roles: this.roles.map(role => role.buildContent()),
            pages: this.pages.map(page => page.buildContent()),
            content: this.buildContentStore(),
            functions: this.buildFunctions(dependencies.functions),
            conditions: this.buildConditions(dependencies.conditions),
            cachedMediaIds: this.cachedMediaIds,
            locations: this.locations.map(location => location.buildContent()),
            tags: this.tags,
            pagesMapViewSettings: this.pagesMapViewSettings && this.pagesMapViewSettings.buildContent(),
            schemaVersion: this.schemaVersion,
            audience: this.audience
        }
    }

    private buildContentStore(): {[index: string]: string} {
        return this.pages.reduce((contentStore, page) => {
            contentStore[page.contentRef] = page.content;
            return contentStore;
        }, {});
    }

    private calculateDependencies(): Dependencies {
        return this.calculateDependenciesRec(EmptyDependencies(), this.pages);
    }

    private calculateDependenciesRec(currentDependencies: Dependencies, toProcess: HasDependencies[]): Dependencies {
        if(toProcess.length == 0) { return currentDependencies; }
        let nextDependencies = MergeDependencies(toProcess.map(thing => thing.dependencies));
        let nextToProcess: HasDependencies[] = [];

        nextDependencies.conditions.forEach((cond) => {
            if(currentDependencies.conditions.indexOf(cond) < 0) {
                nextToProcess.push(cond);
            } else {
                console.error("Circular dependency on " + cond.id)
            }
        });

        nextDependencies.functions.forEach((func) => {
            if(currentDependencies.functions.indexOf(func) < 0) {
                nextToProcess.push(func);
            } else {
                console.error("Circular dependency on " + func.id)
            }
        });

        currentDependencies = MergeDependencies([currentDependencies, nextDependencies]);
        return this.calculateDependenciesRec(currentDependencies, nextToProcess);
    }

    private buildFunctions(rawFunctions: StoryFunction[]): FunctionSchema[] {
        return rawFunctions.reduce((result: StoryFunction[], funcInPage: StoryFunction) => {
            let funcInAccumWithSameId = result.find(resultFunc => funcInPage.id == resultFunc.id);
            if(!funcInAccumWithSameId) {
                result.push(funcInPage);
            } else if(funcInAccumWithSameId != funcInPage) {
                throw new Error("Functions with id " + funcInPage.id + " have different definitions.")
            }
            return result;
        }, []).map(func => func.buildContent());
    }

    private buildConditions(rawConditions: StoryCondition[]): ConditionSchema[] {
        return rawConditions.reduce((result: StoryCondition[], condInPage: StoryCondition) => {
            let condInAccumWithSameId = result.find(resultCond => condInPage.id == resultCond.id);
            if(!condInAccumWithSameId) {
                result.push(condInPage);
            } else if(condInAccumWithSameId != condInPage) {
                throw new Error("Conditions with id " + condInPage.id + " have different definitions.")
            }
            return result;
        }, []).map(cond => cond.buildContent());
    }
}
