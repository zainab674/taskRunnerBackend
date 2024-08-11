import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
// import { Event } from "../event.schema";
import { IsNumber, IsOptional, } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";
import { PostEntity } from "../schema/post.schema";


export class FilterDto extends PartialType(PickType(PostEntity, [
    "isUrgent",
    "isFree",
    "isCompleted",
    "location"


] as const)) {
    @IsNumber()
    @IsOptional()
    @ApiProperty()
    @JSONSchema({
        description: "Radius ",
        title: "Radius",
    })
    radius: number;
}