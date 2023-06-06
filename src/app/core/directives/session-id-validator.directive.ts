import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: '[appSessionIdValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: SessionIdValidatorDirective,
    multi: true
  }]
})
export class SessionIdValidatorDirective implements Validator {

  /**
   * Regex for UUID v1-5
   * Source: https://stackoverflow.com/a/38191078
   * @private
   */
  private uuidPattern = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[1-5][0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/;

  validate(control: AbstractControl): ValidationErrors | null {
    const sessionId = control.value;
    if (!sessionId) {
      return null;
    }
    if (!this.matchSessionIdWithPattern(sessionId)) {
      return { 'sessionIdInvalid': true };
    }
    return null;
  }

  private matchSessionIdWithPattern(sessionId: string) {
    return this.uuidPattern.test(sessionId);
  }

}
