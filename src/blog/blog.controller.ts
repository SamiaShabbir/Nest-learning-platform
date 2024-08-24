/* eslint-disable prettier/prettier */
import { Param,Body, Controller, Post, UseGuards,Request, Get,Put,Delete} from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiBody, ApiBearerAuth, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateBlog } from './dto/CreateBlog.dto';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}
  @Post('create')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Submit HTML content from CKEditor' })
  @ApiResponse({ status: 201, description: 'User Data' })
  @ApiBody({
    type: CreateBlog,
    description: 'Json structure for blog object',
  })
  @ApiBearerAuth()
  async create(@Request() req,@Body() createBlogDto:CreateBlog): Promise<any> {
   
   const createdBlog= await this.blogService.create(createBlogDto,req.user.id);
   if(!createdBlog){
      return {
         code:401,
         status:"failed",
         message:"Something Went Wrong Try Again"
       };
   } 
   return {
      code:201,
      status:"success",
      message:"Blog Created Successfully",
      data:createdBlog
   }
  }

  //Get Logged In User Blog Ony
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Blog Data' })
  async getBlog(@Request() req){
   // console.log(req.user);
  const result = await this.blogService.get(req.user.id);
  if(!result || result==null || result.length === 0){
   return {
      code:401,
      status:"failed",
      message:"User Don't Have Any Blog Post"
   }
  }

    return {
   code:200,
   status:"success",
   message:"Blog Posts Data Fetched Successfully",
   data:result
   }
  }

  

  @Get('posts')
  @ApiResponse({ status: 200, description: 'All Blog Data' })
  @ApiOperation({ summary: 'Api to show the all blogs to any viewer' })
  async GetAll(){
    const result=await this.blogService.GetAll();
    if(!result){
      return {
        code:401,
        status:"failed",
        message:"No Data Found"
     }  
    }
    return {
      code:200,
      status:"success",
      message:"Data Fetched Successfully",
      data:result
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id'
  })
  @ApiResponse({ status: 200, description: 'Blog Data' })
  async getBlogById(@Param('id') id: string){
  const result = await this.blogService.getById(id);
  if(!result){
   return {
      code:401,
      status:"failed",
      message:"User Don't Have Any Blog Post"
   }
  }

    return {
   code:200,
   status:"success",
   message:"Blog Posts Data Fetched Successfully",
   data:result
   }
  }
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'Enter the blogId'
  })
  @ApiBody({
    type: CreateBlog,
  })
  async update (@Param('id') id:string,
  @Body() createblogDto:CreateBlog){
    
    const result= await this.blogService.update(id,createblogDto);
    console.log(result);
    if(!result || result==null){
      return {
        code:401,
        status:"failed",
        message:"blog not found"
      }
    }

    return {
      code:200,
      status:"success",
      message:"blog updated successfully",
      data:result
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async deleteBlog(@Param('id') id:string){
     const result= await this.blogService.delete(id);
     if(!result){
      return {
        code:403,
        status:"failed",
        message:"Error Occured Try Again"
      };
     }
     return {
      code:200,
      status:"success",
      message:"Post Deleted Successfully"
     }
  }

}
