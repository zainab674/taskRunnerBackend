import { HttpException, Injectable } from '@nestjs/common';
import { CreateAssignedTaskDto } from './dto/create-assigned-task.dto';
import { UpdateAssignedTaskDto } from './dto/update-assigned-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssignedTaskEntity, AssignedTaskDocument } from './schema/assigned.schema';
import { ResponseCode } from 'src/exceptions';

import { PostsService } from '../posts/posts.service';

@Injectable()
export class AssignedTasksService {

  constructor(
    @InjectModel(AssignedTaskEntity.name) private schemaModel: Model<AssignedTaskDocument>,

    private postService: PostsService
  ) { }

  // TASKS CREATED BY USER 
  async create(createAssignedTaskDto: CreateAssignedTaskDto): Promise<AssignedTaskDocument> {
    const task = await this.postService.findById(createAssignedTaskDto.taskId);

    if (!task) {
      throw new HttpException("Task not found", ResponseCode.NOT_FOUND);
    }

    if (task.userId.toString() !== createAssignedTaskDto.OwnerId) {
      throw new HttpException("Unauthorized", ResponseCode.UNAUTHORIZED);
    }

    if (task.isCompleted) {
      throw new HttpException("Task already completed", ResponseCode.BAD_REQUEST);
    }

    createAssignedTaskDto.isCompleted = task.isCompleted;

    const already = await this.schemaModel.findOne({ taskId: createAssignedTaskDto.taskId }).exec()
    console.log(already)
    if (already) {
      throw new HttpException("Task already assigned", ResponseCode.BAD_REQUEST);
    }

    const createTask: AssignedTaskDocument = new this.schemaModel(createAssignedTaskDto);

    return await createTask.save().catch((err) => {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    });
  }

  // TASKS ASSIGNED BY USER
  async ownerAssigns(id: string) {
    const data = await this.schemaModel.find({ OwnerId: id })
    if (data) {
      return data
    }
    else {
      throw new HttpException("No Tasks Assigned", ResponseCode.BAD_REQUEST);
    }

  }

  // TASKS ASSIGNED TO USER 
  async runnerAssigns(id: string) {
    const data = await this.schemaModel.find({ taskRunnerId: id })
    if (data) {
      return data
    }
    else {
      throw new HttpException("No Tasks Assigned To Me", ResponseCode.BAD_REQUEST);
    }

  }


  //UPDATE GET REVIEWS
  async update(id: string, updateAssignedTaskDto: UpdateAssignedTaskDto, userId: string) {
    try {
      const verify = await this.schemaModel.findOne({ taskId: id });

      if (!verify) {
        throw new HttpException('Post not found', ResponseCode.NOT_FOUND);
      }

      if (verify.OwnerId.toString() !== userId) {
        throw new HttpException("Unauthorized", ResponseCode.UNAUTHORIZED);
      }
      updateAssignedTaskDto.isCompleted = true;

      const updateData = await this.schemaModel
        .findByIdAndUpdate(verify.id, updateAssignedTaskDto, { new: true })
        .exec();

      return { data: updateData };
    } catch (err) {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    }
  }

  //REMOVE TASK
  async remove(id: string, userId: string) {
    const verify = await this.schemaModel.findOne({ taskId: id }).exec();
    if (!verify) {
      throw new HttpException("Document not found", ResponseCode.NOT_FOUND);
    }
    if (verify.OwnerId.toString() !== userId) {
      throw new HttpException("Unauthorized", ResponseCode.UNAUTHORIZED);
    }
    await this.schemaModel.deleteOne({ taskId: id }).exec();

    return { message: "Successfully deleted" };
  }

  // CALCULATED FINAL RATING OF USER 
  async getFinalRating(userId: string): Promise<{ averageOwnerRating: number; averageTaskRunnerRating: number }> {
    try {
      // Fetch all tasks where the user is either the owner or task runner
      const tasks = await this.schemaModel.find({
        $or: [{ OwnerId: userId }, { taskRunnerId: userId }]
      }).exec();

      if (tasks.length === 0) {
        throw new HttpException("No tasks found for the user", 404);
      }

      let totalOwnerRating = 0;
      let totalTaskRunnerRating = 0;
      let ownerRatingCount = 0;
      let taskRunnerRatingCount = 0;

      // Calculate total ratings and counts
      tasks.forEach(task => {
        if (task.OwnerId.toString() === userId && task.ownerRating) {
          totalOwnerRating += task.ownerRating;
          ownerRatingCount++;
        }
        if (task.taskRunnerId.toString() === userId && task.taskRunnerRating) {
          totalTaskRunnerRating += task.taskRunnerRating;
          taskRunnerRatingCount++;
        }
      });

      // Calculate averages
      const averageOwnerRating = ownerRatingCount > 0 ? totalOwnerRating / ownerRatingCount : 0;
      const averageTaskRunnerRating = taskRunnerRatingCount > 0 ? totalTaskRunnerRating / taskRunnerRatingCount : 0;

      return {
        averageOwnerRating,
        averageTaskRunnerRating,
      };
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }

  // REVIEWS OF USER
  async getReviews(userId: string): Promise<any> {
    try {
      // Fetch all tasks where the user is the task runner
      const tasks = await this.schemaModel.find({
        taskRunnerId: userId
      }).exec();

      if (tasks.length === 0) {
        throw new HttpException('No tasks found for the user', 404);
      }

      const reviews = tasks.map(task => ({
        userId: task.OwnerId, // Include the taskRunnerId
        taskRunnerRatingReview: task.taskRunnerRatingReview // Include the rating review
      }));

      if (reviews.length === 0) {
        throw new HttpException('No reviews found for the user', 404);
      }

      return reviews;
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }


  //ACCEPTED BY USER
  async accepted(id: string, cid: string) {
    try {
      const verify = await this.schemaModel.findById(id);

      if (!verify) {
        throw new HttpException('Post not found', ResponseCode.NOT_FOUND);
      }

      if (verify.taskRunnerId.toString() !== cid) {
        throw new HttpException('Unauthorized', ResponseCode.UNAUTHORIZED);
      }
      const accepted = true;
      const updateData = await this.schemaModel
        .findByIdAndUpdate(id, { accepted }, { new: true })
        .exec();

      return { data: updateData };
    } catch (err) {
      throw new HttpException(err.message, ResponseCode.BAD_REQUEST);
    }
  }

  ///TASKS COMPLETED BY USER
  async completedByUser(id: string): Promise<any> {
    try {

      const completedTasks = await this.schemaModel.find({
        taskRunnerId: id,
        isCompleted: true,
      }).exec();

      if (completedTasks.length === 0) {
        throw new HttpException('No completed tasks by the user', 404);
      }

      return completedTasks;
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }

  //TASKS COMPLETED FOR USER
  async completedForUser(id: string): Promise<any> {
    try {

      const completedTasks = await this.schemaModel.find({
        OwnerId: id,
        isCompleted: true,
      }).exec();

      if (completedTasks.length === 0) {
        throw new HttpException('No completed tasks found for the user', 404);
      }

      return completedTasks;
    } catch (err) {
      throw new HttpException(err.message, 500);
    }
  }
}

