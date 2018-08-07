import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Global } from '../../Global';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signUpForm: FormGroup;
  result : any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private formBuilder: FormBuilder,
    private toastCtrl : ToastController,
    public alertCtrl: AlertController
  ) {
    this.signUpForm = this.formBuilder.group({
      // user_name: ['',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.minLength(8), Validators.maxLength(30)]],
       user_name: ['',[Validators.required,Validators.pattern('[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*'),Validators.minLength(6), Validators.maxLength(30)]],      
      user_email : ['',[Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signIn() {
    this.navCtrl.push('SigninPage');
  }
  signUp() {
    // this.navCtrl.push('SigninPage');
    let regObj = {
      "user_name": this.signUpForm.get('user_name').value,
      "user_email": this.signUpForm.get('user_email').value,
      "password": this.signUpForm.get('password').value,
      "api_code": '6209232b45aea869fb846a89d263fb3a'

    }
    this.http.post(`${Global.SERVER_URL}register`, regObj)
      .subscribe(data => {
        this.result = JSON.parse(data["_body"])
        if (this.result.success) {
           this.navCtrl.setRoot(SigninPage);
           this.signUpForm.reset();
        } else {
          let toast = this.toastCtrl.create({
            message: this.result.message,
            duration: 2000,
            position: 'middle'
          });      
          toast.present(toast);
          // const alert = this.alertCtrl.create({
          //   message: this.result.message
          // });
          // alert.present();
        }
      },
        err => {
          alert(err);
        }
      );
  }
}
