import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { StoryDbo } from 'src/dbo/story.dbo';
import { StoryMapper } from 'src/mappers/story.mapper';
import { Story } from 'src/models/story.model';
import { Repository } from 'typeorm';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(StoryDbo)
    private readonly storiesRepository: Repository<StoryDbo>
  ) { }

  findAllByUserId(id: number): Observable<Story[]> {
    return from(this.storiesRepository.findBy({ user_id: id })).pipe(
      map((dbos: StoryDbo[]) => dbos.map(dbo => StoryMapper.fromDbo(dbo))),
    );
  }
}
