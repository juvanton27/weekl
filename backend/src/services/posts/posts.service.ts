import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { PostDbo } from 'src/dbo/post.dbo';
import { PostMapper } from 'src/mappers/post.mapper';
import { Post } from 'src/models/post.model';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostDbo)
    private readonly postsRepository: Repository<PostDbo>
  ) { }

  findAllByUserId(id: number): Observable<Post[]> {
    return from(this.postsRepository.findBy({ user_id: id })).pipe(
      map((dbos: PostDbo[]) => dbos.map(dbo => PostMapper.fromDbo(dbo))),
    );
  }
}
