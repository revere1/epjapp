import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavedItemsPage } from './saved-items';

@NgModule({
  declarations: [
    SavedItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(SavedItemsPage),
  ],
})
export class SavedItemsPageModule {}
