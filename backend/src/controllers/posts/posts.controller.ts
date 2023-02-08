import { Controller, Get, Request } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { PostDto } from 'src/dto/post.dto';
import { PostMapper } from 'src/mappers/post.mapper';
import { Post } from 'src/models/post.model';
import { PostsService } from 'src/services/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
  ) { }

  @Get()
  findAllOwn(@Request() req): Observable<PostDto[]> {
    const id: number = req.user.userId;
    return this.postsService.findAllByUserId(id).pipe(
      map((models: Post[]) => models.map(model => PostMapper.toDto(model))),
      catchError(err => {
        console.warn(err.message);
        return throwError(err);
      }),
    );
  }
}
