import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { Global } from '../../Global';
import { AddressPage } from '../address/address';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AddAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {
  addressForm: FormGroup;
  result: any;
  public token: any;
  currentUser: any;
  states: any;
  countries: any;
  public storageStatus: boolean = true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public http: Http,
    private toastCtrl: ToastController,
    private storage: Storage) {
    this.storage.get('token').then(data => {
      this.token = data;
      this.http.get(`${Global.SERVER_URL}get-countries`, {
        params: {
          'token': this.token
        }
      }).subscribe(data => {
        this.result = JSON.parse(data["_body"]);
        console.log(this.result)
        if (this.result.success) {
          this.countries = this.result.countries;
        }
        else {
          alert("Some Technical Issues ..!");
        }
      }, err => {
        alert("Server Busy");
      });
    });
    this.storage.get('UserDetails').then(data => {
      this.currentUser = data;
    });

    this.addressForm = this.formBuilder.group({
      full_name: ['', [Validators.required, Validators.pattern('[a-z]|[A-Z]|[0-9]|[ ]|[-]|[_][.]*'), Validators.minLength(3), Validators.maxLength(50)]],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postal_code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      contact_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
      default_address: ['flase'],
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAddressPage');
  }
  addAddress() {
    var addrObj = {
      "full_name": this.addressForm.get('full_name').value,
      "address1": this.addressForm.get('address1').value,
      "address2": this.addressForm.get('address2').value,
      "city": this.addressForm.get('city').value,
      "state": this.addressForm.get('state').value,
      "country": this.addressForm.get('country').value,
      "postal_code": this.addressForm.get('postal_code').value,
      "contact_number": this.addressForm.get('contact_number').value,
      "default_address": this.addressForm.get('default_address').value,
      "token": this.token,
      "user_id": this.currentUser.user_id
    }
    // this.http.post(`${Global.SERVER_URL}add-address`, addrObj)
    //   .subscribe(data => {
    //     this.result = JSON.parse(data["_body"])
    //     if (this.result.success) {
    //       this.navCtrl.setRoot(AddressPage);
    //       this.addressForm.reset();
    //     } else {
    //       let toast = this.toastCtrl.create({
    //         message: this.result.message,
    //         duration: 2000,
    //         position: 'middle'
    //       });
    //       toast.present(toast);
    //     }
    //   }, err => {
    //     alert(err);
    //   });
  }
  changeCountry(id) {
    this.http.post(`${Global.SERVER_URL}get-states`, { 'country_id': id, 'token': this.token })
      .subscribe(data => {
        this.result = JSON.parse(data["_body"])
        if (this.result.success) {
          this.states = this.result.states;
        } else {
          console.log(this.result.message)
        }
      }, err => {
        alert(err);
      });
  }
}
