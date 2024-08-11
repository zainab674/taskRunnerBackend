import { Controller, Get, Post, Body, Param, Delete, HttpException, Put, } from '@nestjs/common';
import { AssignedTasksService } from './assigned-tasks.service';
import { CreateAssignedTaskDto } from './dto/create-assigned-task.dto';
// import { UpdateAssignedTaskDto } from './dto/update-assigned-task.dto';
import { Action } from 'src/casl/userRoles';
import { ApiPageOkResponse, Auth, AuthUser } from 'src/decorators';
import { AssignedTaskEntity } from './schema/assigned.schema';
import { User } from '../user/user.schema';
import { ApiTags } from '@nestjs/swagger';
import { constTexts } from 'src/constants';
import { ResponseCode } from 'src/exceptions';
import { UpdateAssignedTaskDto } from './dto/update-assigned-task.dto';
import { PostsService } from '../posts/posts.service';
// import { UpdatePostDto } from '../posts/dto/updatePost.dto';

@Controller(constTexts.assignedRoute.name)
@ApiTags(constTexts.assignedRoute.name)
export class AssignedTasksController {
  constructor(private readonly assignedTasksService: AssignedTasksService,
    private postService: PostsService
  ) { }

  @Auth(Action.Create, "Post")
  @Post()
  @ApiPageOkResponse({
    description: "Assigned Post",
    type: AssignedTaskEntity,
  })
  async create(
    @AuthUser() user: User,
    @Body() createAssignedTaskDto: CreateAssignedTaskDto) {
    createAssignedTaskDto.OwnerId = user.id

    return this.assignedTasksService.create(createAssignedTaskDto);
  }


  @Auth(Action.Create, "Post")
  @Get(constTexts.assignedRoute.byMe)
  @ApiPageOkResponse({
    description: "Feteched Assigned Post",
    type: AssignedTaskEntity,
  })
  async ownerAssigns(@AuthUser() user: User,) {
    const ownerId = user.id
    return this.assignedTasksService.ownerAssigns(ownerId);
  }

  @Auth(Action.Create, "Post")
  @Get(constTexts.assignedRoute.toMe)
  @ApiPageOkResponse({
    description: "Feteched Assigned Post",
    type: AssignedTaskEntity,
  })
  async runnerAssigns(@AuthUser() user: User,) {
    const Id = user.id
    return this.assignedTasksService.runnerAssigns(Id);
  }

  @Auth(Action.Create, "Post")
  @Delete(constTexts.assignedRoute.delete)
  @ApiPageOkResponse({
    description: " UnAssigned Post",
    type: AssignedTaskEntity,
  })
  async remove(@Param('id') id: string,
    @AuthUser() user: User,) {
    const userId = user.id
    return this.assignedTasksService.remove(id, userId);
  }


  @Auth(Action.Create, "Post")
  @Put(constTexts.assignedRoute.update)
  @ApiPageOkResponse({
    description: " Update Assigned Post",
    type: AssignedTaskEntity,
  })
  async update(
    @Param('id') id: string,
    @Body() updateAssignedTaskDto: UpdateAssignedTaskDto,
    @AuthUser() user: User,

  ) {
    const userId = user.id;

    try {
      const result = await this.assignedTasksService.update(id, updateAssignedTaskDto, userId);

      const res = await this.postService.completed(id, userId)
      return { result, res };
    } catch (err) {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    }
  }


  @Get(constTexts.assignedRoute.finalrating)
  async getFinalRating(@Param('userId') userId: string) {
    return this.assignedTasksService.getFinalRating(userId);
  }


  @Get(constTexts.assignedRoute.myCompTasks)
  async getMyCompTasks(@Param('userId') userId: string) {
    return this.assignedTasksService.completedForUser(userId);
  }



  @Get(constTexts.assignedRoute.compTaskByMe)
  async completedByUser(@Param('userId') userId: string) {

    return this.assignedTasksService.completedByUser(userId);
  }



  @Auth(Action.Create, "Post")
  @Put(constTexts.assignedRoute.accept)
  @ApiPageOkResponse({
    description: " Update Assigned Post",
    type: AssignedTaskEntity,
  })
  async accepted(
    @Param('id') id: string,
    @AuthUser() user: User,

  ) {
    const userId = user.id;

    try {


      const res = await this.postService.completed(id, userId)
      return { res };
    } catch (err) {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    }
  }
}
