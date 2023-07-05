import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinPipe } from './pipes/join.pipe';
import { DateAgoPipe } from './pipes/date-ago.pipe';

@NgModule({
  declarations: [
    JoinPipe,
    DateAgoPipe
  ],
  exports: [
    JoinPipe,
    DateAgoPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
