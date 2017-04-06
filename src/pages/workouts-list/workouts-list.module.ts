import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkoutsList } from './workouts-list';

@NgModule({
  declarations: [
    WorkoutsList,
  ],
  imports: [
    IonicPageModule.forChild(WorkoutsList),
  ],
  exports: [
    WorkoutsList
  ]
})
export class WorkoutsListModule {}
