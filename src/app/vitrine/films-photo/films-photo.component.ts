import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/_services/categorie.service';
import { FilmsService } from 'src/app/_services/films.service';

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
  constructor( private filmservices: FilmsService) { 
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
}
