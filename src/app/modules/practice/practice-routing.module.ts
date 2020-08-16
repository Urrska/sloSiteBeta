import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PracticeComponent} from './practice.component';
import {PracticeSingleComponent} from './practice-single/practice-single.component';
import {AuthGuard} from '../../core/guard/auth.guard';


const practiceRoutes: Routes = [
  {
    path: 'practice',
    component: PracticeComponent,
    data: {requiresLogin: true},
    canActivate: [AuthGuard]
  },
  {
    // posamezna vaja
    path: 'practice/:id',
    component: PracticeSingleComponent,
    data: {requiresLogin: true},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(practiceRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class PracticeRoutingModule {
}
