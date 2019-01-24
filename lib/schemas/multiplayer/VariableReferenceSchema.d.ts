import { VariableScope } from "./VariableScopes";
export declare type ImplicitVariableReferenceSchema = string;
export interface ExplicitVariableReferenceSchema {
    scope: VariableScope;
    namespace: string;
    variable: string;
}
export declare type VariableReferenceSchema = ImplicitVariableReferenceSchema | ExplicitVariableReferenceSchema;
