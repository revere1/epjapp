import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductViewPage } from '../product-view/product-view';
import { Global } from '../../Global';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CategoriesItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories-items',
  templateUrl: 'categories-items.html',
})
export class CategoriesItemsPage {
  token: any;
  result : any;
  products :any;
  categoryId: any;
  server_api = Global.BASE_API;
  categoryName: any;
  constructor(public navCtrl: NavController,
    private http: Http,
    private storage: Storage,
    private navParams : NavParams) {
  }

  ionViewDidLoad() {
    this.storage.get('categoryId').then(data => {
      this.categoryId = data;
    });
    this.storage.get('categoryName').then(data => {
      this.categoryName = data;
    });
    this.storage.get('token').then(data => {
      this.token = data;
      this.http.get(`${Global.SERVER_URL}products/${this.categoryId}`, {
        params: {
          'token': this.token
        }
      }).subscribe(data => {
        this.result = JSON.parse(data["_body"]);
        if (this.result.success) {
          this.products = this.result.data;
        } else {
          alert(this.result.message);
        }
      });
    })
    // else {
    //   this.navCtrl.setRoot('SigninPage');
    // }
  }
  prodctView(id) {
    this.navCtrl.push('ProductViewPage');
    this.storage.set('productId',id)
  }
}
