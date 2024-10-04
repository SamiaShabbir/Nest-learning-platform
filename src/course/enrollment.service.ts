import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Enrollment } from '../schemas/Enrollement.schema';
import { CreateEnrollmentDto } from "./dto/create-enrollment.dto";
import { EnrollmentRepository } from "./repository/enrollment.respository";
@Injectable()
export class EnrollmentService{
    constructor(private enrollmentRepository:EnrollmentRepository){}
    async create(createEnrollmentDto: CreateEnrollmentDto) {
       return await this.enrollmentRepository.create(createEnrollmentDto);
    }
   
}