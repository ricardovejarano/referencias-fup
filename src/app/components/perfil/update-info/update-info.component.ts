import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  srcImage = 'https://firebasestorage.googleapis.com/v0/b/referencias-fup.appspot.com/o/unknown.png?alt=media&token=dc0e2e6e-05a5-47c6-bd65-026c81d69186';

  usuario: Usuario = new Usuario();
  rolUsuario = '';
  usuarios: Usuario[];
  keyUser = '';
  UsuarioPerfil: Usuario = new Usuario();
  data: any;

  constructor(
    public profileService: PerfilService,
    public router: Router,
    private toastr: ToastrService,
  ) {
    this.getKey();
  }

  ngOnInit() {
    this.getRol();

    // obtener Imagen de perfil
    this.profileService.getProfileImage(this.keyUser).then(url => {
      this.data = url;
    });
  }

  getKey() {
    this.keyUser = localStorage.getItem('uid');
  }

  getRol() {
    this.profileService.getRol()
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          if (element.key === this.keyUser) {
            this.rolUsuario = x.toString();
            this.profileInfo();
          }
        });
      });
  }

  profileInfo() {
    this.profileService.getUsers(this.rolUsuario)
      .snapshotChanges().subscribe(item => {
        this.usuarios = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          if (x['$key'] === this.keyUser) {
            this.usuarios.push(x as Usuario);
          }
        });
        this.UsuarioPerfil = this.usuarios[0];
      });
  }

  editProfile() {
    if (this.UsuarioPerfil.edad > '15' && this.UsuarioPerfil.edad < '90') {
      this.profileService.updateProfileUser(this.UsuarioPerfil, this.rolUsuario, this.keyUser)
        .then((res) => {
          this.toastr.success('Perfil Actualizado');
        }).catch((err) => {
          this.toastr.warning('No se ha Podido actualizar el perfil');
        });
    } else {
      this.toastr.warning('Ingrese un valor de edad válido');
    }
  }

  changeImageProfile() {
    this.router.navigate(['perfil/cambiar-imagen']);
  }

  returnOrganization() {
    this.router.navigate(['']);
  }

}
