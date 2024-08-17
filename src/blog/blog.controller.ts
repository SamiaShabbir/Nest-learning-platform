/* eslint-disable prettier/prettier */
import { Param,Body, Controller, Post, UseGuards,Request, Get} from '@nestjs/common';
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

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Blog Data' })
  async getBlog(@Request() req){
   // console.log(req.user);
  const result = await this.blogService.get(req.user.id);
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
}
