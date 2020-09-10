import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './components/account/account.component';

const routes: Routes = [
  {path: 'account',  component: AccountComponent},
  {path: 'account/login', component: AccountComponent},
  {path: 'account/register', component: AccountComponent},
  {path: 'account/forgotten-password', component: AccountComponent},
  {path: 'account/verify-email', component: AccountComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard]
})
export class AppRoutingModule {
}
