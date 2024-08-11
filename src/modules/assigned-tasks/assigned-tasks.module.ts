import { Module } from '@nestjs/common';
import { AssignedTasksService } from './assigned-tasks.service';
import { AssignedTasksController } from './assigned-tasks.controller';
import { UserModule } from '../user/user.module';
import { PostsModule } from '../posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignedTaskEntity, AssignedTaskSchema } from './schema/assigned.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AssignedTaskEntity.name, schema: AssignedTaskSchema }]),
    UserModule,
    PostsModule
  ],
  controllers: [AssignedTasksController],
  providers: [AssignedTasksService],
  exports: [AssignedTasksService],
})
export class AssignedTasksModule { }
