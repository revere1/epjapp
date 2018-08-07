import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AllCategoriesPage } from '../all-categories/all-categories';
import { CategoriesItemsPage } from '../categories-items/categories-items';
import { Global } from '../../Global';
import { Http } from '@angular/http';
import { SigninPage } from '../signin/signin';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public token: any;
  result: any;
  categories: any;
  public cartCount: any;
  public currentUserId: any;
  server_api = Global.BASE_API;
  constructor(public navCtrl: NavController,
    private http: Http,
    private storage: Storage) {
  }
  ionViewDidEnter() {
    this.storage.get('UserDetails').then(data => {
      this.currentUserId = data.user_id;
    })
    this.storage.get('token').then(data => {
      this.token = data;
      this.CartCount();
      this.http.get(`${Global.SERVER_URL}categories`, {
        params: {
          'token': this.token
        }
      }).subscribe(data => {
        this.result = JSON.parse(data["_body"]);
        if (this.result.success) {
          this.categories = this.result.data;
        } else {
          alert(this.result.message);
        }
      });
    }).catch(err => {
      this.navCtrl.setRoot(SigninPage)
    });
  }
  allCategories() {
    this.storage.set('categories', this.categories);
    this.navCtrl.push('AllCategoriesPage')
  }
  items(id, name) {
    this.storage.set('categoryId', id);
    this.storage.set('categoryName', name);
    this.navCtrl.push(CategoriesItemsPage);
  }
  cart() {
    this.navCtrl.push(CartPage)
  }
  private CartCount() {
    this.http.post(`${Global.SERVER_URL}cart-count`, { 'uid': this.currentUserId, 'token': this.token })
      .subscribe(data => {
        this.result = JSON.parse(data["_body"]);
        if (this.result.success) {
          this.cartCount = this.result.count;
        }
      });
  }
}
