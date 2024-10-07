import { Request, Body, Controller, Post, UseGuards, Get, Param, BadRequestException, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/shared/acl/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.gaurd';
import { CreateCourseDto } from './dto/createcourse.dto';

@Controller('course')
@ApiTags('course')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Post('create')
    @Roles(Role.TEACHER)
    @UseGuards(AuthGuard,RolesGuard)
    @ApiOperation({ summary: 'Api to create course' })
    @ApiResponse({ status: 201, description: 'Course Data' })
    @ApiBody({
      type: CreateCourseDto,
      description: 'Json structure for blog object',
    })
    @ApiBearerAuth()
    async CreateCourse(@Request() req,@Body() createcourseDto:CreateCourseDto) {
      createcourseDto.user_id=req.user.id;
      const result=await this.courseService.create(createcourseDto);
      if(!result || result==null){
        return {
           code:401,
           status:"failed",
           message:"Something Went Wrong Try Again"
         };
     } 
     return {
        code:201,
        status:"success",
        message:"Course Created Successfully",
        data:result
     }
    }

    @Get('all-course')
    async GetAll(){
        const result =await this.courseService.get();
        if(!result || result==null || result.length===0){
            return {
                code:401,
                status:"failed",
                message:"No Data Found"
              }; 
        }

        return{
            code:200,
            status:"success",
            message:"Courses Fetched Successfully",
            data:result
        }
    }    

    

  @Put(':id')
  @Roles(Role.TEACHER)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'Enter the CourseId'
  })
  @ApiBody({
    type: CreateCourseDto,
  })
  async update (@Param('id') id:string,
  @Body() createcourseDto:CreateCourseDto,@Request() req){
    
    const result= await this.courseService.update(id,createcourseDto,req.user.id);
    console.log(result);
    if(!result || result==null){
      return {
        code:401,
        status:"failed",
        message:"Course not found"
      }
    }

    return {
      code:200,
      status:"success",
      message:"Course updated successfully",
      data:result
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'enter the course Id',
  })
  async getbyId(@Param('id') id:string){
    console.log("courseId",id);
    if (!id || id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(id)) {
        throw new BadRequestException('Invalid userId format. Must be a 24-character hex string.');
      }
    const result =await this.courseService.GetById(id);
    if(!result || result==null){
        return {
            code:401,
            status:"failed",
            message:"No Data Found"
          }; 
    }

    return{
        code:200,
        status:"success",
        message:"Courses Fetched Successfully",
        data:result
    }
  }
  @Get('user/:id')
  @ApiParam({name: 'id'})
  async GetCourseByUserId(@Param('id') id: string){
      console.log("userId",id);
      if (!id || id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(id)) {
          throw new BadRequestException('Invalid userId format. Must be a 24-character hex string.');
        }
      const result =await this.courseService.getByUserId(id);
      if(!result || result==null || result.length===0){
          return {
              code:401,
              status:"failed",
              message:"No Data Found"
            };
      }

      return{
          code:200,
          status:"success",
          message:"Courses Fetched Successfully",
          data:result
      }
  }

  @Delete(':id')
  @Roles(Role.TEACHER,Role.USER)
  @UseGuards(AuthGuard,RolesGuard)
  @ApiBearerAuth()
  async deleteCourse(@Param('id') id:string,@Request() req){
     
     const result= await this.courseService.delete(id,req.user.id);
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
      message:"Course Deleted Successfully"
     }
  }
}
