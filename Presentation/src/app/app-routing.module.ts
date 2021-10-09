import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberSearchComponent } from './member-search/member-search.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';

const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "home"},
  {path: "member-search", component: MemberSearchComponent},
  { path: 'detail/:id', component: MemberDetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
