import { Controller, Get, Param } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CommentDto } from 'src/dto/comment.dto';
import { CommentMapper } from 'src/mappers/comment.mapper';
import { Comment } from 'src/models/comment.model';
import { CommentsService } from 'src/services/comments/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
  ) { }

  @Get('post/:id')
  findAllByPostId(@Param('id') id: number): Observable<CommentDto[]> {
    return this.commentsService.findAllByPostId(id).pipe(
      map((models: Comment[]) => models.map(model => CommentMapper.toDto(model))),
      catchError(err => {
        console.warn(err.message);
        return throwError(err);
      }),
    );
  }
}
