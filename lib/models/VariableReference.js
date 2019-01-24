"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VariableScopes_1 = require("../schemas/multiplayer/VariableScopes");
var VariableReference = (function () {
    function VariableReference(scope, namespace, variable) {
        this.scope = scope;
        this.namespace = namespace;
        this.variable = variable;
    }
    VariableReference.FromVariableName = function (varName) {
        return new VariableReference(VariableScopes_1.VariableScope.shared, "this", varName);
    };
    return VariableReference;
}());
exports.VariableReference = VariableReference;
//# sourceMappingURL=VariableReference.js.map