import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import {ThemeOptions} from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  constructor(public globals: ThemeOptions,private router: Router) {
  }

  ngOnInit() {
  }

  logout(){
    window.localStorage.removeItem('userToken')
    window.localStorage.removeItem('userId')
 
    this.router.navigateByUrl('/login')
  }

}
