import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Global } from '../../Global';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage{
  date = new Date();
  public userId: any;
  public cartCount: any;
  public token: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public http: Http) {
  }

  ionViewDidEnter() {
    this.storage.get('UserDetails').then(data => {
      this.userId = data.user_id;
    });
    this.storage.get('token').then(data => {
      this.token = data;
      this.CartCount()
    })
  }
  private CartCount() {
    this.http.post(`${Global.SERVER_URL}cart-count`, { 'uid': this.userId, 'token': this.token })
      .subscribe(data => {
        var result = JSON.parse(data["_body"]);
        if (result.success) {
          this.cartCount = result.count;
        } else {
          alert(result.message);
        }
      });
  }
  cart() {
    this.navCtrl.push(CartPage);
  }
}
