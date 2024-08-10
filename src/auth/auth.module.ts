import { Module ,MiddlewareConsumer,RequestMethod} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schama';
import { Role, RoleSchema } from '../schemas/Role.schema';
import { Token,TokenSchema } from '../schemas/Token.schema';
import {AuthMiddleware} from './auth.middleware';
import { AuthRepository } from './repositories/auth.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthRepository,AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        // { path: 'auth/profile', method: RequestMethod.GET },
        { path: 'auth/logout', method: RequestMethod.GET }
      );    
  }
}
