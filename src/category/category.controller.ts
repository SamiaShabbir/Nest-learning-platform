import { Request,Controller, Post, UseGuards, Body, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from '../enums/role.enum';
import { Roles } from 'src/shared/acl/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.gaurd';
import { CreateCategory } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { CreateBlog } from 'src/blog/dto/CreateBlog.dto';

@Controller('category')
@ApiTags('category')
export class CategoryController {

    constructor(private categoryService:CategoryService){}
    @Post('create')
    @Roles(Role.TEACHER,Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Upload lesson with PDF and video files' })
    @ApiResponse({ status: 201, description: 'The lesson has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    async createCategory(
        @Request() req,
        @Body()   createcategoryDto:CreateCategory
    ){
        createcategoryDto.user_id=req.user.id;
     const result =await this.categoryService.create(createcategoryDto);
     if(!result || result==null){
        return{
            code:401,
            status:"failed",
            message:"Something Went Wrong Try Again"
        }        
     }
     return {
        code:200,
        status:"success",
        message:"Category Created Sucessfully",
        data:result
     }
    }

    @Get('all')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async getCategory(){
     const result =await this.categoryService.get();
     if(!result || result==null || result.length === 0){
        return{
            code:401,
            status:"failed",
            message:"Something Went Wrong Try Again"
        }        
     }
     return {
        code:200,
        status:"success",
        message:"Category Fetched Sucessfully",
        data:result
     }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async getById(@Param('id') id:string){
     const result =await this.categoryService.getById(id);
     if(!result || result==null){
        return {
           code:401,
           status:"failed",
           message:"Don't Have Category"
        }
       }
     return {
        code:200,
        status:"success",
        message:"Category Fetched Sucessfully",
        data:result
     }
    }

    @Put(':id')
    @Roles(Role.TEACHER)
    @UseGuards(AuthGuard,RolesGuard)
    @ApiBearerAuth()
    @ApiParam({
      name: 'id',
      description: 'Enter the blogId'
    })
    @ApiBody({
      type: CreateCategory,
    })
    async update (@Param('id') id:string,
    @Body() createcreateDto:CreateCategory){
      
      const result= await this.categoryService.update(id,createcreateDto);
      console.log(result);
      if(!result || result==null){
        return {
          code:401,
          status:"failed",
          message:"Category not found"
        }
      }
  
      return {
        code:200,
        status:"success",
        message:"Category updated successfully",
        data:result
      }
    }

}
