import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeRepository } from './repository/like.respository';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { BlogLike, BlogLikeSchema } from 'src/schemas/BlogLike.schema';
import { Like, LikeSchema } from 'src/schemas/Like.schema';
import { Role, RoleSchema } from 'src/schemas/Role.schema';
import { Token, TokenSchema } from 'src/schemas/Token.schema';
import { User, UserSchema } from 'src/schemas/User.schama';
import { LikeController } from './like.controller';
import { BlogModule } from 'src/blog/blog.module';
import { BlogRepository } from 'src/blog/repositroy/blog.repository';
import { BlogService } from 'src/blog/blog.service';
import { Blog, BlogSchema } from 'src/schemas/Blog.schema';

@Module({
  imports: [
    AuthModule,
    BlogModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Token.name, schema:TokenSchema},
      {name: Blog.name,schema:BlogSchema},
      {
        name: Like.name,
        schema: LikeSchema,
        discriminators: [
          { name: BlogLike.name, schema: BlogLikeSchema }
        ],
      },
    ]),
  ],
  providers: [LikeService,LikeRepository,BlogRepository,BlogService],
  exports:[LikeService,LikeRepository],
  controllers: [LikeController]
})
export class LikeModule {}
