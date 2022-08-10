import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Reactive form';
  submitted: boolean = false;
  add_form: boolean = true;
  registerForm: FormGroup;
  registeredUsers: any = [];
  editedUser: any = {};

  constructor(private fb: FormBuilder) {
    this.registeredUsers = [
      {
        id: 'P1',
        firstName: 'Revati',
        lastName: 'Kumari',
        email: 'krevati@gmail.com',
        phone: '8976543210',
        company: 'Nike',
        gender: 'female',
        dob: '14-03-1991',
        password: '123456r',
        confirmPassword: '123456r'
      },
      {
        id: 'P2',
        firstName: 'sourav',
        lastName: 'sen',
        email: 'sen@gmail.com',
        phone: '1234567890',
        company: 'google',
        gender: 'male',
        dob: '03-09-1999',
        password: '123456s',
        confirmPassword: '123456s'
      },
      {
        id: 'P3',
        firstName: 'pratik',
        lastName: 'Kumar',
        email: 'pratik@gmail.com',
        phone: '9876543210',
        company: 'Keeno',
        gender: 'male',
        dob: '17-05-1889',
        password: '123456p',
        confirmPassword: '123456p'
      }
    ];
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/[0-9]{10}/g)]],
      company: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get formValues() {
    return this.registerForm.controls;
  }

  addUser() {
    this.add_form = true;
    this.editedUser = {};
    this.submitted = false;
    this.registerForm.reset();
  }

  submitForm() {
    this.submitted = true;
    console.log(this.registerForm);
    console.log(this.formValues);
    // console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }
    if (this.add_form) {
      let newUser: any = this.registerForm.value;
      let dob_pass = this.registerForm.value.dob.split('-');
      let newId = `DOB_${dob_pass[2]}${dob_pass[1]}`;
      console.log(newId);
      newUser.id = newId;
      this.registeredUsers.push(newUser);
    } else if (this.editedUser) {
      let userIndex = this.registeredUsers.findIndex(
        item => item.id === this.editedUser.id
      );
      if (userIndex != -1) {
        this.registeredUsers[userIndex] = this.registerForm.value;
      }
    }
    this.add_form = true;
    this.submitted = false;
    this.registerForm.reset();
  }

  editUser(editUser, i) {
    this.add_form = false;
    console.log(editUser);
    this.editedUser = editUser;
    this.registerForm.patchValue({
      firstName: editUser.firstName,
      lastName: editUser.lastName,
      email: editUser.email,
      phone: editUser.phone,
      company: editUser.company,
      gender: editUser.gender,
      dob: editUser.dob,
      password: editUser.password,
      confirmPassword: editUser.confirmPassword
    });
  }

  deleteUser(user) {
    this.registeredUsers = this.registeredUsers.filter(
      item => item.id != user.id
    );
    this.add_form = true;
    this.registerForm.reset();
  }

  cancelForm() {
    this.add_form = true;
    this.registerForm.reset();
    this.editedUser = {};
  }

  changeVal1(eve) {
    console.log(eve);
  }

  changeVal2(eve) {
    console.log(eve);
  }
}
