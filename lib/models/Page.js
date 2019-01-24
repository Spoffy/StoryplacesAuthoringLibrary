"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageTransition_1 = require("../schemas/multiplayer/PageTransition");
var StoryFunction_1 = require("./StoryFunction");
var StoryCondition_1 = require("./StoryCondition");
var VariableReference_1 = require("./VariableReference");
var ConditionSchema_1 = require("../schemas/multiplayer/ConditionSchema");
var Page = (function () {
    function Page(_a) {
        var name = _a.name, content = _a.content, hint = _a.hint, functions = _a.functions, conditions = _a.conditions, pageTransition = _a.pageTransition, singleVisit = _a.singleVisit;
        this.functions = [];
        this.conditions = [];
        this.pageTransition = PageTransition_1.PageTransition.next;
        Page.pageCounter += 1;
        this.id = name + Page.pageCounter;
        this.name = name;
        this.content = content;
        this.hint = hint;
        this.functions = functions || [];
        this.conditions = conditions || [];
        this.pageTransition = pageTransition || PageTransition_1.PageTransition.next;
        if (singleVisit) {
            this.makeSingleVisit();
        }
    }
    Page.prototype.makeSingleVisit = function () {
        var name = this.id + " VisitGuard";
        var varRef = VariableReference_1.VariableReference.FromVariableName(name);
        this.functions.push(new StoryFunction_1.StoryFunctionSet(name, varRef, "true"));
        this.conditions.push(new StoryCondition_1.StoryConditionComparison(name, ConditionSchema_1.ComparisonOperand.NOT_EQUAL, varRef, "true", ConditionSchema_1.ComparisonType.Variable, ConditionSchema_1.ComparisonType.String));
    };
    Object.defineProperty(Page.prototype, "contentRef", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "dependencies", {
        get: function () {
            return {
                conditions: this.conditions.filter(StoryCondition_1.IsCondition),
                functions: this.functions.filter(StoryFunction_1.IsStoryFunction)
            };
        },
        enumerable: true,
        configurable: true
    });
    Page.pageCounter = 0;
    return Page;
}());
exports.Page = Page;
//# sourceMappingURL=Page.js.map