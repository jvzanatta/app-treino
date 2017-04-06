import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExerciseGroupsList } from './exercise-groups-list';

@NgModule({
  declarations: [
    ExerciseGroupsList,
  ],
  imports: [
    IonicPageModule.forChild(ExerciseGroupsList),
  ],
  exports: [
    ExerciseGroupsList
  ]
})
export class ExerciseGroupsListModule {}
