import {VariableScope} from "../schemas/core/VariableScopes";

export class VariableReference {
  constructor(
      public scope: VariableScope,
      public namespace: string,
      public variable: string) {}

  static FromVariableName(varName: string) {
      return new VariableReference(VariableScope.shared, "this", varName);
  }


}
