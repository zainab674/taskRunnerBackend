import { PickType } from "@nestjs/swagger";
import { PostEntity } from "../schema/post.schema";




export class SearchDto extends PickType(PostEntity, [

    "title"

] as const) {

}
