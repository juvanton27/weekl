import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { CommentDbo } from 'src/dbo/comment.dbo';
import { CommentMapper } from 'src/mappers/comment.mapper';
import { Comment } from 'src/models/comment.model';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentDbo)
    private readonly commentsRepository: Repository<CommentDbo>
  ) { }

  findAllByPostId(id: number): Observable<Comment[]> {
    return from(this.commentsRepository.findBy({ post_id: id })).pipe(
      map((dbos: CommentDbo[]) => dbos.map(dbo => CommentMapper.fromDbo(dbo))),
    );
  }
}
