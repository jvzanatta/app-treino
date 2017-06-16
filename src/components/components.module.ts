import { NgModule } from '@angular/core';
import { DatePicker } from './date-picker/date-picker';
import { IonicModule } from 'ionic-angular'
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports:[
    IonicModule,
    PipesModule
  ],
  declarations: [
    DatePicker,
  ],
  exports: [
    DatePicker
  ],
})
export class ComponentsModule {}
