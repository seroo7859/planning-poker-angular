import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: '[appDeckInputValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DeckInputValidatorDirective,
    multi: true
  }]
})
export class DeckInputValidatorDirective implements Validator {

  private deckInputPattern = /^\s*[^,]{1,3}\s*(\s*,\s*[^,]{0,3}\s*)*$/;

  validate(control: AbstractControl): ValidationErrors | null {
    const deckInput = control.value;
    if (!deckInput) {
      return null;
    }

    const estimationValues = this.mapDeckInputToEstimationValues(deckInput);
    if (!this.matchDeckInputWithPattern(deckInput) || !this.hasUniqueEstimationValues(estimationValues)) {
      return { 'deckInputInvalid': true };
    }
    return null;
  }

  private matchDeckInputWithPattern(deckInput: string) {
    return this.deckInputPattern.test(deckInput);
  }

  private mapDeckInputToEstimationValues(deckInput: string): string[] {
    return deckInput
      .split(',')
      .map(value => value.trim())
      .filter(value => value.length !== 0);
  }

  private hasUniqueEstimationValues(estimationValues: string[]):boolean {
    return estimationValues.length === new Set(estimationValues).size;
  }

}
