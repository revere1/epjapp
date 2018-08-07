import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashPage } from '../pages/splash/splash';
import { IndexPage } from '../pages/index';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { CategoriesItemsPage } from '../pages/categories-items/categories-items';
import { DescriptionPage } from '../pages/description/description';
import { ReviewsPage } from '../pages/reviews/reviews';
import { AddressPage } from '../pages/address/address';
import { OrdersPage } from '../pages/orders/orders';
import { OffersPage } from '../pages/offers/offers';
import { CartPage } from '../pages/cart/cart';
import { WalletPage } from '../pages/wallet/wallet';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IonTextAvatar } from 'ionic-text-avatar';
import { SideMenuPage } from '../pages/side-menu/side-menu';
import { IonicStorageModule } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CartProvider } from '../providers/cart/cart';
import { SavedItemsPage } from '../pages/saved-items/saved-items';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SplashPage,
    IndexPage,
    CategoriesItemsPage,
    DescriptionPage,
    ReviewsPage,
    AddressPage,
    OrdersPage,
    OffersPage,
    CartPage,
    WalletPage,
    IonTextAvatar,
    SideMenuPage,
    SavedItemsPage,
    // SigninPage,
    // SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SplashPage,
    IndexPage,
    CategoriesItemsPage,
    DescriptionPage,
    ReviewsPage,
    AddressPage,
    OrdersPage,
    OffersPage,
    CartPage,
    WalletPage,
    SideMenuPage,
    SavedItemsPage
    // SigninPage,
    // SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CartProvider
  ]
})
export class AppModule {}
