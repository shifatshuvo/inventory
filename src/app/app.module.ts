import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './layout/shared/side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SideNavComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    RouterModule,

    FormsModule,
    // HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  // providers: [],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
