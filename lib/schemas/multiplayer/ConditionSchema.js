"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogicalOperand;
(function (LogicalOperand) {
    LogicalOperand["AND"] = "AND";
    LogicalOperand["OR"] = "OR";
    LogicalOperand["NOR"] = "NOR";
    LogicalOperand["NAND"] = "NAND";
})(LogicalOperand = exports.LogicalOperand || (exports.LogicalOperand = {}));
var ComparisonOperand;
(function (ComparisonOperand) {
    ComparisonOperand["EQUAL"] = "==";
    ComparisonOperand["NOT_EQUAL"] = "!=";
    ComparisonOperand["LESS_OR_EQUAL"] = "<=";
    ComparisonOperand["GREATER_OR_EQUAL"] = ">=";
    ComparisonOperand["LESS"] = "<";
    ComparisonOperand["GREATER"] = ">";
})(ComparisonOperand = exports.ComparisonOperand || (exports.ComparisonOperand = {}));
var ComparisonType;
(function (ComparisonType) {
    ComparisonType["Variable"] = "Variable";
    ComparisonType["Integer"] = "Integer";
    ComparisonType["String"] = "String";
})(ComparisonType = exports.ComparisonType || (exports.ComparisonType = {}));
//# sourceMappingURL=ConditionSchema.js.map