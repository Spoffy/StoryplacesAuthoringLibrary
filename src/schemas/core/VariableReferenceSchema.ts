import {VariableScope} from "./VariableScopes";

export type ImplicitVariableReferenceSchema = string;

export interface ExplicitVariableReferenceSchema {
  scope: VariableScope;
  namespace: string;
  variable: string;
}

export type VariableReferenceSchema = ImplicitVariableReferenceSchema | ExplicitVariableReferenceSchema;
