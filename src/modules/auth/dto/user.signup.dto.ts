import { PickType } from "@nestjs/swagger";
import { User } from "../../user/user.schema";

export class UserSignupDto extends PickType(User, [
  "fullName",
  "email",
  "password",
  "city",
] as const) { }
