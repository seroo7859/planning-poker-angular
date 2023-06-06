import { Component } from '@angular/core';
import { ChildrenOutletContexts } from "@angular/router";
import { fadeAnimation } from "../../shared/animations/fade.animation";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
  animations: [fadeAnimation]
})
export class OnboardingComponent {

  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
