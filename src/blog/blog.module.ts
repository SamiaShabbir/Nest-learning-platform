import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from './repositroy/blog.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/User.schama';
import { Blog,BlogSchema } from '../schemas/Blog.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { AuthService } from 'src/auth/auth.service';
import { Token, TokenSchema } from 'src/schemas/Token.schema';
import { AuthModule } from 'src/auth/auth.module';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
import { LikeModule } from 'src/like/like.module';
import { LikeRepository } from 'src/like/repository/like.respository';
import { LikeService } from 'src/like/like.service';
import { BlogLike, BlogLikeSchema } from 'src/schemas/BlogLike.schema';
import { Like, LikeSchema } from 'src/schemas/Like.schema';
import { CategoryModule } from 'src/category/category.module';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { SubCategory, SubCategorySchema } from 'src/schemas/SubCategory';
import { Category, CategorySchema } from 'src/schemas/Category.schema';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Blog.name, schema:BlogSchema  },
      { name: Token.name, schema:TokenSchema},
      { name: Category.name, schema:CategorySchema},
      { name:SubCategory.name, schema:SubCategorySchema}
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [BlogController],
  providers: [ BlogService,
               BlogRepository,
               AuthService,
               AuthRepository,
               CategoryRepository
             ],
  exports:[BlogRepository,BlogService]
})
export class BlogModule {}
