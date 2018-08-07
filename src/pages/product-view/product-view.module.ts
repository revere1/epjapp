import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductViewPage } from './product-view';

@NgModule({
  declarations: [
    ProductViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductViewPage),
  ],
})
export class ProductViewPageModule {}
