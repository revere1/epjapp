import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html',
})
export class DescriptionPage {
  description : any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriptionPage');
    this.storage.get('productData').then(data => {
      this.description = data.product.product_description;
    });
  }

}
