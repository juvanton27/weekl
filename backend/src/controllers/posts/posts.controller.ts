import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostDto } from 'src/dto/post.dto';
import { PostMapper } from 'src/mappers/post.mapper';
import { Post } from 'src/models/post.model';
import { PostsService } from 'src/services/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
  ) { }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAllByUserId(@Param('id') id: number): Observable<PostDto[]> {
    return this.postsService.findAllByUserId(id).pipe(
      map((models: Post[]) => models.map(model => PostMapper.toDto(model))),
      catchError(err => {
        console.warn(err.message);
        return throwError(err);
      }),
    );
  }
}
