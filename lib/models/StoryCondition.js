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
var Dependencies_1 = require("../interfaces/Dependencies");
var StoryConditionBase = (function () {
    function StoryConditionBase(id) {
        this.id = id;
    }
    Object.defineProperty(StoryConditionBase.prototype, "dependencies", {
        get: function () {
            return Dependencies_1.EmptyDependencies();
        },
        enumerable: true,
        configurable: true
    });
    return StoryConditionBase;
}());
exports.StoryConditionBase = StoryConditionBase;
var StoryConditionLogical = (function (_super) {
    __extends(StoryConditionLogical, _super);
    function StoryConditionLogical(id, operand, conditions) {
        if (conditions === void 0) { conditions = []; }
        var _this = _super.call(this, id) || this;
        _this.operand = operand;
        _this.conditions = conditions;
        return _this;
    }
    Object.defineProperty(StoryConditionLogical.prototype, "dependencies", {
        get: function () {
            var myDependencies = Dependencies_1.EmptyDependencies();
            myDependencies.conditions = this.conditions.filter(IsCondition);
            return myDependencies;
        },
        enumerable: true,
        configurable: true
    });
    return StoryConditionLogical;
}(StoryConditionBase));
exports.StoryConditionLogical = StoryConditionLogical;
var StoryConditionComparison = (function (_super) {
    __extends(StoryConditionComparison, _super);
    function StoryConditionComparison(id, operand, a, b, aType, bType) {
        var _this = _super.call(this, id) || this;
        _this.operand = operand;
        _this.a = a;
        _this.b = b;
        _this.aType = aType;
        _this.bType = bType;
        return _this;
    }
    return StoryConditionComparison;
}(StoryConditionBase));
exports.StoryConditionComparison = StoryConditionComparison;
var StoryConditionCheck = (function (_super) {
    __extends(StoryConditionCheck, _super);
    function StoryConditionCheck(id, variable) {
        var _this = _super.call(this, id) || this;
        _this.variable = variable;
        return _this;
    }
    return StoryConditionCheck;
}(StoryConditionBase));
exports.StoryConditionCheck = StoryConditionCheck;
var StoryConditionLocation = (function (_super) {
    __extends(StoryConditionLocation, _super);
    function StoryConditionLocation(id, bool, location) {
        var _this = _super.call(this, id) || this;
        _this.bool = bool;
        _this.location = location;
        return _this;
    }
    return StoryConditionLocation;
}(StoryConditionBase));
exports.StoryConditionLocation = StoryConditionLocation;
var StoryConditionTimePassed = (function (_super) {
    __extends(StoryConditionTimePassed, _super);
    function StoryConditionTimePassed(id, minutes, variable) {
        var _this = _super.call(this, id) || this;
        _this.minutes = minutes;
        _this.variable = variable;
        return _this;
    }
    return StoryConditionTimePassed;
}(StoryConditionBase));
exports.StoryConditionTimePassed = StoryConditionTimePassed;
var StoryConditionTimeRange = (function (_super) {
    __extends(StoryConditionTimeRange, _super);
    function StoryConditionTimeRange(id, first, last) {
        var _this = _super.call(this, id) || this;
        _this.first = first;
        _this.last = last;
        return _this;
    }
    return StoryConditionTimeRange;
}(StoryConditionBase));
exports.StoryConditionTimeRange = StoryConditionTimeRange;
var StoryConditionIsRole = (function (_super) {
    __extends(StoryConditionIsRole, _super);
    function StoryConditionIsRole(id, role) {
        var _this = _super.call(this, id) || this;
        _this.role = role;
        return _this;
    }
    return StoryConditionIsRole;
}(StoryConditionBase));
exports.StoryConditionIsRole = StoryConditionIsRole;
function IsCondition(refOrCond) {
    return typeof refOrCond != "string";
}
exports.IsCondition = IsCondition;
function ToConditionReference(refOrCond) {
    if (typeof refOrCond == "string") {
        return refOrCond;
    }
    else {
        return refOrCond.id;
    }
}
exports.ToConditionReference = ToConditionReference;
//# sourceMappingURL=StoryCondition.js.map