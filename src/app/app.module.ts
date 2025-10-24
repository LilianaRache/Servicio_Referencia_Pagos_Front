import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MaterialModule } from './shared/material/material.module';

// Componentes generados
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ReferencesListComponent } from './features/references/references-list/references-list.component';
import { ReferenceFormComponent } from './features/references/reference-form/reference-form.component';
import { ReferenceDetailComponent } from './features/references/reference-detail/reference-detail.component';

// Interceptor
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { CancelReferenceDialogComponent } from './features/references/cancel-reference-dialog/cancel-reference-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReferencesListComponent,
    ReferenceFormComponent,
    ReferenceDetailComponent,
    CancelReferenceDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
