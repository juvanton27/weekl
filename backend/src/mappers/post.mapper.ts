import { PostDbo } from "src/dbo/post.dbo";
import { PostDto } from "src/dto/post.dto";
import { Post } from "src/models/post.model";

export class PostMapper {
  static fromDbo(dbo: PostDbo): Post {
    return {
      id: dbo.id,
      date: dbo.date,
      picture: dbo.picture,
      userId: dbo.user_id,
      description: dbo.description,
    }
  }

  static toDto(model: Post): PostDto {
    return {
      id: model.id,
      date: model.date,
      picture: model.picture,
      userId: model.userId,
      description: model.description,
    }
  }
}