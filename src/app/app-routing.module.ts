import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { MenubarComponent } from './menubar/menubar.component';

const routes: Routes = [
  // {path:'',component: LoginSignupComponent},
  // {path:'login',component: LoginSignupComponent}
  {path:'',component: LoginSignupComponent},
  {path:'login',component: LoginSignupComponent},
  {path:'dashboard/:email',component:DashboardComponent},
  {path:'menubar', component:MenubarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
