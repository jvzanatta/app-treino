import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { WorkoutPage } from './workout';

import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ WorkoutPage ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(WorkoutPage),
  ],
  // exports: [ WorkoutPage ],
})
export class WorkoutPageModule {}
