import { NgModule } from '@angular/core';
import { ActiveOnlyPipe } from './active-only.pipe';
import { ExercisesAssortPipe } from './exercises-assort.pipe';
import { WeekdayPipe } from './weekday.pipe';
import { GroupNamePipe } from './group-name/group-name';
import { DayFilterPipe } from './day-filter/day-filter';
import { MarkForHeaderPipe } from './mark-for-header/mark-for-header';
import { UserNamePipe } from '../pipes/user-name/user-name';
import { AgePipe } from '../pipes/age/age';
import { ChatTimestampPipe } from '../pipes/chat-timestamp/chat-timestamp';
import { DatePipe } from '@angular/common';
import { ImcPipe } from '../pipes/imc/imc';
import { CategoryImcPipe } from '../pipes/category-imc/category-imc';
import { FormatNumberPipe } from '../pipes/format-number/format-number';

@NgModule({
  declarations: [
    ActiveOnlyPipe,
    ExercisesAssortPipe,
    WeekdayPipe,
    GroupNamePipe,
    DayFilterPipe,
    MarkForHeaderPipe,
    UserNamePipe,
    AgePipe,
    ChatTimestampPipe,
    ImcPipe,
    CategoryImcPipe,
    FormatNumberPipe,
  ],
  exports: [
    ActiveOnlyPipe,
    ExercisesAssortPipe,
    WeekdayPipe,
    GroupNamePipe,
    DayFilterPipe,
    MarkForHeaderPipe,
    UserNamePipe,
    AgePipe,
    ChatTimestampPipe,
    ImcPipe,
    CategoryImcPipe,
    FormatNumberPipe,
  ],
  providers: [
    DatePipe,
  ]
})
export class PipesModule {}
