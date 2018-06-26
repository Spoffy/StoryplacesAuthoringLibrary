import {VariableScope} from "../schema/VariableScopes";

export type ImplicitVariableReference = string;

export class ExplicitVariableReference {
  scope: VariableScope;
  namespace: string;
  variable: string;
}

export type VariableReference = ImplicitVariableReference | ExplicitVariableReference;
