import { Component, OnInit, TemplateRef } from '@angular/core';
 import { TestfilmService } from '../_services/testfilm.service';
import { BsModalService } from 'ngx-bootstrap';
import { FormsModule ,FormBuilder, FormGroup, ReactiveFormsModule, FormControl, FormArray, Validators  } from '@angular/forms';
import { FilmsService } from '../_services/films.service';
import { CategorieService } from '../_services/categorie.service';
import { Toaster } from 'ngx-toast-notifications';
import { QualiteService } from '../_services/qualite.service';
import { NationaliteService } from '../_services/nationalite.service';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  selectedIdQuelite;
  listqtl:[]
  
  selectedIdNationalite;
  nltList:[]

  CategorieList=[];
  categList :any
  //categLis2t
  arrayGeneral=[];
  form: any;
  selectedOrderIds

  FilmListDeatils: any;
  filmlist: [];
  registerFormFilm: FormGroup;
  submitted = false;
  modalRef: any;
  filterString = "";
  filtered;
  userid;
  p;
 
  private baseUrl="http://localhost:8080";
   
  constructor( private http: HttpClient, private nltServices:NationaliteService ,private qltServices:QualiteService, private toaster: Toaster,private _formBuilder: FormBuilder,private modalService: BsModalService, private formBuilder: FormBuilder, private filmservices: FilmsService,private categorieServices:CategorieService) {
    
    this.userid = localStorage.getItem("userId"),
      this.registerFormFilm = this.formBuilder.group({
        titre: [null, Validators.required],
        prix: [null, Validators.required],
        duree: [null, Validators.required],
        dateLancement: [null, Validators.required],
        diffusion: [null, Validators.required,],
        discription: [null, Validators.required,],
        auteur: [null, Validators.required],
        qualite: [null, Validators.required],
        NationaliteId: [null, Validators.required],
      })
      // this.form = this._formBuilder.group({
      //   orders: new FormArray(controlArray),
      // });
  }

  ngOnInit() {
    this.onFilterChange()
      this.categorieServices.getCategorie().subscribe(
        (dataCatg) => { this.categList = dataCatg
          const controlArray = this.categList.map(c => new FormControl(false));
          controlArray[0].setValue(true);
          this.form = this._formBuilder.group({
          orders: new FormArray(controlArray),
        });
        // this.dataSource = new MatTableDataSource(response);
      }, (error: any) => { } )
      this.qltServices.getQlt().subscribe((dataQlt) => {
      this.listqtl = dataQlt
        // this.dataSource = new MatTableDataSource(response);
      }, (error: any) => {})
      this.nltServices.getNlt().subscribe((dataNlt) => {
        this.nltList = dataNlt
          // this.dataSource = new MatTableDataSource(response);
        }, (error: any) => {})

  }

  get f() { return this.registerFormFilm.controls }

  onSubmitFilm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerFormFilm.invalid) {
      return;
    }
    // if(this.selectedOrderIds.length==0){
    //   this.toaster.open({
    //     text: "Categorie Required !",
    //     caption: "SoireeCinema" + ' notification',
    //     type: "warning",
    //   });
     
    // }
    this.registerFormFilm.value.NationaliteId=this.selectedIdNationalite
    this.registerFormFilm.value.qualite = this.selectedIdQuelite
    this.registerFormFilm.value.UserId = this.userid
    this.registerFormFilm.value.dataCat=this.selectedOrderIds
     console.log('checknationlite',this.registerFormFilm.value)
    this.filmservices.createfilm(this.registerFormFilm.value).subscribe(
      () => {
        this.modalRef.hide()
        this.ngOnInit()
      })
  }

  onReset() {
    this.submitted = false;
    this.registerFormFilm.reset();
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
      console.log("item", item)
      return Object.keys(item).some((k) => this.isMatch(item[k]));
    } else {
      return item.toString().indexOf(this.filterString) > -1
    }
  }

  onFilterChange() {
      this.filmservices.getFilmbyid(this.userid).subscribe((datafilm) => {

      this.filmlist = datafilm.film

      this.filtered = this.filmlist.filter((invoice) => this.isMatch(invoice));
      console.log(this.filtered)
      // this.dataSource = new MatTableDataSource(response);
    }, (error: any) => { } )
  }

  deletefilm(id) {
    this.filmservices.deleteFilmbyId(id).subscribe((datafilm) => {
      // this.dataSource = new MatTableDataSource(response);
      this.ngOnInit()
    }, (error: any) => { })
  }

  onChange(){
     this.selectedOrderIds = this.form.value.orders
    .map((v, i) => v ? this.categList[i].id : null)
    .filter(v => v !== null);

console.log(this.selectedOrderIds)
  }

  openModal2(template2: TemplateRef<any>,id){
    this.CategorieList=[]
    this.modalRef = this.modalService.show(template2, {
      animated: true,
      backdrop: 'static',
    });
    // this.submitted = false;
      this.categorieServices.getCategorieByFilm(id).subscribe((data) => {
      console.log(data)
      data.forEach(element => {
        this.CategorieList.push(element.categorie)
        this.FilmListDeatils=element.film
      });
      
      // console.log(this.CategorieList)
      console.log(this.FilmListDeatils)
    })
  }
}
