import { StoryDbo } from "src/dbo/story.dbo";
import { StoryDto } from "src/dto/story.dto";
import { Story } from "src/models/story.model";

export class StoryMapper {
  static fromDbo(dbo: StoryDbo): Story {
    return {
      id: dbo.id,
      date: dbo.date,
      video: dbo.video,
      userId: dbo.user_id,
      description: dbo.description
    }
  }

  static toDto(model: Story): StoryDto {
    return {
      id: model.id,
      date: model.date,
      video: model.video,
      userId: model.userId,
      description: model.description
    }
  }
}