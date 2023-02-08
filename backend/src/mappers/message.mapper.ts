import { MessageDbo } from "src/dbo/message.dbo";
import { MessageDto } from "src/dto/message.dto";
import { Message } from "src/models/message.model";

export class MessageMapper {
  static fromDbo(dbo: MessageDbo): Message {
    return {
      id: dbo.id,
      content: dbo.content,
      date: dbo.date,
      userId: dbo.user_id,
      conversationId: dbo.conversation_id,
    }
  }

  static toDto(model: Message): MessageDto {
    return {
      id: model.id,
      content: model.content,
      date: model.date,
      userId: model.userId,
      conversationId: model.conversationId,
    }
  }
}