export interface Toast {
  type?: ToastType;
  title?: string;
  text: string;
  options?: ToastOptions;
}

export enum ToastType {
  INFO= 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

export interface  ToastOptions {
  className?: string;
  delay?: number;
}
