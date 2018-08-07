import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { WriteReviewPage } from '../write-review/write-review';
import { Global } from '../../Global';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SigninPage } from '../signin/signin';
import { CartPage } from '../cart/cart';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the ProductViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-view',
  templateUrl: 'product-view.html',
})
export class ProductViewPage {
  slides: any;
  token: any;
  result: any;
  productDetails: any;
  productId: any;
  productData: any;
  server_api = Global.BASE_API;
  userId: any;
  public cartCount: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public http: Http,
    private socialSharing: SocialSharing) {
    this.storage.get('productId').then(data => {
      this.productId = data;
    });
    this.storage.get('UserDetails').then(data => {
      this.userId = data.user_id;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductViewPage');
    this.storage.get('token').then(data => {
      this.token = data;
      this.CartCount();
      this.http.get(`${Global.SERVER_URL}product/${this.productId}`, {
        params: {
          'token': this.token
        }
      }).subscribe(data => {
        this.result = JSON.parse(data["_body"]);
        if (this.result.success) {
          this.productData = this.result.data;
          this.storage.set('productData', this.productData)
          this.productDetails = this.result.data.product;
          this.slides = this.result.data.images
        } else {
          alert(this.result.message);
        }
      });
    }).catch(err => {
      this.navCtrl.setRoot('SigninPage')
    });

  }
  ViewDetails() {
    this.navCtrl.push('TabsPage');
  }
  WriteReview() {
    this.navCtrl.push('WriteReviewPage');
  }
  watchList() {
    let addWatchList = {
      'pid': this.productDetails.id,
      'uid': this.userId,
      'token': this.token
    }
    console.log(addWatchList)
    this.http.post(`${Global.SERVER_URL}add-to-wl`, addWatchList)
      .subscribe(data => {
        this.result = JSON.parse(data["_body"])
        if (this.result.success) {
          console.log(this.result);
          // this.navCtrl.push(CartPage);
        } else {
          alert(this.result.message);
        }
      }, err => {
        alert("Server Busy");
      });
  }
  addCart() {
    let addProduct = {
      'pid': this.productDetails.id,
      'uid': this.userId,
      'token': this.token,
      'opr': 'add'
    }
    console.log(addProduct)
    this.http.post(`${Global.SERVER_URL}add-to-cart`, addProduct)
      .subscribe(data => {
        this.result = JSON.parse(data["_body"])
        if (this.result.success) {
          this.navCtrl.push(CartPage);
        } else {
          alert(this.result.message);
        }
      }, err => {
        alert("Server Busy");
      });
  }
  cart() {
    this.navCtrl.push(CartPage);
  }
  share() {
    let options = {
      'message': 'Check out this product on Epooja Store',
      'subject': 'The subject',
      'image': 'https://www.pexels.com/photo/red-rose-214667/',
      'url': 'https://ionicframework.com/docs/native/social-sharing/'
    }
    console.log(options)
    this.socialSharing.shareWithOptions(options).then((data) => {
      console.log(data)
      // Success!
    }).catch((err) => {
      console.log(err)
      // Error!
    });
  }
  private CartCount() {
    this.http.post(`${Global.SERVER_URL}cart-count`, { 'uid': this.userId, 'token': this.token })
      .subscribe(data => {
        this.result = JSON.parse(data["_body"]);
        if (this.result.success) {
          this.cartCount = this.result.count;
        }
      });
  }
}
