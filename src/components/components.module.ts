import { NgModule } from '@angular/core';
import { DatePicker } from './date-picker/date-picker';
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
    ListWithPicture,
  ],
  exports: [
    DatePicker,
    ListWithPicture,
  ],
})
export class ComponentsModule {}
