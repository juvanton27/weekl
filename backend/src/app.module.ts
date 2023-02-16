import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CommentsController } from './controllers/comments/comments.controller';
import { PostsController } from './controllers/posts/posts.controller';
import { StoriesController } from './controllers/stories/stories.controller';
import { CommentDbo } from './dbo/comment.dbo';
import { ConversationDbo } from './dbo/conversations.dbo';
import { MessageDbo } from './dbo/message.dbo';
import { PostDbo } from './dbo/post.dbo';
import { StoryDbo } from './dbo/story.dbo';
import { UserDbo } from './dbo/user.dbo';
import { CommentsService } from './services/comments/comments.service';
import { PostsService } from './services/posts/posts.service';
import { StoriesService } from './services/stories/stories.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'azerty12345',
      database: 'weekl',
      entities: [UserDbo, StoryDbo, PostDbo, CommentDbo, ConversationDbo, MessageDbo],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([StoryDbo, PostDbo, CommentDbo, ConversationDbo, MessageDbo]),
  ],
  controllers: [AppController, StoriesController, PostsController, CommentsController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    StoriesService,
    PostsService,
    CommentsService
  ],
})

export class AppModule {
  constructor(private dataSource: DataSource) { }
}