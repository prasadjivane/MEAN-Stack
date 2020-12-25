import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Users } from 'src/app/model/users';


@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  userData: Users [];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateUsers();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.getUsers(id);
    this.editForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phonenumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      profileimage: ['', [Validators.required]]
    });
  }
  updateUser() {
    throw new Error('Method not implemented.');
  }

  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('designation').setValue(e, {
      onlySelf: true
    });
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getUsers(id) {
    this.apiService.getUser(id).subscribe(data => {
      this.editForm.setValue({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phonenumber: data.phonenumber,
        profileimage: data.profileimage,
      });
    });
  }

  updateUsers() {
    this.editForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phonenumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      profileimage: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure to edit?')) {
        const id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateUsers(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/users-list');
            console.log('Users updated successfully..!');
          }, (error) => {
            console.log(error);
          });
      }
    }
  }

}
