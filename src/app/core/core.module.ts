import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgbToastModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { CreateDeckModalContentComponent } from './components/create-deck-modal-content/create-deck-modal-content.component';
import { DeckCardComponent } from './components/deck/deck-card/deck-card.component';
import { DeckComponent } from './components/deck/deck.component';
import { DeckInputValidatorDirective } from './directives/deck-input-validator.directive';
import { SessionIdValidatorDirective } from './directives/session-id-validator.directive';
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";
import { RxStompService, rxStompServiceFactory } from "./services/rx-stomp.service";
import { ToastsComponent } from './components/toasts/toasts.component';

@NgModule({
  declarations: [
    CreateDeckModalContentComponent,
    DeckCardComponent,
    DeckComponent,
    DeckInputValidatorDirective,
    SessionIdValidatorDirective,
    ToastsComponent
  ],
    exports: [
        SessionIdValidatorDirective,
        DeckComponent,
        ToastsComponent,
        DeckCardComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbTooltipModule,
    NgbToastModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory
    }
  ]
})
export class CoreModule { }
