import { NgModule } from '@angular/core';
import { ActiveOnlyPipe } from './active-only.pipe';
import { ExercisesAssortPipe } from './exercises-assort.pipe';
import { WeekdayPipe } from './weekday.pipe';
import { GroupNamePipe } from './group-name/group-name';
import { DayFilterPipe } from './day-filter/day-filter';
import { MarkForHeaderPipe } from './mark-for-header/mark-for-header';

@NgModule({
  declarations: [
    ActiveOnlyPipe,
    ExercisesAssortPipe,
    WeekdayPipe,
    GroupNamePipe,
    DayFilterPipe,
    MarkForHeaderPipe,
  ],
  exports: [
    ActiveOnlyPipe,
    ExercisesAssortPipe,
    WeekdayPipe,
    GroupNamePipe,
    DayFilterPipe,
    MarkForHeaderPipe,
  ],
})
export class PipesModule {}
