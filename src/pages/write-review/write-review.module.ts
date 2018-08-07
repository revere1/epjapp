import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WriteReviewPage } from './write-review';

@NgModule({
  declarations: [
    WriteReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(WriteReviewPage),
  ],
})
export class WriteReviewPageModule {}
