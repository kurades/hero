import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState, selectUser } from '../../core/store/User/user.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../core/models/user';
import { updateProfile } from '../../core/store/User/user.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  user: User;
  userForm: FormGroup;
  userSubscription: Subscription;
  constructor (
    private store: Store<{ user: UserState }>,
    private fb: FormBuilder
  ) {}

  ngOnInit (): void {
    this.fetchUser();
    this.initForm();
  }

  fetchUser (): void {
    this.userSubscription = this.store.select(selectUser).subscribe(u => {
      this.user = u as User;
    });
  }

  save (): void {
    console.log(this.userForm.value);
    const user: User = this.userForm.value;
    this.store.dispatch(updateProfile({ user }));
  }

  initForm (): void {
    if (this.user) {
      this.userForm = this.fb.group({
        _id: [this.user._id],
        name: [this.user.name],
        email: [this.user.email, Validators.email],
        phone: [
          this.user.phone,
          [Validators.pattern('^[0-9]+'), Validators.minLength(10)]
        ]
      });
    }
  }
  get _id () {
    return this.userForm.get('_id');
  }
  get name () {
    return this.userForm.get('name');
  }
  get email () {
    return this.userForm.get('email');
  }
  get phone () {
    return this.userForm.get('phone');
  }

  ngOnDestroy (): void {
    this.userSubscription.unsubscribe();
  }
}
