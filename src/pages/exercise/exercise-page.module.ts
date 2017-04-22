import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExercisePage } from './exercise-page';

@NgModule({
  declarations: [
    ExercisePage,
  ],
  imports: [
    IonicPageModule.forChild(ExercisePage),
  ],
  exports: [
    ExercisePage
  ]
})
export class ExercisePageModule {}
