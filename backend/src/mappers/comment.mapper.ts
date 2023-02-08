import { CommentDbo } from "src/dbo/comment.dbo";
import { CommentDto } from "src/dto/comment.dto";
import { Comment } from "src/models/comment.model";

export class CommentMapper {
  static fromDbo(dbo: CommentDbo): Comment {
    return {
      id: dbo.id,
      date: dbo.date,
      label: dbo.label,
      postId: dbo.post_id,
      userId: dbo.user_id,
    }
  }

  static toDto(model: Comment): CommentDto {
    return {
      id: model.id,
      date: model.date,
      label: model.label,
      postId: model.postId,
      userId: model.userId,
    }
  }
}