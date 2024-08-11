import {
  Body,
  Controller,

  Get,

  Put,


  UploadedFile,
  UseInterceptors,

} from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { constTexts } from "src/constants";
import { Action } from "../../casl/userRoles";

import { ApiPageOkResponse, Auth, AuthUser } from "../../decorators";

import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.schema";
import { UserService } from "./user.service";
import { FileUpload } from "src/interceptors/file-upload.interceptor";




@Controller(constTexts.userRoute.name)
@ApiTags(constTexts.userRoute.name)
export class UserController {
  constructor(
    private userService: UserService,

  ) {

  }

  ///////////////////GET ALL POSTS
  @Get(constTexts.userRoute.allUsers)
  @ApiPageOkResponse({
    description: "Get all List",
    type: User,
  })

  findall() {
    return this.userService.findall();
  }


  @Auth(Action.Create, "User")
  @UseInterceptors(FileUpload('avatar',))
  @Put(constTexts.userRoute.update)
  @ApiConsumes('multipart/form-data')
  @ApiPageOkResponse({
    description: "Update User Profile",
    type: User,
  })
  async update(
    @AuthUser() user: User,
    @UploadedFile() avatar: Express.Multer.File,
    @Body() userUpdateDto: UpdateUserDto): Promise<any> {
    if (avatar) {
      userUpdateDto.avatar = avatar.destination + avatar.filename;
    }
    return this.userService.update(user.id, userUpdateDto);
  }






  // @Delete(constTexts.userRoute.deleteAccount)
  // @ApiPageOkResponse({
  //   description: "Delete User",
  //   type: User,
  // })
  // @Auth(Action.Delete, "User")
  // async deleteAccount(@AuthUser() user: User) {
  //   return this.userService.delete(user.id);
  // }
}
