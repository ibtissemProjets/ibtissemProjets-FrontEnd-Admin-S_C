import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../_services/authentication.service.service';
import { Toaster } from 'ngx-toast-notifications'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  credentials: TokenPayload ={
    "id":0,
    "first_name": '',
    "last_name": '',
    "email": '',
    "password": '',
}

private textNosucc = 'Erreur Login ou mot de passe ! Réessayer';

  constructor(private toaster: Toaster,private router: Router,private auth:AuthenticationService) { }
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit() {
  }
 
  login(){
    console.log("dataClient",this.credentials)
    this.auth.login(this.credentials).subscribe(
        (data)=>{
          localStorage.setItem('datauser',data.user.username)
            localStorage.setItem('userId',data.user.id)
            this.router.navigate(['/film'])
           
        },
        err => {
            this.toaster.open({
                text: this.textNosucc,
                caption: "Erreur" + ' notification',
                type: "danger",
              });
            console.error(err)
        }
    )
      
}
}
