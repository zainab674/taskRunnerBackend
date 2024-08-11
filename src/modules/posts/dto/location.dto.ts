import { ApiProperty, PickType } from "@nestjs/swagger";

import { IsNumber, } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";
import { PostEntity } from "../schema/post.schema";


export class LocationDto extends PickType(PostEntity, [

    "location"

] as const) {
    @IsNumber()
    @ApiProperty()
    @JSONSchema({
        description: "Radius ",
        title: "Radius",
    })
    radius: number;
}