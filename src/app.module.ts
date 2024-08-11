// import { MailerModule } from "@nestjs-modules/mailer";
// import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
// import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CaslModule } from "./casl/casl.module";
import { ConfigurationModule } from "./configuration/configuration.module";
import { ConfigurationService } from "./configuration/configuration.service";
// import { LoggerModule } from "./logger/logger.module";
import { AuthModule } from "./modules/auth/auth.module";
// import { MailModule } from "./modules/mail/mail.module";
// import { AppConfig } from "./configuration/app.config";
import { PostsModule } from "./modules/posts/posts.module";
import { AssignedTasksModule } from './modules/assigned-tasks/assigned-tasks.module';
import { CommentsModule } from './modules/comments/comments.module';
import { SocketModule } from "./modules/socket/socket.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigurationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    // MailModule,
    // MailerModule.forRoot({
    //   // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
    //   // or
    //   transport: {
    //     // host: 'smtp.example.com',
    //     host: AppConfig.sendGridConfig.host,
    //     secure: AppConfig.sendGridConfig.secure,
    //     // port: AppConfig.sendGridConfig.port,
    //     auth: {
    //       user: AppConfig.sendGridConfig.user,
    //       pass: AppConfig.sendGridConfig.password,
    //     },
    //   },
    //   defaults: {
    //     from: AppConfig.sendGridConfig.email,
    //   },
    //   template: {
    //     dir: join(__dirname, "../src/views"),
    //     adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigurationService) =>
        configService.mongooseConfig,
      inject: [ConfigurationService],
    }),
    // LoggerModule,
    AuthModule,
    CaslModule,
    PostsModule,
    AssignedTasksModule,
    CommentsModule,
    SocketModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Specify the directory
    }),
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule],
})
export class AppModule { }
