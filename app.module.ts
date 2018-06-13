import { AuthConst } from './constants/auth.constants';
import { LoaderService } from 'app/services/loader.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // added as part of ng2-Idle implementation

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module'
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { BillingAdminModule } from './billing-administration/billing-admin.module';
import { UtilityMenuModule } from './utility-menu/utility-menu.module';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from 'app/user/auth.service';
import { EnvConfig } from 'app/services/env-config';
import { AccountsPayableModule } from './accounts-payable/accounts-payable.module';
import { DialogModule, CheckboxModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    DialogModule,
    CheckboxModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    ReactiveFormsModule,
    UserModule,
    BillingAdminModule,
    UtilityMenuModule,
    AccountsPayableModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [EnvConfig, LoaderService, AuthConst, AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [EnvConfig],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

export function startupServiceFactory(startupService: EnvConfig): Function {
  return () => startupService.getEnvironment()
}
