import {StoryFunctionSetRole} from "./StoryFunction";
import {StoryConditionIsRole} from "./StoryCondition";

export class Role {
    constructor(
        public id: string,
        public required?: boolean) {}

    getIsRoleCondition(): StoryConditionIsRole {
        return new StoryConditionIsRole("Is" + this.id, this.id);
    }

    getSetRoleFunction(): StoryFunctionSetRole {
        return new StoryFunctionSetRole("SetRoleTo" + this.id, this.id);
    }
}
