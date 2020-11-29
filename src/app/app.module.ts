import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenubarComponent } from './menubar/menubar.component';
import { FormsModule } from '@angular/forms';
import { HttpInterceptorBasicAuthServiceService } from './service/http/http-interceptor-basic-auth-service.service';
import { SocialLoginModule, SocialAuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { DatePipe } from '@angular/common'
// import { provideConfig } from '../interceptor/socialLoginConfig';

// let config = new SocialAuthServiceConfig([

//   {
//       id: GoogleLoginProvider.PROVIDER_ID,
//       provider: new GoogleLoginProvider("813388989619-9jms5plhdu4teprdp73lv79ttami6na5.apps.googleusercontent.com")
//   }

// ]);

// export function provideConfig(){
//   return config;
// }

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    MenubarComponent,
    LoginSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    // HttpConfigInterceptorProvider,

    {
      provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorBasicAuthServiceService, multi: true
    },
    {
      provide: 'SocialAuthServiceConfig' ,
      useValue : {
        providers: [
          {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("813388989619-a3jl5oobqoumls1fci05q32q9nu9bqva.apps.googleusercontent.com"),
        }],
      } as SocialAuthServiceConfig,
      
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
