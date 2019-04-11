"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoryFunction_1 = require("./StoryFunction");
var StoryCondition_1 = require("./StoryCondition");
var Role = (function () {
    function Role(id, required) {
        this.id = id;
        this.required = required;
    }
    Role.prototype.getIsRoleCondition = function () {
        return new StoryCondition_1.StoryConditionIsRole("Is" + this.id, this.id);
    };
    Role.prototype.getSetRoleFunction = function () {
        return new StoryFunction_1.StoryFunctionSetRole("SetRoleTo" + this.id, this.id);
    };
    return Role;
}());
exports.Role = Role;
//# sourceMappingURL=Role.js.map