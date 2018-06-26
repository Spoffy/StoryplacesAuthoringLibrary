import {VariableScopeSchema} from "../schema/VariableScopes";

export class VariableReference {
  scope: VariableScopeSchema;
  namespace: string;
  variable: string;
}
