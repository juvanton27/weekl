import { UserDbo } from "src/dbo/user.dbo";
import { UserDto } from "src/dto/user.dto";
import { User } from "src/models/user.model";

export class UserMapper {
  static fromDbo(dbo: UserDbo): User {
    return {
      id: dbo.id,
      username: dbo.username,
      password: dbo.password,
      picture: dbo.picture
    }
  }

  static toDto(model: User): UserDto {
    return {
      id: model.id,
      username: model.username,
      picture: model.picture
    }
  }
}