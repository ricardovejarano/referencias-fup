import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: { 'id': 'sideBar' }
})
export class NavBarComponent implements OnInit, AfterViewInit, AfterViewChecked {

  flag = true;
  logged = 'false';
  navUrl;

  constructor(public router: Router, public authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.logged = localStorage.getItem('logged');
  }

  ngOnInit() {
    this.activatedRoute.url
      .subscribe(url => {
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
    this.router.navigate(['/']);
    localStorage.setItem('logged', 'false');
    this.authService.logout();
    this.logged = 'false';
  }


  activeReference(collapseMenu) {
      const accordeon = document.getElementById(collapseMenu);
      accordeon.classList.add('show');
  }

  ngAfterViewChecked() {

    const mainCard = document.getElementById('Reference');
    const finalRef = document.getElementById('clipboard');
    const formRef = document.getElementById('formReference');

    const formHeight = mainCard.offsetHeight - finalRef.offsetHeight;
    formRef.style.height = 'calc(' + String(formHeight) + 'px - 7rem)';
    console.log(formHeight);
  }
}
