import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Global } from '../../Global';
import { Storage } from '@ionic/storage';
import { CategoriesItemsPage } from '../categories-items/categories-items';
/**
 * Generated class for the AllCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-categories',
  templateUrl: 'all-categories.html',
})
export class AllCategoriesPage {
  categories : any;
  server_api = Global.BASE_API;
  list : any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage) {
    this.storage.get('categories').then(data => { 
      this.categories = this.list = data;
      console.log(this.categories)
    })
  }
  items(id, name) {
    this.storage.set('categoryId',id);
    this.storage.set('categoryName',name);
    this.navCtrl.push(CategoriesItemsPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AllCategoriesPage');    
  }
  getItems(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.list = this.categories.filter((item) => {
        return (item.category_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.list = this.categories;
    }
  }
}
