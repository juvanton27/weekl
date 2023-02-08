import { ConversationDbo } from "src/dbo/conversations.dbo";
import { ConversationDto } from "src/dto/conversation.dto";
import { Conversation } from "src/models/conversation.model";

export class ConversationMapper {
  static fromDbo(dbo: ConversationDbo): Conversation {
    return {
      id: dbo.id,
      userId1: dbo.user_id_1,
      userId2: dbo.user_id_2,
    }
  }

  static toDto(model: Conversation): ConversationDto {
    return {
      id: model.id,
      userId1: model.userId1,
      userId2: model.userId2,
    }
  }
}