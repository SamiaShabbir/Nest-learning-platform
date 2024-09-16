import { SubCategoryRepository } from './repository/subcategory.repository';
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';
import { CategoryRepository } from './repository/category.repository';
import { Category, CategorySchema } from 'src/schemas/Category.schema';
import { SubCategory, SubCategorySchema } from 'src/schemas/SubCategory';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Role, RoleSchema } from 'src/schemas/Role.schema';
import { Token, TokenSchema } from 'src/schemas/Token.schema';
import { User, UserSchema } from 'src/schemas/User.schama';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Token.name, schema:TokenSchema},
      { name: Category.name, schema:CategorySchema},
      { name:SubCategory.name, schema:SubCategorySchema},
    ]),
  ],
  controllers: [CategoryController,SubcategoryController],
  providers: [CategoryService,SubcategoryService,CategoryRepository,SubCategoryRepository],
  exports:[CategoryRepository,SubCategoryRepository]
})
export class CategoryModule {}
