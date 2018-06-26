import {VariableScope} from "./VariableScopes";

export type ImplicitVariableReference = string;

export interface ExplicitVariableReference {
  scope: VariableScope;
  namespace: string;
  variable: string;
}

export type VariableReference = ImplicitVariableReference | ExplicitVariableReference;
