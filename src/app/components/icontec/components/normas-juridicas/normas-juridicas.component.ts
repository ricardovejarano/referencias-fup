import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Referencia } from 'src/app/models/referencia.model';
import { PerfilService } from 'src/app/services/perfil.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-normas-juridicas',
  templateUrl: './normas-juridicas.component.html',
  styleUrls: ['./normas-juridicas.component.css']
})
export class NormasJuridicasComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  ejemplo = 'COLOMBIA. MINISTERIO DE DESARROLLO ECONÓMICO. Decreto 2269 (16, noviembre, 1993). Por el cual se organiza el sistema de normalización, certificación y metrología. Bogotá D.C.: El Ministerio, 1993. 18 p.';
  jurisdiccion = '';
  autorCorporativo = '';
  designacion = '';
  fechaNormaDia = '';
  fechaNormaMes = '';
  fechaNormaAnio = '';
  nombreNorma = '';
  tituloPublicacion = '';
  lugarPublicacion = '';
  anioPublicacion = '';
  numero = '';
  userRegister = false;
  paginaInicial = '';
  paginaFinal = '';
  referenciaFinal = '';

  // Arrays para Fecha
  mes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre',
    'noviembre', 'diciembre'];
  dia = [];
  anio = [];
  anioCita = [2015, 2016, 2017, 2018, 2019, 2020, 2021];

  keyAdmin = '';
  rolUsuario = '';
  usuarios: Usuario[];
  referencia: Referencia = new Referencia();
  programa = '';
  contadorPrograma = 0;
  contadorPersona = 0;
  contadorReferencia = 0;

  constructor(public profileService: PerfilService, public rankingService: RankingService) {
    this.keyAdmin = localStorage.getItem('uid');
  }

  ngOnInit() {
    this.getArray();
    this.getCounterReference();
    if (localStorage.getItem('logged') === 'true') {
      this.userRegister = true;
      this.getRol();
    } else {
      console.log('NO ENTRA');
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
              console.log('ROL', this.rolUsuario);
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
            console.log('Programa', this.programa);
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
            console.log('Programa', this.programa);
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
            console.log('Programa', this.programa);
            this.getValueConunterProgram();
          });
        break;
    }
  }

  getValueConunterProgram() {
    if (localStorage.getItem('logged') === 'true') {
      console.log('ÉNTRA!!!');
      this.profileService.getContadorProgramas()
        .snapshotChanges().subscribe(item => {
          item.forEach(element => {
            const x = element.payload.toJSON();
            if (element.key === this.programa) {
              this.contadorPrograma = Number(x['contadorActualizado']);
              console.log('VALOR', this.contadorPrograma);
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
    this.rankingService.getContadorReferencia('icontec', 'referencia-bibliografica-para-normas-juridicas')
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
        console.log(res);
      }, err => {
        console.log('Error', err);
      });
  }

  addCountPerson() {
    this.rankingService.addCounterPerson(this.rolUsuario, this.keyAdmin, this.contadorPersona)
      .then(res => {
        console.log(res);
      }, err => {
        console.log('Error', err);
      });
  }

  addCounterReference() {
    this.rankingService.addCounterReference('icontec', 'referencia-bibliografica-para-normas-juridicas', this.contadorReferencia)
      .then(res => {
        console.log(res);
      }, err => {
        console.log('Error', err);
      });
  }

  saveHistory() {
    this.referencia.cita = this.referenciaFinal;
    this.referencia.referencia = 'ICONTEC';
    this.referencia.subReferencia = 'Referencia bibliográfica para normas jurídicas';
    this.rankingService.addReference(this.rolUsuario, this.keyAdmin, this.referencia)
      .then(res => {
        console.log(res);
        window.alert('Cita guardada');
      }, err => {
        console.log('Error', err);
      });
  }


  getArray() {
    for (let y = 1; y < 32; y++) {
      this.dia.push(y);
    }

    for (let x = 1940; x < 2020; x++) {
      this.anio.push(x);
    }
  }

  addReference() {

    this.addCounterReference();
    if (localStorage.getItem('logged') === 'true') {
      this.addCountProgram();
      this.addCountPerson();
    }

    this.referenciaFinal = '';


    if (this.jurisdiccion) {
      this.referenciaFinal += this.jurisdiccion.toUpperCase() + '.';
    }

    if (this.autorCorporativo) {
      this.referenciaFinal += ' ' + this.autorCorporativo.toUpperCase() + '.';
    }

    if (this.designacion) {
      //  word[0].toUpperCase() + word.substr(1).toLowerCase();
      this.referenciaFinal += ' ' + this.designacion[0].toUpperCase() + this.designacion.substr(1).toLowerCase();
    }

    if (this.fechaNormaDia) {
      this.referenciaFinal += ' (' + this.fechaNormaDia;
    }

    if (this.fechaNormaMes) {
      this.referenciaFinal += ', ' + this.fechaNormaMes;
    }

    if (this.fechaNormaAnio) {
      this.referenciaFinal += ' ,' + this.fechaNormaAnio + ').';
    }

    if (this.nombreNorma) {
      this.referenciaFinal += ' ' + this.nombreNorma + '.';
    }

    if (this.tituloPublicacion) {
      this.referenciaFinal += ' ' + this.tituloPublicacion + '.';
    }

    if (this.lugarPublicacion) {
      this.referenciaFinal += ' ' + this.lugarPublicacion;
    }

    if (this.anioPublicacion) {
      this.referenciaFinal += ', ' + this.anioPublicacion + '.';
    }

    if (this.paginaInicial) {
      this.referenciaFinal += ' ' + this.paginaInicial;
    }

    if (this.paginaFinal) {
      this.referenciaFinal += '-' + this.paginaFinal + ' p.';
    } else {
      this.referenciaFinal += ' p.';
    }
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
