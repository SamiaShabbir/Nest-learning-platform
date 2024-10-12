/* eslint-disable prettier/prettier */
import { Param,Body, Controller, Post, UseGuards,Request, Get,Put,Delete, UseInterceptors, UploadedFiles, UploadedFile} from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiResponse, ApiBody, ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { CreateBlog } from './dto/CreateBlog.dto';
import { Roles } from 'src/shared/acl/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/shared/guards/roles.gaurd';
import { CreateLike } from 'src/like/dto/createLike.dto';
import { CreateBlogLike } from './dto/CreateLike.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}
  @Post('create')
  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiOperation({ summary: 'Submit HTML content from CKEditor' })
  @ApiResponse({ status: 201, description: 'User Data' })
  @ApiBody({
    type: CreateBlog,
    description: 'Json structure for blog object',
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image')) // 'file' is the name of the form field
  async create(@Request() req,@Body() createBlogDto:CreateBlog,
  @UploadedFile() image: Express.Multer.File
): Promise<any> {
  const projectRoot = path.resolve(__dirname, '../../');
  const uploadDir = path.join(projectRoot, 'src/uploads');

  if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory and any necessary parent directories
  }

  const saveFile = (file: Express.Multer.File, fieldName: string) => {
      const fileName = `${fieldName}-${Date.now()}-${file.originalname}`;

      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, file.buffer);
      return path.join('uploads', fileName); // Return the relative path
  };

  const file = image;

  const filePath = file ? saveFile(file, 'blogimage') : null;
   const createdBlog= await this.blogService.create({...createBlogDto,image:filePath},req.user.id);
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
  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard,RolesGuard)
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

  @Get('admin')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'All Blog Data' })
  @ApiOperation({ summary: 'Api to show the all blogs to any viewer' })
  async GetAllForAdmin(){
    const result=await this.blogService.Get();
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
  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'Enter the blogId'
  })
  @ApiBody({
    type: CreateBlog,
  })
  @ApiConsumes('multipart/form-data')

  @UseInterceptors(FileInterceptor('image')) // 'file' is the name of the form field
  async update (@Param('id') id:string,
  @Body() createblogDto:CreateBlog,
  @UploadedFile() image: Express.Multer.File
){
    const projectRoot = path.resolve(__dirname, '../../');
  const uploadDir = path.join(projectRoot, 'src/uploads');

  if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory and any necessary parent directories
  }

  const saveFile = (file: Express.Multer.File, fieldName: string) => {
      const fileName = `${fieldName}-${Date.now()}-${file.originalname}`;

      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, file.buffer);
      return path.join('uploads', fileName); // Return the relative path
  };

  const file = image;

  const filePath = file ? saveFile(file, 'blogimage') : null;
    if(file && filePath!==null){
      createblogDto.image=filePath;
    }
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
  @Roles(Role.TEACHER,Role.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
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