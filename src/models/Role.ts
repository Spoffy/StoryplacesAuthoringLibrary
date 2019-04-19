import {StoryFunctionSetRole} from "./StoryFunction";
import {StoryConditionIsRole} from "./StoryCondition";

export class Role {
    constructor(
        public id: string,
        public required?: boolean) {}

    private isRoleCondition: StoryConditionIsRole = null;

    getIsRoleCondition(): StoryConditionIsRole {
        if(!this.isRoleCondition) {
            this.isRoleCondition = new StoryConditionIsRole("Is" + this.id, this.id);
        }
        return this.isRoleCondition;
    }

    private setRoleFunction: StoryFunctionSetRole = null;

    getSetRoleFunction(): StoryFunctionSetRole {
        if(!this.setRoleFunction) {
            this.setRoleFunction = new StoryFunctionSetRole("SetRoleTo" + this.id, this.id);
        }
        return this.setRoleFunction;
    }
}
