import { Controller, Get, Param } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { StoryDto } from 'src/dto/story.dto';
import { StoryMapper } from 'src/mappers/story.mapper';
import { Story } from 'src/models/story.model';
import { StoriesService } from 'src/services/stories/stories.service';

@Controller('stories')
export class StoriesController {
  constructor(
    private readonly storiesService: StoriesService,
  ) { }

  @Get()
  findAll(): Observable<StoryDto[]> {
    return this.storiesService.findAll().pipe(
      map((models: Story[]) => models.map(model => StoryMapper.toDto(model))),
      catchError(err => {
        console.warn(err.message);
        return throwError(err);
      })
    );
  }

  /**
   * Find all users who have minimim an active story
   * @returns the array of user ids
   */
  @Get('users')
  findAllActiveUserIds(): Observable<number[]> {
    return this.storiesService.findAllUserIds();
  }

  @Get('user/:id')
  findAllActiveStoriesByUserId(@Param('id') id: number): Observable<StoryDto[]> {
    return this.storiesService.findAllActiveStoriesByUserId(id).pipe(
      map((models: Story[]) => models.map(model => StoryMapper.toDto(model))),
      catchError(err => {
        console.warn(err.message);
        return throwError(err);
      })
    );
  }
}
