import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ReferencesListComponent } from './features/references/references-list/references-list.component';
import { ReferenceFormComponent } from './features/references/reference-form/reference-form.component';
import { ReferenceDetailComponent } from './features/references/reference-detail/reference-detail.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'references', component: ReferencesListComponent, canActivate: [AuthGuard] },
  { path: 'references/new', component: ReferenceFormComponent, canActivate: [AuthGuard] },
  { path: 'references/:id', component: ReferenceDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/references', pathMatch: 'full' },
  { path: '**', redirectTo: '/references' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
