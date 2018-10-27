import { Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rootPage: any;
  login: boolean;
  constructor() {
    if (localStorage.getItem('logged') === 'true') {
      this.login = true;
      this.rootPage = HomeComponent;
    } else {
      this.login = false;
      this.rootPage = LoginComponent;
    }
  }
}
