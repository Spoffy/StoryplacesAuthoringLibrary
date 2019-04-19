import { StoryFunctionSetRole } from "./StoryFunction";
import { StoryConditionIsRole } from "./StoryCondition";
export declare class Role {
    id: string;
    required?: boolean;
    constructor(id: string, required?: boolean);
    private isRoleCondition;
    getIsRoleCondition(): StoryConditionIsRole;
    private setRoleFunction;
    getSetRoleFunction(): StoryFunctionSetRole;
}
