import {Role} from "./Role";
import {Page} from "./Page";
import {Location} from "./Location";
import {StoryCondition} from "./StoryCondition";
import {MapViewSettings} from "./MapViewSettings";
import {PublishState} from "../schemas/multiplayer/PublishState";
import {Audience} from "../schemas/multiplayer/AudienceSchema";
import {ConditionSchema} from "../schemas/multiplayer/ConditionSchema";

type BuildFunction<ObjectType, ReturnType> =
    <ObjectType, ReturnType>(story: ObjectType) => ReturnType;

export class Story {
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


    /*private buildConditions(rawConditions: StoryCondition[]): ConditionSchema[] {
        return rawConditions.reduce((result: StoryCondition[], condInPage: StoryCondition) => {
            let condInAccumWithSameId = result.find(resultCond => condInPage.id == resultCond.id);
            if(!condInAccumWithSameId) {
                result.push(condInPage);
            } else if(condInAccumWithSameId != condInPage) {
                throw new Error("Conditions with id " + condInPage.id + " have different definitions.")
            }
            return result;
        }, []).map(cond => cond.buildContent());
    }*/
}

