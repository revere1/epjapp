import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddAddressPage } from '../add-address/add-address';
import { SigninPage } from '../signin/signin';
import { Http } from '@angular/http';
import { Global } from '../../Global';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { CartPage } from '../cart/cart';
/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  token: any;
  result: any;
  addresses: any;
  currentUser: any;
  public change: boolean = false;;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public alertCtrl: AlertController,
    private storage: Storage) {
    this.change = this.navParams.get('change');
    console.log(this.change);
    this.storage.get('UserDetails').then(data => {
      this.currentUser = data;
    });
    this.storage.get('token').then(data => {
      this.token = data;
      this.http.post(`${Global.SERVER_URL}get-addresses`, { 'token': this.token, 'user_id': this.currentUser.user_id }).subscribe(data => {
        this.result = JSON.parse(data["_body"]);
        if (this.result.success) {
          this.addresses = this.result.addresses;
        } else {
          alert(this.result.message);
        }
      });
    }).catch(err => {
      alert(err);
      this.navCtrl.setRoot(SigninPage);
    });
  }
  addAddress() {
    this.navCtrl.push('AddAddressPage')
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }
  default(addrId) {
    const confirm = this.alertCtrl.create({
      title: 'Set as default',
      message: 'Do you want to set this address as your default address?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.navCtrl.push(CartPage);
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let updateAddr = {
              'addrid': addrId,
              'default_address': 1,
              'token': this.token,
            }
            this.http.put(`${Global.SERVER_URL}update-addr`, updateAddr)
              .subscribe(data => {
                let result = JSON.parse(data["_body"])
                if (result.success) {
                  this.navCtrl.push(CartPage);
                } else {
                  const alert = this.alertCtrl.create({
                    title: 'Alert',
                    subTitle: result.message,
                    buttons: ['OK']
                  });
                  alert.present();
                  this.navCtrl.push(CartPage);
                }
              }, err => {
                alert("Server Busy");
              });
          }
        }
      ]
    });
    confirm.present();
  }
  remove(index, id) {
    let addremoveObj = {
      'addrid': id,
      'token': this.token
    }
    console.log(addremoveObj)
    this.http.post(`${Global.SERVER_URL}remove-from-addr`, addremoveObj)
      .subscribe(data => {
        let result = JSON.parse(data["_body"])
        if (result.success) {
          this.addresses.splice(index, 1);
        } else {
          alert(result.message);
        }
      }, err => {
        alert("Server Busy");
      });
  }
}
