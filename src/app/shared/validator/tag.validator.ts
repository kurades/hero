import { AbstractControl } from '@angular/forms';

export function ValidateTag(control: AbstractControl) {
    const regexp = new RegExp(/^[a-zA-Z0-9 ]*$/)
    const result = regexp.test(control.value)
    if(result === false) return {invalidTag : true}
  return null;
}