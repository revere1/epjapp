import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { Http } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Global } from '../../Global';
import { SideMenuPage } from '../side-menu/side-menu';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  private signInForm: FormGroup;
  result: any;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public http: Http,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    private storage: Storage) {
    this.signInForm = this.formBuilder.group({
      user_name: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }
  signIn(userName, Password) {
    let Obj = {
      "user_name": this.signInForm.get('user_name').value,
      "password": this.signInForm.get('password').value,
      "api_code": '6209232b45aea869fb846a89d263fb3a'
    }
    this.http.post(`${Global.SERVER_URL}login`, Obj)
      .subscribe(data => {
        this.result = JSON.parse(data["_body"])
        if (this.result.success) {
          this.signInForm.reset();
          this.navCtrl.setRoot(SideMenuPage);
          this.storage.set('UserDetails',this.result.data);
          this.storage.set('token',this.result.token)
        } else { 
          alert(this.result.message);
        }
      },
        err => {
          const alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'Something went wrong ,Please try again!',
            buttons: ['OK']
          });
          alert.present();
        }
      );
  }
  newAcoount() {
    this.navCtrl.setRoot('SignupPage')
  }
}
