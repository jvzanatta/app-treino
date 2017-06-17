import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { HomePage} from './home';
import { PipesModule } from '../../pipes/pipes.module';
import { NgStringPipesModule } from 'angular-pipes';

@NgModule({
  declarations: [ HomePage ],
  imports: [
    PipesModule,
    NgStringPipesModule,
    IonicPageModule.forChild(HomePage)
  ],
  entryComponents: [ HomePage ]
})
export class HomePageModule { }
