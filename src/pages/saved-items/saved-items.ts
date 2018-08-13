import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Global } from '../../Global';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SavedItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saved-items',
  templateUrl: 'saved-items.html',
})
export class SavedItemsPage {
  public userId: number;
  public token: any;
  public savedItems: any;
  public saveItemsLength: number;
  public server_api = Global.BASE_API;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl : AlertController,
    private storage: Storage,
    public http: Http) {
    this.storage.get('UserDetails').then(data => {
      this.userId = data.user_id;
    });
    this.storage.get('token').then(data => {
      this.token = data;
      let saveItemsObj = {
        'uid': this.userId,
        'token': this.token
      }
      this.http.post(`${Global.SERVER_URL}watchlist`, saveItemsObj)
        .subscribe(data => {
          var result = JSON.parse(data["_body"])
          if (result.success) {
            console.log(result)
            this.savedItems = result.watchlist;
            this.saveItemsLength = this.savedItems.length;
          } else {
            alert(result.message);
          }
        }, err => {
          alert("Server Busy");
        });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavedItemsPage');
  }
  remove(index,id) {
    let itemremoveObj = {
      'wlid': id,
      'token': this.token
    }
    console.log(itemremoveObj)
    this.http.post(`${Global.SERVER_URL}remove-from-wl`, itemremoveObj)
      .subscribe(data => {
        let result = JSON.parse(data["_body"])
        if (result.success) {
          this.savedItems.splice(index,1);
        } else {
          alert(result.message);
        }
      }, err => {
        alert("Server Busy");
      });
  }
  movetocart(index,id,wlid) {
    let addProduct = {
      'pid': id,
      'uid': this.userId,
      'token': this.token,
      'opr': 'add'
    }
    this.http.post(`${Global.SERVER_URL}add-to-cart`, addProduct)
      .subscribe(data => {
        let result = JSON.parse(data["_body"])
        if (result.success) {  
          this.remove(index,wlid) 
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
}
