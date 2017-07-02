import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkoutFormPage } from './workout-form';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WorkoutFormPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(WorkoutFormPage),
  ],
  // exports: [
  //   WorkoutFormPage
  // ]
})
export class WorkoutFormPageModule {}
