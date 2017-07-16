import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingProvider } from '../../providers/loading/loading';
import { UserProvider } from '../../providers/user/user';
// import { DecimalPipe, PercentPipe } from '@angular/common';

@IonicPage({
  name: 'userform'
})
@Component({
  selector: 'page-user-form',
  templateUrl: 'user-form.html',
})
export class UserFormPage {

  private user: any;
  private masks: any;
  private userForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _loading: LoadingProvider,
    public _user: UserProvider,
    private formBuilder: FormBuilder,
    // private decimalPipe: DecimalPipe,
    // private percentPipe: PercentPipe,
  ) {
    this.user = this.navParams.get('user');

    this.userForm = this.formBuilder.group({
      id:          [''],
      first_name:  ['', Validators.required],
      last_name:   ['', Validators.required],
      email:       ['', Validators.required],
      phone:       [''],
      gender:      [''],
      picture:     [''],
      birth_date:  [''],
      fat_percent: [''],
      weight:      [''],
      height:      [''],
      is_coach:    ['', Validators.required],
      info:        [''],
      goal:        [''],
      limitations: [''],
    });
  }


  ionViewWillEnter() {
    this.setUserData();
  }

  private setUserData() {

    this.userForm.patchValue(this.user);


    if (this.user.weight) {
      this.userForm.controls['weight'].setValue(this.user.weight.replace('.',','));
    }

    if (this.user.height) {
      this.userForm.controls['height'].setValue(this.user.height.replace('.',','));
    }

    if (this.user.fat_percent) {
      this.userForm.controls['fat_percent'].setValue(this.user.fat_percent.replace('.',','));
    }

    // console.log(this.user, typeof this.user.weight);
  }

  private submit() {
    // console.log(this.userForm.value);

    if (this.user && this.user.id) {
      let params = this.userForm.value;
      if (params.weight) {
        params.weight = params.weight.replace(',', '.');
      }
      if (params.height) {
        params.height = params.height.replace(',', '.');
      }
      if (params.fat_percent) {
        params.fat_percent = params.fat_percent.replace(',', '.');
      }

      // console.log(params);

      this._user
        .update(params)
        .then(user => {
          // console.log(user);
          // this.checkCoachModeChanged(this.user, user);
          this.goBack();
        });
    }
  }

  public checkCoachModeChanged(user, updatedUser) {
    // console.log('checkCoachModeChanged', user.is_coach, updatedUser.is_coach);
    if (user.is_coach != updatedUser.is_coach) {
      this._user.showCoachModeChangedAlert(() => this.goBack());
    } else {
      this.goBack();
    }
  }

  private goBack() {
    this.navCtrl.pop();
  }

}
