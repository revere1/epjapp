import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})
export class ReviewsPage {
  reviews: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsPage');
    this.storage.get('productData').then(data => {
      this.reviews = data.reviews;
      this.reviews.forEach((val ,index)=> {
        let initials = val.mobile_user.user_name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        this.reviews[index].initials = initials;
      });
    });
  }

}
