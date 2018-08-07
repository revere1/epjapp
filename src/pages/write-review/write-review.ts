import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Global } from '../../Global';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
/**
 * Generated class for the WriteReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-write-review',
  templateUrl: 'write-review.html',
})
export class WriteReviewPage {
  reviewForm: FormGroup;
  currentUser: any;
  token: any;
  result: any;
  productId: any;
  constructor(public navCtrl: NavController,
    private storage: Storage,
    private http: Http,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    public navParams: NavParams) {
    this.storage.get('token').then(data => {
      this.token = data;
    });
    this.storage.get('UserDetails').then(data => {
      this.currentUser = data;
      this.reviewForm.controls['name'].patchValue(this.currentUser.user_name);
    });
    this.storage.get('productData').then(data => {
      this.productId = data.product.id;
    });
    this.reviewForm = this.formBuilder.group({
      name: [''],
      review: ['', Validators.required]
    })
  }
  @ViewChild('myInput') myInput: ElementRef;
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WriteReviewPage');
  }
  SaveReview() {
    let reviewObj = {
      "pid": this.productId,
      "uid": this.currentUser.user_id,
      "review": this.reviewForm.get('review').value,
      "token": this.token
    };
    this.http.post(`${Global.SERVER_URL}product-review`, reviewObj)
      .subscribe(data => {
        this.result = JSON.parse(data["_body"])
        if (this.result.success) {
        } else {
          let toast = this.toastCtrl.create({
            message: this.result.message,
            duration: 2000,
            position: 'middle'
          });
          toast.present(toast);
        }
      }, err => {
        alert(err);
      });
  }
}
