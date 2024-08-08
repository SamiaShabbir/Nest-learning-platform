import { Inject, Injectable } from '@nestjs/common';
import {
		registerDecorator,
		ValidationOptions,
		ValidatorConstraint,
		ValidatorConstraintInterface,
} from 'class-validator';
//model
import { User } from '../../../schemas/User.schama';

@ValidatorConstraint({ name: 'EmailExist', async: true })
@Injectable()
export class EmailExistValidator implements ValidatorConstraintInterface {
		constructor(@Inject(User.name) private readonly userModel: User) {}
		
		async validate(value: string): Promise<boolean> {
				try {
						const isEmailExist = await this.userModel.checkEmailExist(value);
						if (isEmailExist) return false;
						return true;
				} catch (e) {
						return false;
				}
		}
		
		defaultMessage(): string {
				return 'Email already exists';
		}
}

export const IsUserExist = (validationOptions?: ValidationOptions) => {
		return (object: unknown, propertyName: string) => {
				registerDecorator({
						                  target: object.constructor,
						                  propertyName: propertyName,
						                  options: validationOptions,
						                  validator: EmailExistValidator,
				                  });
		};
};