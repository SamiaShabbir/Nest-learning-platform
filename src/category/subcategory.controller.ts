import { Request,Body, Controller, Post, UseGuards, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSubCategory } from './dto/create-subcategory.dto';
import { SubcategoryService } from './subcategory.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from '../enums/role.enum';
import { Roles } from 'src/shared/acl/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.gaurd';

// @ApiTags('subcategory')
@Controller('subcategory')
export class SubcategoryController {

    constructor(private subcategoryService:SubcategoryService){}
   //  @Post('create')
   //  @Roles(Role.TEACHER,Role.ADMIN)
   //  @UseGuards(AuthGuard, RolesGuard)
   //  @ApiBearerAuth()
   //  @ApiOperation({ summary: 'Upload lesson with PDF and video files' })
   //  @ApiResponse({ status: 201, description: 'The lesson has been successfully created.' })
   //  @ApiResponse({ status: 400, description: 'Invalid input' })
   //  async createCategory(
   //      @Request() req,
   //      @Body()   createsubcategoryDto:CreateSubCategory
   //  ){
   //      createsubcategoryDto.user_id=req.user.id;
   //   const result =await this.subcategoryService.create(createsubcategoryDto);
   //   if(!result || result==null){
   //      return{
   //          code:401,
   //          status:"failed",
   //          message:"Something Went Wrong Try Again"
   //      }        
   //   }
   //   return {
   //      code:200,
   //      status:"success",
   //      message:"Category Created Sucessfully",
   //      data:result
   //   }
   //  }
   //  @Get('all')
   //  async getCategory(){
   //   const result =await this.subcategoryService.get();
   //   if(!result || result==null || result.length === 0){
   //      return{
   //          code:401,
   //          status:"failed",
   //          message:"Something Went Wrong Try Again"
   //      }        
   //   }
   //   return {
   //      code:200,
   //      status:"success",
   //      message:"Sub Category Fetched Sucessfully",
   //      data:result
   //   }
   //  }

   //  @Get(':id')
   //  async getById(@Param('id') id:string){
   //   const result =await this.subcategoryService.getById(id);
   //   if(!result || result==null){
   //      return {
   //         code:401,
   //         status:"failed",
   //         message:"Don't Have Category"
   //      }
   //     }
   //   return {
   //      code:200,
   //      status:"success",
   //      message:"Sub Category Fetched Sucessfully",
   //      data:result
   //   }
   //  }

   //  @Put(':id')
   //  @Roles(Role.TEACHER)
   //  @UseGuards(AuthGuard,RolesGuard)
   //  @ApiBearerAuth()
   //  @ApiParam({
   //    name: 'id',
   //    description: 'Enter the sub cateogory Id'
   //  })
   //  @ApiBody({
   //    type: CreateSubCategory,
   //  })
   //  async update (@Param('id') id:string,
   //  @Body() createsubcreateDto:CreateSubCategory){
      
   //    const result= await this.subcategoryService.update(id,createsubcreateDto);
   //    console.log(result);
   //    if(!result || result==null){
   //      return {
   //        code:401,
   //        status:"failed",
   //        message:"Sub Category not found"
   //      }
   //    }
  
   //    return {
   //      code:200,
   //      status:"success",
   //      message:"Sub Category updated successfully",
   //      data:result
   //    }
   //  }
}
