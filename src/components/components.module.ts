import { NgModule } from '@angular/core';
import { DatePicker } from './date-picker/date-picker';
import { DayPicker } from './day-picker/day-picker';
import { ListWithPicture } from './list-with-picture/list-with-picture';
import { IonicModule } from 'ionic-angular'
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports:[
    IonicModule,
    PipesModule
  ],
  declarations: [
    DatePicker,
    DayPicker,
    ListWithPicture,
  ],
  exports: [
    DayPicker,
    DatePicker,
    ListWithPicture,
  ],
})
export class ComponentsModule {}
