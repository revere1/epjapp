import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DescriptionPage } from '../description/description';
import { ReviewsPage } from '../reviews/reviews';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = DescriptionPage;
  tab2Root = ReviewsPage;
  productName : any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    this.storage.get('productData').then(data => {
      this.productName = data.product.product_name;
    })
  }

}
