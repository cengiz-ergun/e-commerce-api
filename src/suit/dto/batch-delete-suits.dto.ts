import { IsArray } from "class-validator";

export class BatchDeleteSuitsDto {
    @IsArray()
    readonly ids: string[];
}
