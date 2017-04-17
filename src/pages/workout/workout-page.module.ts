import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkoutPage } from './workout-page';

@NgModule({
  declarations: [
    WorkoutPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkoutPage),
  ],
  exports: [
    WorkoutPage
  ]
})
export class WorkoutPageModule {}