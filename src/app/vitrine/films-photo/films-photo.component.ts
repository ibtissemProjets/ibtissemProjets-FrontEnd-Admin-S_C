import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { CategorieService } from 'src/app/_services/categorie.service';
import { FilmsService } from 'src/app/_services/films.service';
import { ImagesFilmService } from 'src/app/_services/images-film.service';

@Component({
  selector: 'app-films-photo',
  templateUrl: './films-photo.component.html',
  styleUrls: ['./films-photo.component.sass']
})
export class FilmsPhotoComponent implements OnInit {
  filterString = "";
  filtered;
  filmlist=[]
  userid
  modalRef: any;
  public selectedFile: any;
  public article = {description: ''};
  Filmid: any;

  constructor(private modalService: BsModalService, private filmservices: FilmsService,private imgservices:ImagesFilmService) { 
    this.userid = localStorage.getItem("userId")
  }

  ngOnInit() {
    this.onFilterChange()
  
  

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

  openModal(template: TemplateRef<any>,id) {
   this.Filmid=id
    this.modalRef = this.modalService.show(template, {
    animated: true,
    backdrop: 'static',
  });

}

openModal2(template: TemplateRef<any>) {
   
  this.modalRef = this.modalService.show(template, {
  animated: true,
  backdrop: 'static',
});

}

addphoto(){
  const data: FormData = new FormData();
  console.log(this.selectedFile)
  data.append('name', this.selectedFile);
  data.append('FilmId',this.Filmid)
  this.imgservices.createImgProfile(data)
  .subscribe(
    (response) =>{
    

        this.modalRef.hide();
        this.ngOnInit()
     
     

    })
  
}
fileUpload(event) {
  this.selectedFile = event.target.files[0];
  this.selectedFile.FilmId = this.Filmid
  console.log(this.selectedFile);
}
fileUploadHandler(event) {
  event.preventDefault();
  console.log(this.article.description);

  const data: FormData = new FormData();
  data.append( 'image', this.selectedFile);
  data.append('description', this.article.description);
  data.append('FilmId',this.Filmid)
  console.log("eeee",data)
  this.imgservices.createImgProfile(data)
  .subscribe(res => {
       if(res['status'] === 200) {
     
       }
  })
}

}
