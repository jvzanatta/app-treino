import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExercisesList } from './exercises-list';

@NgModule({
  declarations: [
    ExercisesList,
  ],
  imports: [
    IonicPageModule.forChild(ExercisesList),
  ],
  exports: [
    ExercisesList
  ]
})
export class ExercisesListModule {}
