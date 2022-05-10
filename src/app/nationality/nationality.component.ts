import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { Nationality } from 'src/assets/shared/_models/Nationality';
import { NationaliteService } from '../_services/nationalite.service';

@Component({
  selector: 'app-nationality',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.sass']
})
export class NationalityComponent implements OnInit {
    nltList:[];
    registerFormNlt: FormGroup;
    submitted = false;
    modalRef: any;
    filterString = "";
    filtered;
    p;

    checkIdupdateNAt=false;
    idnat;
    updatelibellenNat;
    nationalities = new Nationality();

    constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private nltServices:NationaliteService ) {
      this.registerFormNlt = this.formBuilder.group({
        libelle: [null, Validators.required], 
      })
    }
  
    ngOnInit() {
      this.onFilterChange()
    }
    get u() { return this.registerFormNlt.controls }
   
    onReset() {
      this.submitted = false;
      this.registerFormNlt.reset();
      this.modalRef.hide()
      this.checkIdupdateNAt=false
    }
  
    onSubmitNlt(){
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerFormNlt.invalid) {
          return;
      }

      console.log("checkupdatebutton",this.checkIdupdateNAt)
      if(this.checkIdupdateNAt){
        this.nationalities.libelle=this.updatelibellenNat
        console.log("checkupdatebutton",this.idnat,this.nationalities)
 
        this.nltServices.updateNltById(this.idnat,this.nationalities).subscribe(
      
          ()=>{
         
            this.modalRef.hide();
            this.ngOnInit();
          },
          err => {
              console.error(err)
          }
      )
      }else{
    this.nationalities.libelle=this.registerFormNlt.value.libelle
    this.nltServices.createNlt(this.nationalities)
    .subscribe(
      (response) =>{
        this.modalRef.hide();
        this.ngOnInit();
      })
    }
    }
  
    openModal(template: TemplateRef<any>,id,libelleupdate) {
     
      if(id){
        this.idnat=id
        this.checkIdupdateNAt=true
        this.updatelibellenNat=libelleupdate
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
      this.nltServices.getNlt().subscribe((dataNlt) => {
        this.nltList = dataNlt
        this.filtered = this.nltList.filter((invoice) => this.isMatch(invoice));
        console.log(this.filtered)
        },
         (error: any) => {})
    }
  //supp nationality
    deleteNlt(id) {
      this.nltServices.deleteNltById(id).subscribe((dataQlt) => {
        this.ngOnInit()
      }, (error: any) => { })
    }
  
  }
