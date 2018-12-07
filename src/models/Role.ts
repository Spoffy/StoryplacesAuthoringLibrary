import {SchemaContentBuilder} from "../interfaces/SchemaContentBuilder";
import {RoleSchema} from "../schemas/core/RoleSchema";

export class Role implements SchemaContentBuilder<RoleSchema> {
    constructor(
        public id: string,
        public required?: boolean) {}

    buildContent(): RoleSchema {
        return {
            id: this.id,
            required: this.required
        }
    }
}
