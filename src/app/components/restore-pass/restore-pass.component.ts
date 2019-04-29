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
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  constructor(public authService: AuthService, private toastr: ToastrService,
    public router: Router) { }

  ngOnInit() {
    this.myStyle = {
      'position': 'absolute',
      'width': '100%',
      'height': '100%',
      'z-index': 0,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0
    };

    this.myParams = {
      particles: {
        number: {
          value: 180
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle'
        },
        line_linked: {
          color: '#ffffff'
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onclick: {
            mode: 'repulse'
          }
        }
      }
    };
  }

  onSubmitRestore() {
    this.authService.restorePass(this.email).then((res) => {
      this.toastr.success('Correo para restablecer contraseña enviado');
      this.router.navigate(['login']);
    });
  }

  return() {
    this.router.navigate(['login']);
  }

}
