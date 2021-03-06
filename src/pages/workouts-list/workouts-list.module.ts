import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { WorkoutsList } from './workouts-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [ WorkoutsList ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(WorkoutsList),
  ],
  // exports: [ WorkoutsList ]
})
export class WorkoutsListModule {}
