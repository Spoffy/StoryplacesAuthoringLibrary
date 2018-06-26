import {VariableScopeSchema} from "./VariableScopes";

export type ImplicitVariableReferenceSchema = string;

export interface ExplicitVariableReferenceSchema {
  scope: VariableScopeSchema;
  namespace: string;
  variable: string;
}

export type VariableReferenceSchema = ImplicitVariableReferenceSchema | ExplicitVariableReferenceSchema;
