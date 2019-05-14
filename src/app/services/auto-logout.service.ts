import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const MINUTES_UNITL_AUTO_LOGOUT = 1; // in mins
const CHECK_INTERVAL = 15000; // in ms
const STORE_KEY = 'lastAction';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  flagCheck = false;
  logged = '';
  intervalVariable;

  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY), 10);
  }
  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router) {
    // console.log('CONSTRUCTOR DE SESIÓN');
    this.logged = localStorage.getItem('logged');
    // console.log('Vriable logged', this.logged);
    if (this.logged === 'true') {
      this.startCount();
    }
  }

  startCount(flag?: boolean) {
    if (flag) {
      this.flagCheck = flag;
    }
    // console.log('Inicia conteo');
    this.check(this.flagCheck);
    this.initListener();
    this.initInterval();
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
    document.body.addEventListener('scroll', () => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    this.intervalVariable =  setInterval(() => {
      this.logged = localStorage.getItem('logged');
      if (this.logged === 'true') {
        this.check();
      }
    }, CHECK_INTERVAL);
  }

  stopInterval() {
    clearInterval(this.intervalVariable);
    localStorage.removeItem('lastAction');
  }


  check(flag?) {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const diffAlmost = timeleft - (now + (1000 * 60 * 3));
    const isTimeout = diff < 0;
    // console.log('TIEMPO QUE QUEDA', timeleft);
    this.logged = localStorage.getItem('logged');

    if (isTimeout && flag !== true && this.logged === 'true') {
      window.alert('La sesión ha expirado por inactividad');
      localStorage.removeItem('lastAction');
      clearInterval(now);
      localStorage.setItem('logged', 'false');
      this.router.navigate(['/login']);
    }
  }

}
