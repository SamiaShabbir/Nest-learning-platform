import { Request,BadRequestException, Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiConsumes, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/shared/acl/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from '../shared/guards/roles.gaurd';
import * as fs from 'fs';
import * as path from 'path';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";

@ApiTags('enrollment')
@Controller('enrollment')
export class EnrollmentController {
    constructor(private enrollmentService:EnrollmentService){}

    @Post('create')
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'For Students to Join Course' })
    @ApiResponse({ status: 201, description: 'The student has been enrolled successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    async createEnrollment(
        @Request() req,
        @Body() createEnrollmentDto: CreateEnrollmentDto
    ) {

        const result = await this.enrollmentService.create({
            ...createEnrollmentDto,
            student:req.user.id
        });

        if(!result){
            return {
                code: 401,
                status: "failed",
                message: "You Do not have permission to do this action",
            };

        }

        return {
            code: 200,
            status: "success",
            message: "Enrolled successfully",
            data: result
        };
    }

   

}
