import { Component, OnInit, Input } from '@angular/core';
import { ReferenciaWhitKey } from 'src/app/models/referenciaWithKey.model';
import { ReferenciaService } from 'src/app/services/referencia.service';
import { PerfilService } from 'src/app/services/perfil.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-referencia',
  templateUrl: './card-referencia.component.html',
  styleUrls: ['./card-referencia.component.css']
})
export class CardReferenciaComponent implements OnInit {

  @Input() referencia: ReferenciaWhitKey;

  keyUser = '';
  rolUsuario = '';

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
      });
  }

  copiarReferencia(refText) {
    refText.select();
    document.execCommand('copy');
    refText.setSelectionRange(0, 0);
  }

  borrarReferencia(KeyReferencia) {
    if (confirm('Esta seguro de eliminar esta Referencia?')) {
      this.referenciaService.deleteReference(KeyReferencia, this.rolUsuario, this.keyUser)
        .then((res) => {
          this.toastr.info('Eliminacion Exitosa', 'Referencia Removida');
        });
    }
  }
}
