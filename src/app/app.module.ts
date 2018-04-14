import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './core/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './core/app.routing.module';
import { LoginComponent } from './login/login.component';
import { ErrorDialogComponent } from './core/error-dialog.component';
import { UserService } from "./app.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthService } from "./core/auth.service";
import { Interceptor } from "./core/inteceptor";
import { TokenStorage } from "./core/token.storage";
import { AuthGuard } from './core/auth.guard';
import { RegisterComponent } from './register/register.component';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CommonModule } from '@angular/common';
import {
  NgbDatepickerModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ErrorDialogComponent,
    RegisterComponent,
    DateTimePickerComponent,
    CalendarHeaderComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDzN_Vcq5K0xRcV6Ln-lYiuKu1rer_vYFc'
    }),
    NgbModule.forRoot(),
    CalendarModule.forRoot(),
    CommonModule,
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
  ],
  entryComponents: [ErrorDialogComponent],
  providers: [
    ErrorDialogComponent,
    UserService,
    AuthService, 
    TokenStorage,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}
  ],
  exports:[
    CalendarHeaderComponent,
    DateTimePickerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
