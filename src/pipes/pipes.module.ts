import { NgModule } from '@angular/core';
import { ActiveOnlyPipe } from './active-only.pipe';
import { ExercisesAssortPipe } from './exercises-assort.pipe';
import { WeekdayPipe } from './weekday.pipe';

@NgModule({
  declarations: [
    ActiveOnlyPipe,
    ExercisesAssortPipe,
    WeekdayPipe,
  ],
  exports: [
    ActiveOnlyPipe,
    ExercisesAssortPipe,
    WeekdayPipe,
  ],
})
export class PipesModule {}
