import { Injectable } from '@angular/core';
import { Toast, ToastType } from "../models/toast.model";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: Toast[] = [];

  constructor() { }

  show(toast: Toast) {
    this.toasts.push(toast);
  }

  showInfo(toast: Toast) {
    this.show({
      ...toast,
      type: ToastType.INFO,
      options: {
        ...toast.options,
        className: 'toast-info bg-primary border-primary text-white fw-bold ' + (toast.options?.className || '')
      }
    });
  }

  showSuccess(toast: Toast) {
    this.show({
      ...toast,
      type: ToastType.SUCCESS,
      options: {
        ...toast.options,
        className: 'toast-success bg-success border-success text-white fw-bold ' + (toast.options?.className || '')
      }
    });
  }

  showWarning(toast: Toast) {
    this.show({
      ...toast,
      type: ToastType.WARNING,
      options: {
        ...toast.options,
        className: 'toast-warning bg-warning border-warning text-white fw-bold ' + (toast.options?.className || '')
      }
    });
  }

  showError(toast: Toast) {
    this.show({
      ...toast,
      type: ToastType.ERROR,
      options: {
        ...toast.options,
        className: 'toast-error bg-danger border-danger text-white fw-bold ' + (toast.options?.className || '')
      }
    });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

}
