import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PerfilService } from 'src/app/services/perfil.service';
import { Usuario } from 'src/app/models/usuario.model';
import { RankingService } from 'src/app/services/ranking.service';
import { Referencia } from 'src/app/models/referencia.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-articulo-revista',
  templateUrl: './articulo-revista.component.html',
  styleUrls: ['./articulo-revista.component.css']
})
export class ArticuloRevistaIcontecComponent implements OnInit {
  autor = '';
  // tslint:disable-next-line:max-line-length
  ejemplo = 'FLECHA, Ramón. H. Giroux o la solidaridad. En: Cuadernos de pedagogía. Vol.; 2. No 198 (Ago-Sep.1991); p. 15-20.';
  nombre = '';
  apellido = '';
  titulo = '';
  nombreRevista = '';
  volumen = '';
  fechaPublicacion = '';
  fechaCitaDia = '';
  fechaCitaMes = '';
  fechaCitaAnio = '';
  disponibilidad = '';
  anioRevista = '';
  referenciaFinal = '';
  numeroRevista = '';
  userRegister = false;
  paginaInicial = '';
  paginaFinal = '';
  mesRevista = '';
  mes2Revista = '';

  // Arrays para Fecha
  mes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
    'noviembre', 'diciembre'];
  dia = [];
  anio = [];
  anioCita = [2015, 2016, 2017, 2018, 2019, 2020, 2021];

  nombres = [{ value: '' }];
  apellidos = [{ value: '' }];
  keyAdmin = '';
  rolUsuario = '';
  usuarios: Usuario[];
  referencia: Referencia = new Referencia();
  programa = '';
  contadorPrograma = 0;
  contadorPersona = 0;
  contadorReferencia = 0;
  contadorNobody = 0;

  constructor(public profileService: PerfilService, public rankingService: RankingService,
    private toastr: ToastrService) {
    this.keyAdmin = localStorage.getItem('uid');
  }

  ngOnInit() {
    this.getArray();
    this.getCounterReference();
    if (localStorage.getItem('logged') === 'true') {
      this.userRegister = true;
      this.getRol();
    } else {
      this.getCounterNobody();
    }
  }

  getRol() {
    this.profileService.getRol()
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          if (element.key === this.keyAdmin) {
            this.rolUsuario = x.toString();
            this.getCounterPerson();
            if (this.rolUsuario !== 'administrativo') {
              this.getProgram();
            }
          }
        });
      });
  }

  getProgram() {
    switch (this.rolUsuario) {
      case 'estudiante':
        this.profileService.getEstudiantes()
          .snapshotChanges().subscribe(item => {
            this.usuarios = [];
            item.forEach(element => {
              const x = element.payload.toJSON();
              if (element.key === this.keyAdmin) {
                x['$key'] = element.key;
                if (x['programa']) {
                  this.programa = x['programa'];
                }
              }
            });
            this.getValueConunterProgram();
          });
        break;
      case 'docente':
        this.profileService.getDocentes()
          .snapshotChanges().subscribe(item => {
            this.usuarios = [];
            item.forEach(element => {
              const x = element.payload.toJSON();
              x['$key'] = element.key;
              if (x['programa']) {
                this.programa = x['programa'];
              }
            });
            this.getValueConunterProgram();
          });
        break;
      case 'egresado':
        this.profileService.getEgresado()
          .snapshotChanges().subscribe(item => {
            this.usuarios = [];
            item.forEach(element => {
              const x = element.payload.toJSON();
              x['$key'] = element.key;
              if (x['programa']) {
                this.programa = x['programa'];
              }
            });

            this.getValueConunterProgram();
          });
        break;
    }
  }

  getValueConunterProgram() {
    if (localStorage.getItem('logged') === 'true') {
      this.profileService.getContadorProgramas()
        .snapshotChanges().subscribe(item => {
          item.forEach(element => {
            const x = element.payload.toJSON();
            if (element.key === this.programa) {
              this.contadorPrograma = Number(x['contadorActualizado']);

            }
          });
        });
    }
  }

  getCounterPerson() {
    this.rankingService.getContadorPersona(this.keyAdmin, this.rolUsuario)
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          if (element.key === 'contador') {
            this.contadorPersona = Number(x);
          }
        });
      });
  }

  getCounterReference() {
    this.rankingService.getContadorReferencia('icontec', 'articulo-revista')
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          this.contadorReferencia = Number(x);
        });
      });
  }

  addCountProgram() {

    this.rankingService.addCounterProgram(this.programa, this.contadorPrograma)
      .then(res => {

      }, err => {
        console.log('Error', err);
      });
  }

  addCountPerson() {
    this.rankingService.addCounterPerson(this.rolUsuario, this.keyAdmin, this.contadorPersona)
      .then(res => {

      }, err => {
        console.log('Error', err);
      });
  }

  addCounterReference() {
    this.rankingService.addCounterReference('icontec', 'articulo-revista', this.contadorReferencia)
      .then(res => {

      }, err => {
        console.log('Error', err);
      });
  }

  saveHistory() {
    if (localStorage.getItem('referenciaHistorial') !== this.referenciaFinal) {
    this.referencia.cita = this.referenciaFinal;
    this.referencia.referencia = 'ICONTEC';
    this.referencia.subReferencia = 'Artículo o Revista';
    this.rankingService.addReference(this.rolUsuario, this.keyAdmin, this.referencia)
      .then(res => {
        window.alert('Cita guardada');
        localStorage.setItem('referenciaHistorial', this.referenciaFinal);
      }, err => {
        console.log('Error', err);
      });
    }
  }

  addAuthor() {
    if (this.nombres[this.nombres.length - 1].value !== '') {
      this.nombres.push({ value: '' });
      this.apellidos.push({ value: '' });
    }
  }

  quitAuthor(index) {
    this.nombres.splice(index, 1);
    this.apellidos.splice(index, 1);
  }

  getArray() {
    for (let y = 1; y < 32; y++) {
      this.dia.push(y);
    }

    for (let x = 1940; x < 2020; x++) {
      this.anio.push(x);
    }
  }

  getCounterNobody() {
    this.rankingService.getNobodyCounter()
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          if (element.key === 'contador') {
            this.contadorNobody = Number(x);
          }
        });
      });
  }

  addCounterNobody() {
    this.rankingService.addNobodyCounter(this.contadorNobody)
      .then(res => {
      }, err => {
        console.log('Ocurrió un error', err);
      });
  }

  addReference() {

    this.referenciaFinal = '';

    for (let z = 0; z < this.nombres.length; z++) {
      if (this.apellidos[z].value) {
        if (z !== 0) {
          this.referenciaFinal += ', ';
        }
        this.referenciaFinal += this.apellidos[z].value.toUpperCase() + ', ';
      }
      if (this.nombres[z].value) {
        // return word[0].toUpperCase() + word.substr(1).toLowerCase();
        this.referenciaFinal += this.nombres[z].value[0].toUpperCase() + this.nombres[z].value.substr(1).toLocaleLowerCase();
        if (z === (this.nombres.length - 1)) {
          this.referenciaFinal += '.';
        }
      }
    }

    if (this.titulo) {
      this.referenciaFinal += ' ' + this.titulo + '.';
    }

    if (this.nombreRevista) {
      this.referenciaFinal += ' En: ' + this.nombreRevista + '.';
    }

    if (this.volumen) {
      this.referenciaFinal += ' Vol. ' + this.volumen + '.';
    }

    if (this.numeroRevista) {
      this.referenciaFinal += ' No ' + this.numeroRevista;
    }

    if (this.mesRevista) {
      this.referenciaFinal += ' (' + this.mesRevista;
    }

    if (this.mes2Revista) {
      this.referenciaFinal += '-' + this.mes2Revista + '.';
    } else {
      this.referenciaFinal += '.';
    }

    if (this.anioRevista) {
      this.referenciaFinal += ' ' + this.anioRevista + ')';
    } else {
      this.referenciaFinal += ')';
    }

    if (this.paginaInicial) {
      this.referenciaFinal += '; p. ' + this.paginaInicial;
    }

    if (this.paginaFinal) {
      this.referenciaFinal += '-' + this.paginaInicial + '.';
    } else {
      this.referenciaFinal += '.';
    }


    if (this.referenciaFinal.length > 8 && this.referenciaFinal !== localStorage.getItem('prevReference')) {
      this.addCounterReference();
      if (localStorage.getItem('logged') === 'true') {
        this.addCountProgram();
        this.addCountPerson();
      } else {
        this.addCounterNobody();
      }
      this.toastr.success('Referencia generada');
    }
    localStorage.setItem('prevReference', this.referenciaFinal);
  }

  resetForm(validForm?: NgForm) {
    if (validForm != null) {
      validForm.reset();
    }
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
