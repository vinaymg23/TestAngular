import { AuthConst } from './constants/auth.constants';
import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './user/auth.service';
import { LoaderService } from 'app/services/loader.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';



@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <app-header></app-header>
    <app-main-menu *ngIf="authService.isLoggedIn"></app-main-menu>
    <router-outlet></router-outlet>
    <app-footer *ngIf="authService.isLoggedIn"></app-footer>
    <span *ngIf="showLoader" class="custom-loading">
     <span class="spinner-container"><div class="sp sp-slices"></div></span>
    </span>
    <div class="timeout-loader" *ngIf="isTimedout">
      <div class="message">
        Session Timed out
        <small>Please login and try again</small>
        <button class="btn-custom blue" (click)="gotoSignin()">Login</button>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  selectedPermissions = [];
  isTimedout = false;
  showLoader: boolean;



  constructor(
    private idle: Idle, private keepalive: Keepalive,
    private authConst: AuthConst, private authService: AuthService,
    private router: Router, private loaderService: LoaderService,
  ) {
    this.idleTimeOut();
  }
  idleTimeOut() {
    // sets an idle timeout of 60 sec.
    this.idle.setIdle(60);
    //  after 50 min of inactivity, the user will be considered timed out.
    this.idle.setTimeout(50 * 60);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.getUserDetails();
      console.log(`time out  on IdleEnd()  ${this.isTimedout}`);
    });
    this.idle.onTimeout.subscribe(() => {
      this.isTimedout = true;
      console.log(`time out on Timeout()  ${this.isTimedout}`);
    });
    this.idle.onIdleStart.subscribe(() => {
      console.log(`idle start()  ${this.isTimedout}`);
    });
    this.idle.watch();
  }

  @HostListener('window:focus', ['$event'])
  onFocus(event) {
    // console.log('active')
    this.getUserDetails();
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event) {
    // console.log('blur')
    this.getUserDetails();
  }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.loaderService.status.subscribe((val: boolean) => {
      setTimeout(() => {
        this.showLoader = val;
      }, 10);
    });
    setTimeout(() => {
      this.getOverride();
      this.getUserDetails();
    }, 1000);
  }

  getOverride() {
    this.authService.enableUserOverride().subscribe(res => {
      this.authService.setOverride(res);
    }, err => {
      this.authService.setOverride(err);
    });
  }
  getUserDetails() {
    // SSO Starts
    this.authService.getUserDetails().subscribe(res => {
      // console.log(res);
      this.authService.userDetails = res;
      if (res.username === null || res.username === 'templar' || res.username === 'null') {
        this.isTimedout = true;
      }
      if (res.authorities) {
        for (let i = 0; i < res.authorities.length; i++) {
          this.selectedPermissions.push(res.authorities[i].authority);
        }
        this.authService.setUserPermissions(this.selectedPermissions);
      }
    }, err => {
      console.log(JSON.stringify(err));
    });
    // SSO Ends
  }


  gotoSignin() {
    location.replace('/saml/logout');
  }
}
