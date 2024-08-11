import { PickType } from "@nestjs/swagger";
import { PostEntity } from "../schema/post.schema";


export class CreatePost extends PickType(PostEntity, [
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


] as const) {
    userId: string;
}
