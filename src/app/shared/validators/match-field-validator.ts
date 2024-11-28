import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MatchFieldValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const control = form.get(controlName);
    const matchingControl = form.get(matchingControlName);

    if (
      control?.value &&
      matchingControl?.value &&
      control.value !== matchingControl.value
    ) {
      const error = {
        notMatch: 'Not match.',
      };

      matchingControl.setErrors(error);
      return error;
    } else {
      if (matchingControl?.errors && matchingControl.errors['notMatch']) {
        delete matchingControl.errors['notMatch'];
        if (Object.keys(matchingControl.errors).length === 0) {
          matchingControl.setErrors(null);
        }
      }
      return null;
    }
  };
}
