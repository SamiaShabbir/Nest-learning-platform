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
import { Like, LikeSchema } from 'src/schemas/Like.schema';
import { BlogLike, BlogLikeSchema } from 'src/schemas/BlogLike.schema';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    AuthModule,
    EmailModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Token.name, schema:TokenSchema},
    ]),
  ],
  providers: [UserService,AuthService,AuthRepository,EmailService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
