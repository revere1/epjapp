import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Global } from '../../Global';
import { AddressPage } from '../address/address';
import { HomePage } from '../home/home';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  result: any;
  public cartLength: number;
  public total: any;
  public userId: any;
  public token: any;
  public defaultAddr: any;
  public shippingCharges: any = 80;
  cartitems: any = [];
  server_api = Global.BASE_API;
  public subTotal: number = 0;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private storage: Storage,
    public http: Http) {
    this.storage.get('UserDetails').then(data => {
      this.userId = data.user_id;
    });
    this.storage.get('token').then(data => {
      this.token = data;
      let cartObj = {
        'uid': this.userId,
        'token': this.token
      }
      this.http.post(`${Global.SERVER_URL}cart`, cartObj)
        .subscribe(data => {
          this.result = JSON.parse(data["_body"])
          if (this.result.success) {
            this.cartitems = this.result.cartitems;
            this.cartLength = this.cartitems.length
            this.defaultAddr = this.result.default_addr;
            this.cartitems.forEach(val => {
              this.subTotal = this.subTotal + parseInt(val.product.cost) * parseInt(val.pcount)
            });
            this.total = this.subTotal + this.shippingCharges;
          } else {
            alert(this.result.message);
          }
        }, err => {
          alert("Server Busy");
        });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  remove(cartId,index) {
    let cartremoveObj = {
      'cid': cartId,
      'token': this.token
    }
    this.http.post(`${Global.SERVER_URL}remove-from-cart `, cartremoveObj)
      .subscribe(data => {
        let result = JSON.parse(data["_body"])
        if (result.success) {
          this.subTotal -= this.cartitems[index].product.cost;
          this.total =  this.subTotal + this.shippingCharges;
          this.cartitems.splice(index,1);
          this.cartLength = this.cartitems.length;       
        } else {
          alert(result.message);
        }
      }, err => {
        alert("Server Busy");
      });
  }
  reduce(productId,index) {
    let reduceProduct = {
      'pid': productId,
      'uid': this.userId,
      'token': this.token,
      'opr': 'sub'
    }
    this.http.post(`${Global.SERVER_URL}add-to-cart`, reduceProduct)
      .subscribe(data => {
        this.result = JSON.parse(data["_body"])
        if (this.result.success) {
          this.cartitems[index].pcount -= 1;
          this.subTotal -= this.cartitems[index].product.cost;
          this.total =  this.subTotal + this.shippingCharges;

        } else {
          alert(this.result.message);
        }
      }, err => {
        alert("Server Busy");
      });
  }
  add(productId,index) {
    let addProduct = {
      'pid': productId,
      'uid': this.userId,
      'token': this.token,
      'opr': 'add'
    }
    this.http.post(`${Global.SERVER_URL}add-to-cart`, addProduct)
      .subscribe(data => {
        let result = JSON.parse(data["_body"])
        if (result.success) {    
          this.cartitems[index].pcount += 1;    
          this.subTotal += parseInt(this.cartitems[index].product.cost);
          this.total =  this.subTotal + this.shippingCharges;
        } else {
          const alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: result.message,
            buttons: ['OK']
          });
          alert.present();
        }
      }, err => {
        alert("Server Busy");
      });
  }
  changeAddress() {
    this.navCtrl.push(AddressPage, { change: 'true' })
  }
  startshopping(){
    this.navCtrl.setRoot(HomePage);
  }
}
