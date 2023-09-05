import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Login } from 'src/app/core/models/login.user';
import { login, register } from 'src/app/core/store/User/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;


  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
      rePassword: ['',[Validators.required,Validators.minLength(6)]],
    })
  }

  onSubmit(): void {
    // console.log(this.registerForm.value);
    const value = this.registerForm.value;
    this.store.dispatch(register(value))
  }
}
