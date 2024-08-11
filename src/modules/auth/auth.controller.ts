import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { getCharacterString } from "../../common/utils";
import { Action } from "../../casl/userRoles";
import { constTexts } from "../../constants";
import { Auth, AuthUser, Public } from "../../decorators";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { IsUserUnique } from "./../../decorators/user-signup.decorator";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/user.login.dto";
import { TokenPayloadDto } from "./dto/TokenPayloadDto";
import { ErrorCodesMeta, ResponseCode } from "src/exceptions";
import { VerifyAccountDto } from "./dto/verify-account.dto";
import { UserSignupDto } from "./dto/user.signup.dto";
import { PostsService } from "../posts/posts.service";
import { AssignedTasksService } from "../assigned-tasks/assigned-tasks.service";

@Controller(constTexts.authRoute.name)
@ApiTags(constTexts.authRoute.name)
export class AuthController {
  // loggerService: any;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private postsService: PostsService,
    private assignedServive: AssignedTasksService,
  ) { }

  async generateString(length) {
    let result = "";
    const characters = getCharacterString();
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  ///////////////VERIFY EMAIL
  @Public()
  @Post(constTexts.authRoute.verifyAccount)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: "any",
    description: "Email Account verify",
  })
  async verifyToken(@Body() dto: VerifyAccountDto): Promise<any> {
    const data = await this.userService.verifyAccount(dto);
    console.log(data);

    if (data) {
      const token: TokenPayloadDto =
        await this.authService.createAccessToken(data);
      return token;
    }
  }


  ////////////////////////////////////LOGIN
  @Public()
  @Post(constTexts.authRoute.login)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TokenPayloadDto,
    description: "User info with access token",
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto
  ): Promise<TokenPayloadDto> {
    const userEntity: User = await this.authService.validateUser(userLoginDto);
    console.log(userEntity)
    if (!userEntity.verify) {
      throw new HttpException(
        ErrorCodesMeta.USER_EMAIL_NOT_VERIFIED,
        ResponseCode.UNAUTHORIZED
      );
    } else {
      const token: TokenPayloadDto =
        await this.authService.createAccessToken(userEntity);
      return token;
    }
  }


  ////////////////////////////////////////////////////SignUp
  @Public()
  @Post(constTexts.authRoute.signUp)
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: User, description: "Successfully Registered" })
  @UseGuards(IsUserUnique)
  async userRegister(
    @Body() userRegisterDto: UserSignupDto
  ): Promise<UserSignupDto> {
    return await this.userService.createUser(userRegisterDto);
  }

  /////////////////////MY PROFILE
  @Get(constTexts.authRoute.me)
  @HttpCode(HttpStatus.OK)
  @Auth(Action.Read, "User")
  @ApiOkResponse({ type: User, description: "current user info" })
  async getCurrentUser(@AuthUser() user: User) {
    const [profileData, posts, reviews] = await Promise.all([
      this.userService.getProfileData(user.id),
      this.postsService.findByUserId(user.id),
      this.assignedServive.getReviews(user.id),
    ]);

    return {
      profile: profileData,
      posts: posts,
      reviews: reviews,
    };
  }

  // @Get(constTexts.authRoute.logOut)
  // @HttpCode(HttpStatus.OK)
  // @Auth(Action.Read, "User")
  // @ApiOkResponse({ type: User, description: "logOut" })
  // logOut(@AuthUser() user: User) {
  //   return this.userService.logout(user.id);
  // }
}
