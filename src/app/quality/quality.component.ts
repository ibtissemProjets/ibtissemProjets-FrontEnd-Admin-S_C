import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { Quality } from 'src/assets/shared/_models/Quality';
import { QualiteService } from '../_services/qualite.service';
@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.sass']
})
export class QualityComponent implements OnInit {
  qltList:[];
  registerFormQlt: FormGroup;
  submitted = false;
  modalRef: any;
  filterString = "";
  filtered;
  p;
  
  checkIdUpdateQlt=false;
  idQT;
  libQtUpdated;

  qualites = new Quality();

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private qltServices:QualiteService ) {
    this.registerFormQlt = this.formBuilder.group({
      libelle: [null, Validators.required], 
    })
  }

  ngOnInit() {
    this.onFilterChange()
  }
  get u() { return this.registerFormQlt.controls }


  onReset() {
    this.submitted = false;
    this.registerFormQlt.reset();
    this.modalRef.hide()
  }

  onSubmitQlt(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerFormQlt.invalid) {
      return;
    }
    if (this.checkIdUpdateQlt) {
      this.qualites.libelle = this.libQtUpdated;
      this.qltServices.updateQltById(this.idQT, this.qualites)
        .subscribe(
          () => {
            this.modalRef.hide();
            this.ngOnInit();
          },
          err => { console.error(err); }
        )
    } else {
      this.qualites.libelle = this.registerFormQlt.value.libelle
      this.qltServices.createQlt(this.qualites)
        .subscribe(
          (response) => {
            this.modalRef.hide()
            this.ngOnInit()
          })

    }
  }

  openModal(template: TemplateRef<any>,id,libUpdated) {
    if(id){
      this.checkIdUpdateQlt=true;
      this.idQT=id;
      this.libQtUpdated=libUpdated;
    }
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
    this.qltServices.getQlt().subscribe((dataQlt) => {
      this.qltList = dataQlt
      this.filtered = this.qltList.filter((invoice) => this.isMatch(invoice));
      console.log(this.filtered)
      }, 
      (error: any) => {})
  }
//supp qlt
  deleteQlt(id) {
    this.qltServices.deleteQltById(id).subscribe((dataQlt) => {
      this.ngOnInit()
    }, (error: any) => { })
  }

}



