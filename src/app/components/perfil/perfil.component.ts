import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  srcImage = 'https://firebasestorage.googleapis.com/v0/b/referencias-fup.appspot.com/o/unknown.png?alt=media&token=dc0e2e6e-05a5-47c6-bd65-026c81d69186';
  usuario: Usuario = new Usuario();
  rolUsuario = '';
  usuarios: Usuario[];
  keyAdmin = '';
  UsuarioPerfil: Usuario = new Usuario();

  constructor(public profileService: PerfilService) {
    this.getKey();
  }

  ngOnInit() {
    this.getRol();
  }

  getKey() {
      this.keyAdmin = localStorage.getItem('uid');
  }

  getRol() {
    this.profileService.getRol()
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          if (element.key === this.keyAdmin) {
            this.rolUsuario = x.toString();
            this.profileInfo();
            console.log(x);
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
          if (x['$key'] === this.keyAdmin) {
            this.usuarios.push(x as Usuario);
          }
        });
        this.UsuarioPerfil = this.usuarios[0];
        console.log('Usuario:', this.UsuarioPerfil);
      });
  }

  fileChangeListener($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
  }

  editProfile() {
    console.log('Se edita perfil');
  }

}
