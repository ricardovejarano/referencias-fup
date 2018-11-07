import { Component, OnInit } from '@angular/core';
import { ReferenciaService } from 'src/app/services/referencia.service';
import { ReferenciaWhitKey } from 'src/app/models/referenciaWithKey.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  keyUser = '';
  rolUsuario = '';
  referencias: ReferenciaWhitKey[];
  p = '';

  constructor(
    public referenciaService: ReferenciaService,
    public profileService: PerfilService,
    private toastr: ToastrService,
  ) {
    this.getKey();
  }

  ngOnInit() {
    this.getRol();
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
          }
        });
        this.obetnerReferencias();
      });
  }

  obetnerReferencias() {
    this.referenciaService.getReferences(this.rolUsuario, this.keyUser)
      .snapshotChanges().subscribe(item => {
        this.referencias = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.referencias.push(x as ReferenciaWhitKey);
        });
        console.log('Todas las Referencias del Usuario:', this.referencias);
      });
  }

}
