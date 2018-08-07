import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav } from 'ionic-angular';
import { AddressPage } from '../address/address';
import { OrdersPage } from '../orders/orders';
import { OffersPage } from '../offers/offers';
import { CartPage } from '../cart/cart';
import { WalletPage } from '../wallet/wallet';
import { ContactusPage } from '../contactus/contactus';
import { HomePage } from '../home/home';
import { AboutusPage } from '../aboutus/aboutus';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile';
import { SavedItemsPage } from '../saved-items/saved-items';
/**
 * Generated class for the SideMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-side-menu',
  templateUrl: 'side-menu.html',
})
export class SideMenuPage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  currentUserName: any;
  initials: any;
  myPages: Array<{ title: string, component: any, icon: any; }>;
  otherPages: Array<{ title: string, component: any, icon: any; }>;
  constructor(private storage: Storage) {
    // used for an example of ngFor and navigation
    this.myPages = [
      { title: 'Address', component: AddressPage, icon: 'assets/imgs/pointer.svg' },
      { title: 'Orders', component: OrdersPage, icon: 'assets/imgs/orders.svg' },
      { title: 'Offers', component: OffersPage, icon: 'assets/imgs/offers.svg' },
      { title: 'Saved items', component: SavedItemsPage, icon:'assets/imgs/save-items.svg' },
      { title: 'Cart', component: CartPage, icon: 'assets/imgs/cart.svg' },
      { title: 'Wallet', component: WalletPage, icon: 'assets/imgs/wallet.svg' },
    ];
    this.otherPages = [
      { title: 'Contact Us', component: ContactusPage, icon: 'assets/imgs/message.svg' },
      { title: 'About Us', component: AboutusPage, icon: 'assets/imgs/aboutus.svg' }

    ];
    this.storage.get('UserDetails').then(data => {
      this.currentUserName = data.user_name;
      this.initials = this.currentUserName.match(/\b\w/g) || [];
      this.initials = ((this.initials.shift() || '') + (this.initials.pop() || '')).toUpperCase();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SideMenuPage');
  }
  profile() {
    this.nav.push('ProfilePage');
  }
  home() {
    this.nav.setRoot(HomePage);
  }
  logout() {
    this.nav.setRoot('SigninPage')
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
