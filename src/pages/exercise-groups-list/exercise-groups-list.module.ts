import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExerciseGroupsList } from './exercise-groups-list';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    ExerciseGroupsList,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ExerciseGroupsList),
  ],
  exports: [
    ExerciseGroupsList
  ]
})
export class ExerciseGroupsListModule {}
