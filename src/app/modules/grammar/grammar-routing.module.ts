import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GrammarComponent} from './grammar.component';
import {GrammarLessonComponent} from './grammar-lesson/grammar-lesson.component';
import {AuthGuard} from '../../core/guard/auth.guard';


const grammarRoutes: Routes = [
  {
    path: 'grammar',
    component: GrammarComponent,
    data: {requiresLogin: true},
    canActivate: [AuthGuard]
  },
  {
    path: 'grammar/:lesson',
    component: GrammarLessonComponent,
    data: {requiresLogin: true},
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(grammarRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class GrammarRoutingModule { }
