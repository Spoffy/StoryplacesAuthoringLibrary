import {VariableScope} from "../schema/VariableScopes";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {VariableReferenceSchema} from "../schema/VariableReferenceSchema";

export class VariableReference implements SchemaContentBuilder<VariableReferenceSchema> {
  constructor(
      public scope: VariableScope,
      public namespace: string,
      public variable: string) {}

  buildContent(): VariableReferenceSchema {
    return {
        scope: this.scope,
        namespace: this.namespace,
        variable: this.variable
    }
  }
}
