import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
 
import { CarousselService } from 'src/app/_services/caroussel.service';
@Component({
  selector: 'app-caroussel-photo',
  templateUrl: './caroussel-photo.component.html',
  styleUrls: ['./caroussel-photo.component.scss']
})
export class CarousselPhotoComponent implements OnInit {
  imagePreview=""
  modalRef: any;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  rawFileArray = [];
  base64ImgArray = [];
  public data = [];
  public selectedFile: any;
public article = {description: ''};
  constructor(private modalService: BsModalService,private carousselservices:CarousselService) {}

  ngOnInit() {

    this.getArticle()
  }
  onImagePicked(fileInput) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0] && this.rawFileArray.indexOf(fileInput.target.files[0])==-1) {
      // Size Filter Bytes
      this.rawFileArray.push(fileInput.target.files[0]);
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            this.base64ImgArray.push(imgBase64Path);
            // this.previewImagePath = imgBase64Path;
            console.log(this.base64ImgArray)
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
    // console.log(this.rawFileArray)
  }
  removeImage(index){
    this.rawFileArray.splice(index,1);
    this.base64ImgArray.splice(index,1)
   
  }

  getArticle() {
    this.data = [];
    this.carousselservices.getPhoto().subscribe(res => {
      console.log(res['data']);
      for (const dd of res['data']) {
       var imgURL = btoa(
          dd.data.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
       )
         this.data.push({id: dd.article_id, description: dd.description, url: imgURL});
      }
    })
  }

  
  openModal(template: TemplateRef<any>) {
   
      this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static',
    });
 
  }

  onReset() {
 
    this.modalRef.hide()
 
  }

  addphoto(){
    const data: FormData = new FormData();
    console.log(this.selectedFile)
    data.append('name', this.selectedFile);
  
    this.carousselservices.createCaroussel(data)
    .subscribe(
      (response) =>{
      

          this.modalRef.hide();
          this.ngOnInit()
       
       
 
      })
    
  }
  fileUpload(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  fileUploadHandler(event) {
    event.preventDefault();
    console.log(this.article.description);

    const data: FormData = new FormData();
    data.append( 'image', this.selectedFile);
    data.append('description', this.article.description);
    console.log("eeee",data)
    this.carousselservices.createCaroussel(data)
    .subscribe(res => {
         if(res['status'] === 200) {
       
         }
    })
  }

  

}
