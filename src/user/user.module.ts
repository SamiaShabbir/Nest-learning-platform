import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/schemas/User.schama';
import { RoleSchema, Role } from '../schemas/Role.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { Token,TokenSchema } from 'src/schemas/Token.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Token.name, schema:TokenSchema}
    ]),
  ],
  providers: [UserService,AuthService,AuthRepository],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
