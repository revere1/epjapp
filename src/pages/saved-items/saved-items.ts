import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

}
