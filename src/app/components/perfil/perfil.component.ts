import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  srcImage = 'https://firebasestorage.googleapis.com/v0/b/referencias-fup.appspot.com/o/unknown.png?alt=media&token=dc0e2e6e-05a5-47c6-bd65-026c81d69186';
  usuario: Usuario = new Usuario();

  constructor() { }

  ngOnInit() {
  }

  fileChangeListener($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
  }

  editProfile() {
    console.log('Se edita perfil');
  }

}
