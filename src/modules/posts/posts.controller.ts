import {
  Body,
  Controller,
  Delete,
  // Delete,
  Get,
  Param,
  // Patch,
  Post,
  Put,
  Query,
  // UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { constTexts } from "../../constants";
import { ApiConsumes, ApiQuery, ApiTags } from "@nestjs/swagger";
import { PostEntity } from "./schema/post.schema";
import { User } from "../user/user.schema";
import { ApiPageOkResponse, Auth, AuthUser, Public } from "src/decorators";
import { Action } from "src/casl/userRoles";
import { UpdatePostDto } from "./dto/updatePost.dto";
// import { FileUpload } from "src/interceptors/file-upload.interceptor";
import { MultipleFileUpload } from "src/interceptors/multi-upload.interceptor";
import { CreatePost } from "./dto/createPost.dto";
import { LocationDto } from "./dto/location.dto";
import { FilterDto } from "./dto/filterPost.dto";
import { SearchDto } from "./dto/search.dto";
// import { CreatePost } from "./dto/createPost.dto";
// import { UpdatePostDto } from "./dto/posts-update.dto";

@Controller(constTexts.postRoute.name)
@ApiTags(constTexts.postRoute.name)
export class PostsController {
  constructor(private readonly postsService: PostsService) { }




  ////////////////////////////CREATE POST
  @Auth(Action.Create, "Post")
  @Post()
  @UseInterceptors(MultipleFileUpload('images', 10)) // Adjust the field name and max count as needed
  @ApiConsumes('multipart/form-data')
  @ApiPageOkResponse({
    description: "Create Post",
    type: PostEntity,
  })
  async create(
    @AuthUser() user: User,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() createDto: CreatePost
  ) {
    createDto.userId = user.id;

    // Assuming that the PostEntity has an images field which is an array of strings
    createDto.images = images.map(image => image.destination + image.filename);

    if (typeof createDto.location === 'string') {
      createDto.location = JSON.parse(createDto.location);
    }
    console.log(createDto)
    return this.postsService.create(createDto);
  }


  ///////////////////////////////////Update
  @Auth(Action.Update, "Post")
  @Put(constTexts.postRoute.update)
  @UseInterceptors(MultipleFileUpload('images', 10)) // Adjust the field name and max count as needed
  @ApiConsumes('multipart/form-data')
  @ApiPageOkResponse({
    description: "Update Post",
    type: PostEntity,
  })

  async update(
    @AuthUser() user: User,
    @Param("id") id: string,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() updateDatato: UpdatePostDto) {
    if (typeof updateDatato.location === 'string') {
      updateDatato.location = JSON.parse(updateDatato.location);
    }
    console.log(updateDatato)
    const cid = user.id;
    return this.postsService.update(id, updateDatato, cid);
  }

  ///////////////////GET ALL POSTS
  @Get(constTexts.postRoute.getAllPosts)
  @ApiPageOkResponse({
    description: "Get all List",
    type: PostEntity,
  })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  findall(@Query("page") page = 1, @Query("limit") limit = 20) {
    return this.postsService.findall(page, limit);
  }


  ///////////////////GET My POSTS
  @Auth(Action.Read, "Post")
  @Get(constTexts.postRoute.my)
  @ApiPageOkResponse({
    description: "Get My List",
    type: PostEntity,
  })

  async findMy(@AuthUser() user: User) {
    const id = user.id;
    return this.postsService.findMy(id);
  }


  ///////////////////GET  POST by ID

  @Get(constTexts.postRoute.specific)
  @ApiPageOkResponse({
    description: "Get POST",
    type: PostEntity,
  })

  async findById(@Param("id") id: string) {

    return this.postsService.getPostWithAllComments(id);
  }


  ///////////////////GET Users POSTS

  @Get(constTexts.postRoute.users)
  @ApiPageOkResponse({
    description: "Get Users List",
    type: PostEntity,
  })

  async findUP(@Param("id") id: string) {
    console.log(id)
    return this.postsService.findMy(id);
  }


  //////////////////////////DELETE
  @Delete(constTexts.postRoute.delete)
  @ApiPageOkResponse({
    description: "Delete Post",
    type: PostEntity,
  })
  @Auth(Action.Update, "Post")
  async deletePost(@Param("id") id: string) {
    return this.postsService.deletePost(id);
  }



  ////////////////GET WITHIN RADIUS
  @Public()
  @Post(constTexts.postRoute.withinRadius)

  @ApiPageOkResponse({ type: Event, description: "Successfully Fetched" })
  async getWithinRadius(@Body() locationDto: LocationDto): Promise<any> {

    return await this.postsService.getWithinRadius(locationDto);
  }

  // GET Filtered EVENTS 
  @Public()
  @Post(constTexts.postRoute.filter)

  @ApiPageOkResponse({ type: Event, description: "Successfully Fetched" })
  async filteredPosts(@Body() filterDto: FilterDto): Promise<any> {


    return await this.postsService.filterEvents(filterDto);
  }


  //GET Searched Posts 
  @Public()
  @Post(constTexts.postRoute.search)

  @ApiPageOkResponse({ type: Event, description: "Successfully Fetched" })
  async searchedPosts(@Body() searchDto: SearchDto): Promise<any> {
    // console.log(searchDto)

    return await this.postsService.searchEvents(searchDto);
  }
}
