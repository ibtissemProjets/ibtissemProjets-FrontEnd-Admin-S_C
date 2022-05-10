import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { UserSvService } from '../_services/user-sv.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
 
  userList:[]
  registerFormUser: FormGroup;
  submitted = false;
  modalRef: any;
  filterString = "";
  filtered;
  p;

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private userServices:UserSvService) {
    this.registerFormUser = this.formBuilder.group({
      firstname: [null, Validators.required], 
      lastname: [null, Validators.required],
      dateNaiss: [null, Validators.required],
      email: [null, Validators.required,],
      password: [null, Validators.required, ],
    })
  }

  ngOnInit() {
    this.onFilterChange()
  }

  get u() { return this.registerFormUser.controls }

  onSubmitUser(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerFormUser.invalid) {
        return;
    }
  }

  onReset() {
    this.submitted = false;
    this.registerFormUser.reset();
    this.modalRef.hide()
  }

  openModal(template: TemplateRef<any>) {

   this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static',
    });
    this.submitted = false;
  }

  isMatch(item) {
    if (item instanceof Object) {
      console.log("item",item)
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item.toString().indexOf(this.filterString) > -1
    }
  }

  onFilterChange() {
    this.userServices.getUser().subscribe((dataUser) => {
      this.userList = dataUser
      this.filtered = this.userList.filter((invoice) => this.isMatch(invoice));
      console.log(this.filtered)
      // this.dataSource = new MatTableDataSource(response);
    }, (error: any) => {})
  }

  deleteUser(id) {
    this.userServices.deleteUserById(id).subscribe((dataUser) => {
      // this.dataSource = new MatTableDataSource(response);
      this.ngOnInit()
    }, (error: any) => { })
  }

}
