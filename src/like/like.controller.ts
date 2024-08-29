import { Body, Controller, Post, UseGuards,Request, Get, Query} from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/shared/acl/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.gaurd';
import { Role } from 'src/enums/role.enum';
import { CreateLike } from './dto/createLike.dto';
import { Type } from 'src/enums/type.enum';

@ApiTags('Like')
@Controller('like')
export class LikeController {

    constructor(private likeService:LikeService){}

    @Post('like')
    @Roles(Role.TEACHER,Role.USER)
    @UseGuards(AuthGuard,RolesGuard)
    @ApiOperation({ summary: 'Submit HTML content from CKEditor' })
    @ApiResponse({ status: 201, description: 'User Data' })
    @ApiBody({
      type: CreateLike,
      description: 'Json structure for blog object',
    })
    @ApiBearerAuth()
    @ApiQuery({ name: 'type', enum: Type })
    async LikeForBlog(@Request() req,@Body() createblogLike:CreateLike,@Query('type') type: Type = Type.BLOG): Promise<any> {
        createblogLike.userId=req.user.id;
     const createdBlog= await this.likeService.create(createblogLike);
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
    @Roles(Role.USER,Role.ADMIN,Role.TEACHER)
    @UseGuards(AuthGuard,RolesGuard)
    @ApiResponse({ status: 200, description: 'Blog Data' })
    async getBlog(@Request() req){
    const result = await this.likeService.get();
    if(!result || result==null || result.length === 0){
     return {
        code:401,
        status:"failed",
        message:"No Likes Blog"
     }
    }
  
     return {
     code:200,
     status:"success",
     message:"Blog Likes Fetched Successfully",
     data:result
     }
    }
}
