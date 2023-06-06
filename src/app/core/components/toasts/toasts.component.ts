import {Component, ViewEncapsulation} from '@angular/core';
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToastsComponent {

  protected readonly DEFAULT_TOAST_DELAY: number = 5000;

  constructor(public toastService: ToastService) {}

}
