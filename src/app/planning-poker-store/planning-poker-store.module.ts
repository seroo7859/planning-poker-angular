import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from "./state/planning-poker-store.state";
import { effects } from "./effects/planning-poker-store.effects";
import { environment } from "../../environments/environment";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }) : []
  ]
})
export class PlanningPokerStoreModule { }
