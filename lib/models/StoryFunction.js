"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var StoryCondition_1 = require("./StoryCondition");
var StoryFunctionBase = (function () {
    function StoryFunctionBase(id, conditions, functions) {
        if (conditions === void 0) { conditions = []; }
        if (functions === void 0) { functions = []; }
        this.id = id;
        this.conditions = conditions;
        this.functions = functions;
    }
    Object.defineProperty(StoryFunctionBase.prototype, "dependencies", {
        get: function () {
            return {
                conditions: this.conditions.filter(StoryCondition_1.IsCondition),
                functions: this.functions.filter(IsStoryFunction)
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StoryFunctionBase.prototype, "conditionReferences", {
        get: function () {
            return this.conditions.map(StoryCondition_1.ToConditionReference);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StoryFunctionBase.prototype, "functionReferences", {
        get: function () {
            return this.functions.map(ToStoryFunctionReference);
        },
        enumerable: true,
        configurable: true
    });
    return StoryFunctionBase;
}());
exports.StoryFunctionBase = StoryFunctionBase;
var StoryFunctionSet = (function (_super) {
    __extends(StoryFunctionSet, _super);
    function StoryFunctionSet(id, variable, value, conditions, functions) {
        var _this = _super.call(this, id, conditions, functions) || this;
        _this.variable = variable;
        _this.value = value;
        return _this;
    }
    return StoryFunctionSet;
}(StoryFunctionBase));
exports.StoryFunctionSet = StoryFunctionSet;
var StoryFunctionSetRole = (function (_super) {
    __extends(StoryFunctionSetRole, _super);
    function StoryFunctionSetRole(id, value, conditions, functions) {
        var _this = _super.call(this, id, conditions, functions) || this;
        _this.value = value;
        return _this;
    }
    return StoryFunctionSetRole;
}(StoryFunctionBase));
exports.StoryFunctionSetRole = StoryFunctionSetRole;
var StoryFunctionSetTimestamp = (function (_super) {
    __extends(StoryFunctionSetTimestamp, _super);
    function StoryFunctionSetTimestamp(id, variable, conditions, functions) {
        var _this = _super.call(this, id, conditions, functions) || this;
        _this.variable = variable;
        return _this;
    }
    return StoryFunctionSetTimestamp;
}(StoryFunctionBase));
exports.StoryFunctionSetTimestamp = StoryFunctionSetTimestamp;
var StoryFunctionIncrement = (function (_super) {
    __extends(StoryFunctionIncrement, _super);
    function StoryFunctionIncrement(id, variable, value, conditions, functions) {
        var _this = _super.call(this, id, conditions, functions) || this;
        _this.variable = variable;
        _this.value = value;
        return _this;
    }
    return StoryFunctionIncrement;
}(StoryFunctionBase));
exports.StoryFunctionIncrement = StoryFunctionIncrement;
var StoryFunctionChain = (function (_super) {
    __extends(StoryFunctionChain, _super);
    function StoryFunctionChain(id, conditions, functions) {
        return _super.call(this, id, conditions, functions) || this;
    }
    return StoryFunctionChain;
}(StoryFunctionBase));
exports.StoryFunctionChain = StoryFunctionChain;
function IsStoryFunction(refOrFunc) {
    return typeof refOrFunc != "string";
}
exports.IsStoryFunction = IsStoryFunction;
function ToStoryFunctionReference(refOrFunc) {
    if (typeof refOrFunc == "string") {
        return refOrFunc;
    }
    else {
        return refOrFunc.id;
    }
}
exports.ToStoryFunctionReference = ToStoryFunctionReference;
//# sourceMappingURL=StoryFunction.js.map