import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';

// DEMO PAGES

// Dashboards

import {AnalyticsComponent} from './DemoPages/Dashboards/analytics/analytics.component';

 
import { FilmComponent } from './film/film.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { QualityComponent } from './quality/quality.component';
import { CategoryComponent } from './category/category.component';
import { NationalityComponent } from './nationality/nationality.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
},
{path: 'login', component:LoginComponent, data: {extraParameter: 'dashboardsMenu'}},
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
//login 

      //film 
    
      {path: 'film', component:FilmComponent, data: {extraParameter: 'dashboardsMenu'}},

      //user
      {path: 'quatlite', component:QualityComponent, data: {extraParameter: 'dashboardsMenu'}},
      {path: 'categorie', component:CategoryComponent, data: {extraParameter: 'dashboardsMenu'}},
      {path: 'Nationalite', component:NationalityComponent, data: {extraParameter: 'dashboardsMenu'}},
      {path: 'user', component:UserComponent, data: {extraParameter: 'dashboardsMenu'}},
      // Dashboads

      {path: '', component: AnalyticsComponent, data: {extraParameter: 'dashboardsMenu'}},

     
 

    

    ]

  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [

      // User Pages
 
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
