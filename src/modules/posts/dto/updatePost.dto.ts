import { PartialType, PickType } from "@nestjs/swagger";

import { PostEntity } from "../schema/post.schema";



export class UpdatePostDto extends PartialType(PickType(PostEntity, [
    "title",
    "description",
    "images",
    "city",
    "state",
    "zipcode",
    "street",
    "price",
    "isUrgent",
    "isFree",
    "obo",
    "location",
    "isCompleted",
] as const))
{
}
