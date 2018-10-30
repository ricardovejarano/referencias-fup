import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restore-pass',
  templateUrl: './restore-pass.component.html',
  styleUrls: ['./restore-pass.component.css']
})
export class RestorePassComponent implements OnInit {
  email = '';

  constructor(public authService: AuthService, private toastr: ToastrService,
    public router: Router) { }

  ngOnInit() {
  }

  onSubmitRestore() {
    this.authService.restorePass(this.email);
  }

  return() {
    this.router.navigate(['login']);
  }

}
