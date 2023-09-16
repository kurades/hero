import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Login } from 'src/app/core/models/login.user';
import { login } from 'src/app/core/store/User/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor (private fb: FormBuilder, private store: Store) {}

  ngOnInit (): void {
    this.initForm();
  }

  initForm (): void {
    this.loginForm = this.fb.group({
      name: ['test', Validators.required],
      password: ['123456', Validators.required]
    });
  }

  onSubmit (): void {
    const value: Login = this.loginForm.value;
    this.store.dispatch(login(value));
  }
}
