"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoryFunction_1 = require("./StoryFunction");
var StoryCondition_1 = require("./StoryCondition");
var Role = (function () {
    function Role(id, required) {
        this.id = id;
        this.required = required;
        this.isRoleCondition = null;
        this.setRoleFunction = null;
    }
    Role.prototype.getIsRoleCondition = function () {
        if (!this.isRoleCondition) {
            this.isRoleCondition = new StoryCondition_1.StoryConditionIsRole("Is" + this.id, this.id);
        }
        return this.isRoleCondition;
    };
    Role.prototype.getSetRoleFunction = function () {
        if (!this.setRoleFunction) {
            this.setRoleFunction = new StoryFunction_1.StoryFunctionSetRole("SetRoleTo" + this.id, this.id);
        }
        return this.setRoleFunction;
    };
    return Role;
}());
exports.Role = Role;
//# sourceMappingURL=Role.js.map