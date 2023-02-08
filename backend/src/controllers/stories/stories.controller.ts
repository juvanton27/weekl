import { Controller, Get, Param, Request } from '@nestjs/common';
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
  findAllOwn(@Request() req): Observable<StoryDto[]> {
    const id: number = req.user.userId;
    return this.storiesService.findAllByUserId(id).pipe(
      map((models: Story[]) => models.map(model => StoryMapper.toDto(model))),
      catchError(err => {
        console.warn(err.message);
        return throwError(err);
      })
    )
  }
}
