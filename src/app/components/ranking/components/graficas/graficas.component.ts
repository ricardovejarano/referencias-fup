import { Component, OnInit } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service';
import { ProgramasContador } from 'src/app/models/programas.contador.model';
import { TopRanking } from 'src/app/models/topRanking.model';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {
  flag = true;
  // Array para gráfica
  arrayProgramas = [];
  arrayContadorProgramas = [];
  contRanking: TopRanking[];

  // public barChartData: any[];
  public barChartLabels: string[] = [];

  public barChartData: any[] = [{ data: this.arrayContadorProgramas, label: 'Uso por programa' }];

  public data = [];

  programas = [{}];


  public chartColors = [
    { // first color
      backgroundColor: [
        '#D8BFD8',
        '#FF00FF',
        '#FA8072',
        '#6B8E23',
        '#FAEBD7',
        '#ADD8E6',
        '#DC143C',
        '#32CD32',
        '#CD5C5C',
        '#5F9EA0',
        '#BDB76B',
        '#BA55D3',
        '#708090',
        '#FFDAB9',
        '#ffc107',
        '#dc3545'
      ]
    }
  ];

  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public barChartType = 'bar';
  public barChartLegend = true;



  constructor(public profileService: PerfilService) { }

  ngOnInit() {
    this.getValueConunterProgram();
  }

  getValueConunterProgram() {
      // console.log('ÉNTRA!!!');
      this.profileService.getContadorProgramas()
        .snapshotChanges().subscribe(item => {
          this.arrayProgramas = [];
          this.arrayContadorProgramas = [];
          item.forEach(element => {
            const x = element.payload.toJSON();
            this.arrayProgramas.push(element.key);
            this.arrayContadorProgramas.push(x['contadorActualizado']);
          });
          this.flag = false;
          this.reorderCounterProgram();
          setTimeout(() => {
            this.barChartData = this.barChartDataFunct();
            this.barChartLabels = this.barChartLabelsFunct();
            // console.log(this.barChartData);
            this.flag = true;
          }, 500);
        });
  }

  reorderCounterProgram() {
    let pos1 = 0;
    let pos2 = 1;
    let pos3 = 2;
    for (let x = 2; x < this.arrayContadorProgramas.length; x++) {
      if (this.arrayContadorProgramas[x] > this.arrayContadorProgramas[pos1]) {
        pos3 = pos2;
        pos2 = pos1;
        pos1 = x;
      } else if (this.arrayContadorProgramas[x] > this.arrayContadorProgramas[pos2]) {
        pos3 = pos2;
        pos2 = x;
      } else if (this.arrayContadorProgramas[x] > this.arrayContadorProgramas[pos3]) {
        pos3 = x;
      }
    }
    // console.log('POSICION 1 => ', pos1, 'POSICION 2 => ', pos2, 'POSICION 3 => ', pos3);
  }

  barChartDataFunct(): any {
    return [
      {
        data: this.arrayContadorProgramas, label: 'Uso por programa' }
    ];
  }

  barChartLabelsFunct(): any {
    return this.arrayProgramas;
  }

}
