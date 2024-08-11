import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { HttpModule } from '@nestjs/axios';
import { AssignedTasksModule } from '../assigned-tasks/assigned-tasks.module';
import { PostsModule } from '../posts/posts.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    AssignedTasksModule,
    HttpModule,
    PostsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
