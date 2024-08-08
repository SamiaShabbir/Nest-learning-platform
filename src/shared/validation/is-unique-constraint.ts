import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { IsUniqueConstraintInput } from './is-unique';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  private connection: Connection;

  constructor(@InjectConnection() connection: Connection) {
    this.connection = connection;
  }
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const field = args.property;

    const { tableName }: IsUniqueConstraintInput = args.constraints[0];
    const model = this.connection.model(tableName);
    const record = await model.exists({ [field]: value });

    return record ? false : true;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    const property = validationArguments.property;

    return `${property} already exists`;
  }
}
