import {VariableScope} from "../schemas/core/VariableScopes";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {VariableReferenceSchema} from "../schemas/core/VariableReferenceSchema";

export class VariableReference implements SchemaContentBuilder<VariableReferenceSchema> {
  constructor(
      public scope: VariableScope,
      public namespace: string,
      public variable: string) {}

  static FromVariableName(varName: string) {
      return new VariableReference(VariableScope.shared, "this", varName);
  }

  buildContent(): VariableReferenceSchema {
    return {
        scope: this.scope,
        namespace: this.namespace,
        variable: this.variable
    }
  }
}
