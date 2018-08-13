import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Global } from '../../Global';
import { Http } from '@angular/http';
/**
 * Generated class for the OffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {

  public token: any;
  public offers: any;
  public server_api = Global.BASE_API;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private storage: Storage) {
    this.storage.get('token').then(data => {
      this.token = data;
      this.http.get(`${Global.SERVER_URL}get-offers`, {
        params: {
          'token': this.token
        }
      }).subscribe(data => {
        let result = JSON.parse(data["_body"]);
        if (result.success) {
          this.offers = result.offers;
        } else {
          alert(result.message);
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OffersPage');
  }

}
