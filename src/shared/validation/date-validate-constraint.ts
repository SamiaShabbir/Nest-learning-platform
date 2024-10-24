import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import * as moment from 'moment';

@ValidatorConstraint({ async: false })
export class IsAtLeastFiveYearsOld implements ValidatorConstraintInterface {
  validate(value: string) {
    const date = moment(value, 'YYYY-MM-DD', true); // Ensure strict parsing
    const fiveYearsAgo = moment().subtract(18, 'years');

    return date.isValid() && date.isBefore(fiveYearsAgo);
  }

  defaultMessage() {
    return 'Date of Birth must be at least 18 years ago';
  }
}