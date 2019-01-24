import { VariableScope } from "../schemas/multiplayer/VariableScopes";
export declare class VariableReference {
    scope: VariableScope;
    namespace: string;
    variable: string;
    constructor(scope: VariableScope, namespace: string, variable: string);
    static FromVariableName(varName: string): VariableReference;
}
