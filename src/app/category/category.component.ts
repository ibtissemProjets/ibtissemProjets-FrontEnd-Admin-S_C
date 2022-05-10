import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestfilmService } from '../_services/testfilm.service';
import { BsModalService } from 'ngx-bootstrap';
import { CategorieService } from '../_services/categorie.service';
import { Category } from 'src/assets/shared/_models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {
  categList: []
  registerFormCateg: FormGroup;
  submitted = false;
  modalRef: any;
  filterString = "";
  filtered;
  userid;
  p;

  checkIdupdateCatg=false;
  idCatg;
  updatelibellenCatg;
  categorys = new Category();

  constructor(private modalService: BsModalService, private formBuilder: FormBuilder, private categorieServices: CategorieService) { 
    this.userid = localStorage.getItem("userId"),
    this.registerFormCateg = this.formBuilder.group({
      libelle: [null, Validators.required],
      
    })
  }

  ngOnInit() {
    this.onFilterChange();
  }
  get f() { return this.registerFormCateg.controls }

  onSubmitCatg() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerFormCateg.invalid) {
      return;
    }
    // this.registerFormCateg.value.UserId = this.userid
    if(this.checkIdupdateCatg){
      this.categorys.libelle=this.updatelibellenCatg
      console.log("checkupdatebutton",this.idCatg,this.categorys);

      this.categorieServices.updateCategorieById(this.idCatg,this.categorys).subscribe(
    
        ()=>{
       
          this.modalRef.hide();
          this.ngOnInit();
        },
        err => {
            console.error(err)
        }
    )
    }
    else{
    this.categorys.libelle=this.registerFormCateg.value.libelle
    this.categorieServices.createCategorie(this.categorys).subscribe(

      () => {
        this.modalRef.hide()
        this.ngOnInit()
      })
    }
  }

  onReset() {
    this.submitted = false;
    this.registerFormCateg.reset();
    this.modalRef.hide()
  }

  openModal(template: TemplateRef<any>,id,libelleupdate) {
      if(id){
        this.idCatg=id;
        this.checkIdupdateCatg=true;
        this.updatelibellenCatg=libelleupdate;
      }
        this.modalRef = this.modalService.show(template, {
        animated: true,
        backdrop: 'static',
      });
      this.submitted = false;
    }
  

  isMatch(item) {
    if (item instanceof Object) {
      console.log("item", item)
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item.toString().indexOf(this.filterString) > -1
    }
  }

  
  onFilterChange() {
    this.categorieServices.getCategorie().subscribe((dataCatg) => {

      this.categList = dataCatg

      this.filtered = this.categList.filter((invoice) => this.isMatch(invoice));
      console.log(this.filtered)
      // this.dataSource = new MatTableDataSource(response);
    }, (error: any) => { } )
  }

  //supp 1 categ
  deleteCateg(id) {
    this.categorieServices.deleteCategorieById(id).subscribe((dataCat) => {
      // this.dataSource = new MatTableDataSource(response);
      this.ngOnInit()
    }, (error: any) => { })
  } 

}
