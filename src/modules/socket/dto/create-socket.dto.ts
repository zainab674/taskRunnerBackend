import { PartialType, PickType } from "@nestjs/swagger";
import { Socket } from "../socket.schema";

export class CreateSocketDto extends PartialType(PickType(Socket, [
    "recepientId",
    "message",
    "senderId",
    "image"

])) { }
