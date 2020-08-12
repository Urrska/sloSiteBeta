import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
// import {AuthGuard} from '../../core/guard/auth.guard';


const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
