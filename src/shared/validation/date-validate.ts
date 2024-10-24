import { ValidationOptions, registerDecorator } from "class-validator";
import { IsAtLeastFiveYearsOld } from "./date-validate-constraint";

export function IsAtLeastFiveYearsOldDecorator(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isAtLeastFiveYearsOld',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: IsAtLeastFiveYearsOld,
      });
    };
  }