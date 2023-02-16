import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { StoryDbo } from 'src/dbo/story.dbo';
import { StoryMapper } from 'src/mappers/story.mapper';
import { Story } from 'src/models/story.model';
import { MoreThan, Repository } from 'typeorm';

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

  findAll(): Observable<Story[]> {
    return from(this.storiesRepository.find()).pipe(
      map((dbos: StoryDbo[]) => dbos.map(dbo => StoryMapper.fromDbo(dbo))),
    );
  }

  findAllUserIds(): Observable<number[]> {
    return from(this.storiesRepository.createQueryBuilder().select('user_id').distinct(true).getRawMany()).pipe(
      map((ids: { user_id: number }[]) => ids.map(({ user_id }) => user_id)),
    );
  }

  findAllActiveStoriesByUserId(id: number): Observable<Story[]> {
    const sevenDaysAgo: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return from(this.storiesRepository.find({
      where: {
        user_id: id,
        date: MoreThan(sevenDaysAgo)
      }
    })).pipe(
      map((dbos: StoryDbo[]) => dbos.map(dbo => StoryMapper.fromDbo(dbo))),
    );
  }
}
