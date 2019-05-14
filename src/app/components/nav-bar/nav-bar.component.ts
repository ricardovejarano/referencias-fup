import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AutoLogoutService } from 'src/app/services/auto-logout.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: { 'id': 'sideBar' }
})
export class NavBarComponent implements OnInit, AfterViewInit, OnDestroy {

  flag = true;
  logged = 'false';
  navUrl;
  formHeight = 0;
  mainCard;
  finalRef;
  formRef;

  constructor(public router: Router, public authService: AuthService, private activatedRoute: ActivatedRoute, 
    public autoLogout: AutoLogoutService) {
    this.logged = localStorage.getItem('logged');
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(url => {
      this.navUrl = String(url);
    });
  }

  ngAfterViewInit() {

    switch (this.navUrl) {
      case 'icontec': this.activeReference('collapseOne'); break;
      case 'apa': this.activeReference('collapseTwo'); break;
      case 'ieee': this.activeReference('collapseThree'); break;
      default:
        break;
    }
  }

  logout() {
    this.autoLogout.stopInterval();
    this.router.navigate(['/']);
    localStorage.setItem('logged', 'false');
    this.authService.logout();
    this.logged = 'false';
  }


  activeReference(collapseMenu) {
      const accordeon = document.getElementById(collapseMenu);
      accordeon.classList.add('show');
  }

  ngOnDestroy() {
  }
}
