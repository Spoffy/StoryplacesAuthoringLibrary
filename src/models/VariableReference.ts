import {VariableScopeSchema} from "../schema/VariableScopes";
import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {VariableReferenceSchema} from "../schema/VariableReferenceSchema";

export class VariableReference implements SchemaContentBuilder<VariableReferenceSchema> {
  scope: VariableScopeSchema;
  namespace: string;
  variable: string;

  buildContent(): VariableReferenceSchema {
    return {
        scope: this.scope,
        namespace: this.namespace,
        variable: this.variable
    }
  }
}
