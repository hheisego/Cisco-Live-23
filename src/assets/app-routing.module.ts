import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AhcComponent } from './components/ahc/ahc.component';
import { AssbuiltComponent } from './components/assbuilt/assbuilt.component';
import { RequestComponent } from './components/request/request.component';
import { TeHealthComponent } from './components/te-health/te-health.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'te-health', component: TeHealthComponent },
  { path: 'as-built', component: AssbuiltComponent },
  { path: 'engage-ie', component: RequestComponent}
];

/*,
  { path: '**', redirectTo: '/layout', pathMatch: 'full' }
  */


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
