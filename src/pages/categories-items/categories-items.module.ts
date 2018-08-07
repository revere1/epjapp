import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesItemsPage } from './categories-items';

@NgModule({
  declarations: [
    CategoriesItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriesItemsPage),
  ],
})
export class CategoriesItemsPageModule {}
